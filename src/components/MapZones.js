import React from 'react';
import { GeoJSON, Tooltip } from 'react-leaflet';

import { useZones } from '../hooks/useZones';

// https://leafletjs.com/reference-1.7.1.html#path-option
import styles from '../../data/legend-polygons.json';

export const stylesByProtection = styles.reduce(
  (acc, [{ protection }, style]) => ({ ...acc, [protection]: style }),
  {},
);

const MapZones = props => {
  const zones = useZones();

  return (
    <>
      {zones.map(zone => {
        if (!zone.geojson) {
          return null;
        }

        return (
          <GeoJSON
            key={zone.id}
            data={zone.geojson}
            style={() => stylesByProtection[zone.Protection]}
            {...props}
          >
            <Tooltip>
              <strong>{zone.Nom}</strong><br />
              <em>{zone.Protection}</em>
            </Tooltip>
          </GeoJSON>
        );
      })}
    </>
  );
};

export default MapZones;
