import React from 'react';
import { Popup, Marker, Tooltip } from 'react-leaflet';
import { icon } from 'leaflet';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import useLckSettings from '../hooks/useLckSettings';

const maskBase = {
  iconUrl: '/spot.svg',
  iconSize: [12, 12],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -7], // from iconAnchor
  tooltipAnchor: [7, 0], // from iconAnchor
};

const maskIcon = icon && icon(maskBase);

const Spot = ({
  isFav,
  spot,
  popupComponent: CustomPopup,
  ...props
}) => {
  const { 1: {
    SPOT_PUBLIC_FIELDS,
  } } = useLckSettings();

  if (!spot.geojson) {
    return null;
  }

  let spotFields = [];
  try {
    spotFields = JSON.parse(SPOT_PUBLIC_FIELDS.text_value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse custom fields for Spots');
  }

  let spotData = {};
  try {
    spotData = JSON.parse(spot.internal.content);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse data for Spots');
  }

  const [lon, lat] = spot.geojson.coordinates;

  return (
    <Marker
      position={[lat, lon]}
      opacity={1}
      icon={maskIcon}
      {...props}
      title={spot.Nom}
    >
      <Tooltip>{spot.Nom}</Tooltip>

      {(typeof CustomPopup === 'undefined') && (
        <Popup>
          <Typography variant="h4" component="h3">
            {spot.Nom}
          </Typography>

          {Boolean(spotFields.length) && (
            <Table size="small">
              <TableBody>
                {spotFields.map(field => (
                  spotData[field] ? (
                    <TableRow key={field}>
                      <TableCell component="th">{field}</TableCell>
                      <TableCell>{spotData[field]}</TableCell>
                    </TableRow>
                  ) : null
                ))}
              </TableBody>
            </Table>
          )}
        </Popup>
      )}

      {CustomPopup && (<CustomPopup spot={spot} />)}
    </Marker>
  );
};

export default Spot;
