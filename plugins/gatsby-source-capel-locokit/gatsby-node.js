const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');
const fetch = require('node-fetch');

const transposeByLabel = (table, tableSchema) => {
  const transposedTable = table.map(spot =>
    tableSchema.columns.reduce(
      (acc, { text, id }) => ({ ...acc, [text]: spot[id] }),
      {},
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

exports.sourceNodes = async ({
  createNodeId,
  createContentDigest,
  actions: { createNode },
  reporter,
}) => {
  const { LCK, getRows } = await initApi();

  /**
   * Get overall database schema
   */
  const schema = await LCK.service('database')
    .get(process.env.LCK_DBID, {
      query: {
        $eager: '[tables.[columns,views.[columns]]]',
      },
    });

  /**
   * Create LckSetting GraphQL nodes
   */
  const settingsSchema = schema.tables.find(({ text }) => text === 'Paramètres du site public');
  const settings = await getRows(settingsSchema.id);
  const readableSettings = transposeByLabel(settings, settingsSchema);
  await Promise.all(readableSettings.map((setting, index) => {
    const id = createNodeId(`settings ${index}`);
    const contentDigest = createContentDigest(setting);
    const type = 'LckSettings';

    return createNode({
      id,
      parent: null,
      children: [],
      internal: {
        type,
        contentDigest,
        content: JSON.stringify(setting),
      },
      ...setting,
    });
  }));

  /**
   * Get all Spots
   * @TODO Create spot nodes to display them on homepage map
   */
  const spotsSchema = schema.tables.find(({ text }) => text === 'Spot de plongée');
  const spots = await getRows(spotsSchema.id);
  reporter.info(`Spots: ${spots.length}`);
  // const readableSpots = transposeByLabel(spots, spotsSchema);

  /**
   * Get all Signatures for some counts
   */
  const signaturesSchema = schema.tables.find(({ text }) => text === 'Signature de règlement');
  const signatures = await getRows(signaturesSchema.id);
  reporter.info(`Signatures: ${signatures.length}`);
  const readableSignatures = transposeByLabel(signatures, signaturesSchema);

  const structureSignatures = readableSignatures.filter(
    ({ 'Structure ?': isStructure }) => isStructure,
  );

  /**
   * Get all Signatures for some counts
   */
  const divesSchema = schema.tables.find(({ text }) => text === 'Plongée');
  const dives = await getRows(divesSchema.id);
  reporter.info(`Dives: ${dives.length}`);
  const readableDives = transposeByLabel(dives, divesSchema);

  // const yearDives = readableDives.filter(
  //   ({ 'Année': year }) => (year === (new Date()).getFullYear()),
  // );

  /**
   * Create LckMetric GraphQL nodes
   */
  await Promise.all([
    { key: 'spotCount', count: spots.length },
    { key: 'signatureCount', count: readableSignatures.length },
    { key: 'signatureCountBySP', count: structureSignatures.length },
    { key: 'signatureCountByPI', count: readableSignatures.length - structureSignatures.length },
    { key: 'diveCount', count: readableDives.length },
    { key: 'diverCount', count: readableDives.reduce((acc, { 'Nombre de plongeurs': count = 0 }) => acc + count, 0) },
  ].map((metric, index) => {
    const id = createNodeId(`metric ${index}`);
    const contentDigest = createContentDigest(metric);
    const type = 'LckMetric';

    return createNode({
      id,
      parent: null,
      children: [],
      internal: { type, contentDigest },
      ...metric,
    });
  }));
};
