import React from 'react';
import { GeoJSON, Tooltip } from 'react-leaflet';

import { useDivisions } from '../hooks/useDivisions';
import { useLckSettings } from '../hooks/useLckSettings';

const MapDivisions = props => {
  const divisions = useDivisions();

  const { 1: {
    MAP_STYLES: { value: polygonStyles = {} } = {},
  } } = useLckSettings();

  return (
    <>
      {divisions.map(division => {
        if (!division.geojson) {
          return null;
        }

        return (
          <GeoJSON
            key={division.id}
            data={division.geojson}
            style={() => polygonStyles[division.Style]}
            {...props}
          >
            <Tooltip sticky offset={[10, 0]}>
              <strong>{division.Nom}</strong>
            </Tooltip>
          </GeoJSON>
        );
      })}
    </>
  );
};

export default MapDivisions;
