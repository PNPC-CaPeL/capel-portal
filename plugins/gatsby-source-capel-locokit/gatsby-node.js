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

  /**
   * Create LckSetting GraphQL nodes
   */
  const settingsSchema = schema.tables.find(({ text }) => text === tables.PARAMETRES);
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
   */
  const spotsSchema = schema.tables.find(({ text }) => text === tables.SPOTS);
  const spots = await getRows(spotsSchema.id);

  reporter.info(`Spots: ${spots.length}`);
  const readableSpots = transposeByLabel(spots, spotsSchema);

  await Promise.all(readableSpots.map(spot => {
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
  const accountsSchema = schema.tables.find(({ text }) => text === 'Profil utilisateur');
  const accounts = await getRows(accountsSchema.id);
  reporter.info(`Signatures: ${accounts.length}`);
  const readableAccounts = transposeByLabel(accounts, accountsSchema);
  const publishedStructures = readableAccounts
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
  const signaturesSchema = schema.tables.find(({ text }) => text === tables.SIGNATURES);
  const signatures = await getRows(signaturesSchema.id);
  reporter.info(`Signatures: ${signatures.length}`);
  const readableSignatures = transposeByLabel(signatures, signaturesSchema);

  const structureSignatures = readableSignatures.filter(
    ({ 'Structure ?': isStructure }) => isStructure,
  );

  /**
   * Get all Plongees for some counts
   */
  const divesSchema = schema.tables.find(({ text }) => text === tables.PLONGEES);
  const dives = await getRows(divesSchema.id);
  reporter.info(`Dives: ${dives.length}`);
  const readableDives = transposeByLabel(dives, divesSchema);

  // const yearDives = readableDives.filter(
  //   ({ 'Année': year }) => (year === (new Date()).getFullYear()),
  // );

  /**
   * Create LckMetric GraphQL nodes (counts)
   */
  await Promise.all([
    { key: 'spotCount', count: spots.length },
    { key: 'signatureCount', count: readableSignatures.length },
    { key: 'signatureCountBySP', count: structureSignatures.length },
    { key: 'signatureCountByPI', count: readableSignatures.length - structureSignatures.length },
    { key: 'diveCount', count: readableDives.length },
    {
      key: 'diverCount',
      count: readableDives.reduce((acc, { 'Nombre de plongeurs': count = 0 }) => acc + (+count), 0),
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
