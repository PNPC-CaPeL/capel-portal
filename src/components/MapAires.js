import React from 'react';
import { GeoJSON, Tooltip } from 'react-leaflet';

import { useAires } from '../hooks/useAires';
import { useLckSettings } from '../hooks/useLckSettings';

const MapAires = props => {
  const aires = useAires();

  const { 1: {
    MAP_STYLES: { value: polygonStyles = {} } = {},
  } } = useLckSettings();

  return (
    <>
      {aires.map(aire => {
        if (!aire.geojson) {
          return null;
        }

        return (
          <GeoJSON
            key={aire.id}
            data={aire.geojson}
            style={() => polygonStyles[aire.Style]}
            {...props}
          >
            <Tooltip sticky>
              <strong>{aire.Nom}</strong>
            </Tooltip>
          </GeoJSON>
        );
      })}
    </>
  );
};

export default MapAires;
