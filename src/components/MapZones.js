import React from 'react';
import { GeoJSON, Tooltip } from 'react-leaflet';

import { stylesByProtection } from '../lib/map-styles';
import { useZones } from '../hooks/useZones';

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
