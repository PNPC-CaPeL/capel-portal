const fetch = require('node-fetch');
const dotenv = require('dotenv');

const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');

dotenv.config();

const transposeByLabel = (table, tableSchema) => {
  const transposedTable = table.map(row =>
    tableSchema.columns.reduce(
      (acc, { text, id }) => ({ ...acc, [text]: row[id] }),
      { id: row.id },
    ));

  return transposedTable;
};

const initApi = async () => {
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

  return {
    LCK: lckClient,
    getRows,
  };
};

module.exports = {
  transposeByLabel,
  initApi,
};
