import React from 'react';
import { GeoJSON, Tooltip } from 'react-leaflet';

import { useZones } from '../hooks/useZones';
import { useLckSettings } from '../hooks/useLckSettings';

const MapZones = props => {
  const zones = useZones();

  const { 1: {
    MAP_STYLES: { value: polygonStyles = {} } = {},
  } } = useLckSettings();

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
            style={() => polygonStyles[zone.Style]}
            {...props}
          >
            <Tooltip sticky offset={[10, 0]}>
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
