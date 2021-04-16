import React from 'react';

import useStructures from '../hooks/useStructures';
import MapStructure from './MapStructure';

const MapStructures = props => {
  const structures = useStructures();

  if (!structures || !structures.length) {
    return null;
  }

  return (
    <>
      {structures.map(structure => {
        const {
          name,
          childMarkdownRemark: { frontmatter: { location }, frontmatter },
        } = structure;

        const geojson = {
          type: 'Feature',
          geometry: JSON.parse(location),
          properties: { name, ...frontmatter },
        };

        return (
          <MapStructure
            key={name}
            geojson={geojson}
            structure={structure}
            {...props}
          />
        );
      })}
    </>
  );
};

export default MapStructures;
