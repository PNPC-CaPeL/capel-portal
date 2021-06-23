const wktParse = require('wellknown');
const fs = require('fs/promises');

const {
  lckApi,
  transposeByLabel,
} = require('./lib');

const tables = {
  PARAMETRES: 'Paramètres du site public',
  SIGNATURES: 'Signature de règlement',
  PLONGEES: 'Plongée',
  SPOTS: 'Spot de plongée',
  ACCOUNTS: 'Profil utilisateur',
  ZONES: 'Zone',
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
  const { getSchema, getRows } = await lckApi();

  /**
   * Get overall database schema
   */
  const schema = await getSchema(process.env.LCK_DBID);

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

  await Promise.all(settings.map(setting => {
    const contentDigest = createContentDigest(setting);
    const type = 'LckSettings';

    return createNode({
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
   * Also stores settings as json file
   */
  const settingsObject = settings.reduce((acc, node) => ({ ...acc, [node.key]: node }), {});
  await fs.writeFile('public/lckSettings.json', JSON.stringify(settingsObject, null, 2));

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
   * Get all Zones
   */
  const zones = await getReadableRowsFrom(tables.ZONES);
  reporter.info(`Zones: ${zones.length}`);

  await Promise.all(zones.map(zone => {
    const contentDigest = createContentDigest(zone);
    const type = 'Zone';

    const geojson = zone['Géométrie']
      ? wktParse(zone['Géométrie'])
      : null;

    return createNode({
      parent: null,
      children: [],
      internal: { type, contentDigest, content: JSON.stringify(zone) },
      geojson,
      ...zone,
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
  const yearDives = dives.filter(
    ({ Année }) => (Année === (new Date()).getFullYear()),
  );
  reporter.info(`Dives: ${dives.length}`);
  reporter.info(`Dives (current year): ${yearDives.length}`);

  /**
   * Create LckMetric GraphQL nodes (counts)
   */
  await Promise.all([
    { key: 'spotCount', count: spots.length },
    { key: 'signatureCount', count: signatures.length },
    { key: 'signatureCountBySP', count: structureSignatures.length },
    { key: 'signatureCountByPI', count: signatures.length - structureSignatures.length },
    { key: 'diveCount', count: yearDives.length },
    {
      key: 'diverCount',
      count: yearDives.reduce((acc, { 'Nombre de plongeurs': count = 0 }) => acc + (+count), 0),
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
