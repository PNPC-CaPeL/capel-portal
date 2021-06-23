const wktParse = require('wellknown');

const {
  initApi,
  transposeByLabel,
} = require('./lib');

const tables = {
  PARAMETRES: 'Paramètres du site public',
  SIGNATURES: 'Signature de règlement',
  PLONGEES: 'Plongée',
  SPOTS: 'Spot de plongée',
  ACCOUNTS: 'Profil utilisateur',
};

const publicStructureFields = ['id', 'Nom', 'Ville', 'Adresse', 'Code postal',
  'Téléphone principal', 'Coordonnées GPS', 'Site web'];

const prune = (object, properties) =>
  Object.fromEntries(Object.entries(object).filter(([key]) => properties.includes(key)));

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

  const getReadableRowsFrom = async tableLabel => {
    const tableSchema = schema.tables.find(({ text }) => text === tableLabel);
    const tableRows = await getRows(tableSchema.id);
    const readableRows = transposeByLabel(tableRows, tableSchema);
    return readableRows;
  };

  /**
   * Create LckSetting GraphQL nodes
   */
  const settings = await getReadableRowsFrom(tables.PARAMETRES);

  await Promise.all(settings.map((setting, index) => {
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
   */
  const spots = await getReadableRowsFrom(tables.SPOTS);
  reporter.info(`Spots: ${spots.length}`);

  await Promise.all(spots.map(spot => {
    const contentDigest = createContentDigest(spot);
    const type = 'Spot';

    const geojson = spot.Position
      ? wktParse(spot.Position)
      : null;

    return createNode({
      parent: null,
      children: [],
      internal: { type, contentDigest, content: JSON.stringify(spot) },
      geojson,
      ...spot,
    });
  }));

  /**
   * Get all Structures
   */
  const accounts = await getReadableRowsFrom(tables.ACCOUNTS);
  reporter.info(`Signatures: ${accounts.length}`);

  const publishedStructures = accounts
    .filter(account => {
      if (
        account.Type === 'Structure de plongée'
        // && account['Inscription finalisée']
        // && account['Coordonnées GPS']
        // && account['Publier sur le site']
      ) {
        return true;
      }

      return false;
    });

  reporter.info(`Structures (published): ${publishedStructures.length}`);

  await Promise.all(publishedStructures.map(structure => {
    const contentDigest = createContentDigest(structure);
    const type = 'Structure';
    const publicFields = prune(structure, publicStructureFields);

    const geojson = structure['Coordonnées GPS']
      ? wktParse(structure['Coordonnées GPS'])
      : null;

    return createNode({
      parent: null,
      children: [],
      internal: { type, contentDigest, content: JSON.stringify(publicFields) },
      geojson,
      ...publicFields,
    });
  }));

  /**
   * Get all Signatures for some counts
   */
  const signatures = await getReadableRowsFrom(tables.SIGNATURES);
  reporter.info(`Signatures: ${signatures.length}`);

  const structureSignatures = signatures.filter(
    ({ 'Structure ?': isStructure }) => isStructure,
  );

  /**
   * Get all Plongees for some counts
   */
  const dives = await getReadableRowsFrom(tables.PLONGEES);
  reporter.info(`Dives: ${dives.length}`);

  // const yearDives = dives.filter(
  //   ({ 'Année': year }) => (year === (new Date()).getFullYear()),
  // );

  /**
   * Create LckMetric GraphQL nodes (counts)
   */
  await Promise.all([
    { key: 'spotCount', count: spots.length },
    { key: 'signatureCount', count: signatures.length },
    { key: 'signatureCountBySP', count: structureSignatures.length },
    { key: 'signatureCountByPI', count: signatures.length - structureSignatures.length },
    { key: 'diveCount', count: dives.length },
    {
      key: 'diverCount',
      count: dives.reduce((acc, { 'Nombre de plongeurs': count = 0 }) => acc + (+count), 0),
    },
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
