const { dump } = require('js-yaml');
const slugify = require('slugify');

slugify.extend({ '/': '-' });

const cleanGeo = geom => {
  if (geom.type === 'MultiPoint') {
    return {
      type: 'Point',
      coordinates: geom.coordinates[0],
    };
  }

  return geom;
};

const spotMeta = [
  { key: 'type_site', label: 'Type de site' },
  { key: 'classe_m', label: 'Classe de profondeur' },
  { key: 'expo_vents', label: 'Exposition au vent' },
  { key: 'site_abrit', label: 'Abrité au vent' },
  { key: 'interet_pl', label: 'Intérêt' },
  { key: 'struct_ges', label: 'Structure de gestion' },
  { key: 'nivminreq', label: 'Niveau minimum' },
];

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  actions: { createNode },
}) => {
  if (node.internal.type === 'File' && node.relativePath === 'spots.geojson') {
    const jsonContent = await loadNodeContent(node);
    const { features = [] } = JSON.parse(jsonContent) || {};

    features.forEach(({ properties, geometry }) => {
      const {
        id: geojsonId,
        nom_site_p: title,
        ...rest
      } = properties;

      const slug = slugify(title, { lower: true, strict: false, remove: /[()]/ });

      const fm = {
        ...rest,
        geojsonId,
        title,
        location: JSON.stringify(cleanGeo(geometry)),
      };

      const array = spotMeta.map(({ key, label }) => {
        if (typeof properties[key] === 'undefined') {
          return null;
        }

        return `**${label}** : ${properties[key]}  `;
      }).filter(Boolean);

      const content = [
        '---',
        dump(fm).trim(),
        '---',
        '',
        ...array,
      ].join('\n');

      createNode({
        id: createNodeId(geojsonId + title),
        parent: node.id,
        name: slug,
        relativeDirectory: 'spots',
        relativePath: `spots/${slug}.md`,
        extension: 'md',
        ext: '.md',
        internal: {
          type: 'Spot',
          contentDigest: createContentDigest(content),
          mediaType: 'text/markdown',
          content,
        },
      });
    });
  }

  if (node.internal.type === 'File' && node.relativePath === 'structures.geojson') {
    const jsonContent = await loadNodeContent(node);
    const { features = [] } = JSON.parse(jsonContent) || {};

    features.forEach(({ properties, geometry }) => {
      const {
        id: geojsonId,
        structure: title,
        site_url: url,
        ...rest
      } = properties;

      const slug = slugify(title, { lower: true, strict: false, remove: /[()]/ });

      const fm = {
        ...rest,
        geojsonId,
        title,
        url,
        location: JSON.stringify(cleanGeo(geometry)),
      };

      const content = [
        '---',
        dump(fm).trim(),
        '---',
        '',
        properties.activites && `Activités: ${properties.activites}`,
        '',
        `${properties.adresse}  `,
        properties.commune,
        '',
        url && `Lien : ${url}`,
      ].join('\n');

      createNode({
        id: createNodeId(geojsonId + title),
        parent: node.id,
        name: slug,
        relativeDirectory: 'structures',
        relativePath: `structures/${slug}.md`,
        extension: 'md',
        ext: '.md',
        internal: {
          type: 'Structure',
          contentDigest: createContentDigest(content),
          mediaType: 'text/markdown',
          content,
        },
      });
    });
  }
};
