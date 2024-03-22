import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import { COLUMN_TYPE } from '@locokit/lck-glossary';

class lckClient {
  basePath = ''
  dbUuid = ''
  username = ''
  password = ''
  feathersClient = null
  user = null
  groupId = null

  constructor(basePath, dbUuid, username, password) {
    this.basePath = basePath;
    this.dbUuid = dbUuid;
    this.username = username;
    this.password = password;

    this.feathersClient = feathers();
    // Connect to a different URL
    const restClient = rest(this.basePath);
    // this.feathersClient.configure(restClient.fetch(fetch));
    this.feathersClient.configure(restClient.fetch(window.fetch));
    this.feathersClient.configure(auth());
  }

  async init() {
    const { user } = await this.feathersClient.authenticate({
      strategy: 'local',
      email: this.username,
      password: this.password,
    });
    this.user = user;

    const { groups } = await this.feathersClient.service('user').get(user.id, {
      query: {
        $eager: 'groups',
      },
    })
    this.groupId = groups[0].id;

    this.schema = await this.feathersClient.service('database')
    .get(this.dbUuid, {
      query: {
        $eager: '[tables.[columns,views.[columns]]]',
      },
    });
  }

  async getRows(table, query = {}) {
    if(!this.schema) {
      await this.init();
    }

    const tableSchema = this.schema.tables.find(({ id }) => id === table);
    const tableRows = await this.feathersClient.service('row').find({
      query: {
        table_id: tableSchema.id,
        $lckGroupId: this.groupId,
        ...query,
      },
    })

    return {tableSchema, tableRows}
  }

  async query(table, query = {}) {
    const { tableSchema, tableRows } = await this.getRows(table, query)

    return transposeByLabel(tableRows.data ?? tableRows, tableSchema);
  }

  async count(table, query = {}) {
    const { tableRows } = await this.getRows(table, {'$limit': 0, ...query})

    return tableRows.total;
  }
}

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

export const transposeByLabel = (table, tableSchema) => {
  const transposedTable = table.map(row =>
    tableSchema.columns.reduce(
      (acc, currentColumn) => ({
        ...acc,
        [currentColumn.text]: getColumnValue(currentColumn, row.data[currentColumn.id]),
      }),
      { id: row.id },
    ));

  return transposedTable;
};


export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const client = new lckClient(
    config.lckBasePath,
    config.lckDbUuid,
    config.lckUsername,
    config.lckPassword,
  );

  return {
    provide: {
      lckClient: client
    }
  }
})
