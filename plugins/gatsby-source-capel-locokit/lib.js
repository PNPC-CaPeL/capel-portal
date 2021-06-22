const fetch = require('node-fetch');
const dotenv = require('dotenv');

const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');

const { COLUMN_TYPE } = require('@locokit/lck-glossary');

dotenv.config();

const getOriginalColumn = column => {
  if (
    column.column_type_id !== COLUMN_TYPE.LOOKED_UP_COLUMN
    || (column.parents && column.parents.length === 0)
    || !column.parents
  ) {
    return column;
  }
  return getOriginalColumn(column.parents[0]);
};

const getColumnValue = (column, data) => {
  if (data === '' || data === undefined || data === null) {
    return data;
  }

  try {
    switch (column.column_type_id) {
      case COLUMN_TYPE.USER:
      case COLUMN_TYPE.GROUP:
      case COLUMN_TYPE.RELATION_BETWEEN_TABLES:
        return data.value;

      case COLUMN_TYPE.LOOKED_UP_COLUMN: {
        const originalColumn = getOriginalColumn(column);

        if ([
          COLUMN_TYPE.DATE,
          COLUMN_TYPE.SINGLE_SELECT,
          COLUMN_TYPE.MULTI_SELECT,
        ].includes(originalColumn.column_type_id)) {
          return getColumnValue(originalColumn, data.value);
        } if (originalColumn.column_type_id === COLUMN_TYPE.MULTI_USER) {
          return getColumnValue(originalColumn, data);
        }

        return data.value;
      }

      case COLUMN_TYPE.MULTI_USER:
        return data.value.join(', ');

      case COLUMN_TYPE.SINGLE_SELECT:
        return column.settings.values?.[data]?.label;

      case COLUMN_TYPE.MULTI_SELECT: {
        if (data.length > 0) {
          return data.map(d => column.settings.values?.[d]?.label).join(', ');
        }

        return '';
      }

      case COLUMN_TYPE.FORMULA:
      case COLUMN_TYPE.DATE:
      default:
        return data;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Field with bad format', data, error);

    return '';
  }
};

const transposeByLabel = (table, tableSchema) => {
  const transposedTable = table.map(row =>
    tableSchema.columns.reduce(
      (acc, currentColumn) => ({
        ...acc,
        [currentColumn.text]: getColumnValue(currentColumn, row[currentColumn.id]),
      }),
      { id: row.id },
    ));

  return transposedTable;
};

const lckApi = async () => {
  const lckClient = feathers();

  // Connect to a different URL
  const restClient = rest(`${process.env.GATSBY_LCK_HOME}/api/`);

  // Configure an AJAX library (see below) with that client
  lckClient.configure(restClient.fetch(fetch));
  lckClient.configure(auth());

  const authenticate = () => lckClient.authenticate({
    strategy: 'local',
    email: process.env.LCK_USER,
    password: process.env.LCK_PASSWORD,
  });

  const { user } = await authenticate();

  const { groups: [{ id: groupId }] } = await lckClient.service('user').get(user.id, {
    query: {
      $eager: 'groups',
    },
  });

  const getRows = (id, { query = {} } = {}) => lckClient.service('row').find({
    query: {
      table_id: id,
      $limit: -1,
      $lckGroupId: groupId,
      ...query,
    },
  });

  const getSchema = dbId => lckClient.service('database')
    .get(dbId, {
      query: {
        $eager: '[tables.[columns,views.[columns]]]',
      },
    });

  return {
    LCK: lckClient,
    getSchema,
    getRows,
  };
};

module.exports = {
  transposeByLabel,
  lckApi,
};
