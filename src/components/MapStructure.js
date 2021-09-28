import React from 'react';
import { Popup, Marker, Tooltip } from 'react-leaflet';
import { icon } from 'leaflet';
import { Typography } from '@material-ui/core';
import { Link } from 'gatsby-material-ui-components';

const defaultIcon = {
  iconUrl: '/structure.svg',
  iconSize: [16, 16],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -8], // from iconAnchor
  tooltipAnchor: [8, 0], // from iconAnchor
};

const MapStructures = ({ structure, ...props }) => {
  const [lon, lat] = structure.geojson.coordinates;

  let structureData = {};
  try {
    structureData = JSON.parse(structure.internal.content);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse data for Structure');
  }

  return (
    <Marker
      position={[lat, lon]}
      icon={icon(defaultIcon)}
      {...props}
    >
      <Tooltip>{structure.Nom}</Tooltip>

      <Popup>
        <Typography variant="h4" component="h3">
          {structure.Nom}
        </Typography>

        <Typography variant="body2" component="address">
          {structureData.Adresse}<br />
          {structureData['Code postal']} {structureData.Ville}<br />
          {structureData['Téléphone principal']}<br />
        </Typography>

        {Boolean(structureData['Site web']) && (
          <Typography variant="body2">
            <Link to={structureData['Site web']}>
              Voir leur site internet
            </Link>
          </Typography>
        )}
      </Popup>
    </Marker>
  );
};

export default MapStructures;
