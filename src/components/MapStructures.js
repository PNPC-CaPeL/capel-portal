import React from 'react';

import useStructures from '../hooks/useStructures';
import MapStructure from './MapStructure';

const MapStructures = props => {
  const structures = useStructures();

  return (
    <>
      {structures.map(structure => (
        <MapStructure
          key={structure.id}
          structure={structure}
          {...props}
        />
      ))}
    </>
  );
};

export default MapStructures;
