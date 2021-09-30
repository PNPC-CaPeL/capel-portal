const wktParse = require('wellknown');
const fs = require('fs/promises');

const {
  lckApi,
  transposeByLabel,
} = require('./lib');

const prune = (object, properties) =>
  Object.fromEntries(Object.entries(object).filter(([key]) => properties.includes(key)));

exports.sourceNodes = async ({
  createNodeId,
  createContentDigest,
  actions: { createNode },
  reporter,
}, {
  dbId = process.env.LCK_DBID,
  settingsTableId = process.env.LCK_SETTINGS_ID,
  structurePublicFields = ['id', 'Nom', 'Ville'],
}) => {
  const { getSchema, getRows } = await lckApi();

  const tables = {
    PARAMETRES: settingsTableId,
  };

  /**
   * Get overall database schema
   */
  const schema = await getSchema(dbId);

  const getReadableRowsFrom = async tableUuid => {
    const tableSchema = schema.tables.find(({ id }) => id === tableUuid);
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

    if (setting.key === 'TABLES') {
      try {
        const a = JSON.parse(setting.text_value);
        Object.entries(a).forEach(([key, value]) => { tables[key] = value; });
      } catch (e) {
        reporter.warn('Unable to parse TABLE setting value as JSON');
      }

      return Promise.resolve();
    }

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

    if (geojson?.type === 'Polygon') {
      geojson.type = 'MultiPolygon';
      geojson.coordinates = [geojson.coordinates];
    }

    return createNode({
      parent: null,
      children: [],
      internal: { type, contentDigest, content: JSON.stringify(zone) },
      geojson,
      ...zone,
    });
  }));

  /**
   * Get all Divisions
   */
  const divisions = await getReadableRowsFrom(tables.DIVISIONS);
  reporter.info(`Aires: ${divisions.length}`);

  await Promise.all(divisions.map(division => {
    const contentDigest = createContentDigest(division);
    const type = 'Division';

    const geojson = division['Zone géographique']
      ? wktParse(division['Zone géographique'])
      : null;

    if (geojson?.type === 'Polygon') {
      geojson.type = 'MultiPolygon';
      geojson.coordinates = [geojson.coordinates];
    }

    return createNode({
      parent: null,
      children: [],
      internal: { type, contentDigest, content: JSON.stringify(division) },
      geojson,
      ...division,
    });
  }));

  /**
   * Get all AMP (Aires)
   */
  const aires = await getReadableRowsFrom(tables.AIRES);
  reporter.info(`Aires: ${aires.length}`);

  await Promise.all(aires.map(aire => {
    const contentDigest = createContentDigest(aire);
    const type = 'Aire';

    const geojson = aire['Zone géographique']
      ? wktParse(aire['Zone géographique'])
      : null;

    if (geojson?.type === 'Polygon') {
      geojson.type = 'MultiPolygon';
      geojson.coordinates = [geojson.coordinates];
    }

    return createNode({
      parent: null,
      children: [],
      internal: { type, contentDigest, content: JSON.stringify(aire) },
      geojson,
      ...aire,
    });
  }));

  /**
   * Get all Structures
   */
  const accounts = await getReadableRowsFrom(tables.ACCOUNTS);
  reporter.info(`Signatures: ${accounts.length}`);

  const allStructureAccounts = accounts
    .filter(account => {
      if (
        account.Type === 'Structure de plongée'
        // && account['Inscription finalisée']
      ) {
        return true;
      }

      return false;
    });

  const publishedStructures = allStructureAccounts
    .filter(account => Boolean(
      account['Je donne mon accord pour apparaître sur la carte CaPeL des structures'],
    ));

  const allUserAccounts = accounts
    .filter(account => {
      if (
        account.Type === 'Plongeur individuel'
        && account['Inscription finalisée']
      ) {
        return true;
      }

      return false;
    });

  reporter.info(`Structures (published): ${publishedStructures.length}`);

  await Promise.all(publishedStructures.map(structure => {
    const contentDigest = createContentDigest(structure);
    const type = 'Structure';
    const publicFields = prune(structure, structurePublicFields);

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
  const allSignatures = await getReadableRowsFrom(tables.SIGNATURES);
  const signatures = allSignatures.filter(({ Signé }) => Boolean(Signé));
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
    { key: 'accountCount', count: accounts.length },
    { key: 'userAccountCount', count: allUserAccounts.length },
    { key: 'structureCount', count: allStructureAccounts.length },

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
