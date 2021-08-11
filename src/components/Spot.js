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

const maskBase = {
  iconUrl: '/diving-mask.svg',
  iconSize: [32, 22],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -12], // from iconAnchor
  tooltipAnchor: [17, 0], // from iconAnchor
};

const shipwreck = {
  iconUrl: '/shipwreck.svg',
  iconSize: [32, 22],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -12], // from iconAnchor
  tooltipAnchor: [17, 0], // from iconAnchor
};

const maskIcon = icon && icon(maskBase);
const maskIconBuoy = icon && icon({ ...maskBase, iconUrl: '/diving-mask-buoy.svg' });
const wreckIcon = icon && icon(shipwreck);
const wreckIconBuoy = icon && icon({ ...shipwreck, iconUrl: '/shipwreck-buoy.svg' });

const getIcon = spot => {
  if (spot.Type === 'Epave') {
    return spot.Amarrage
      ? wreckIconBuoy
      : wreckIcon;
  }

  return spot.Amarrage
    ? maskIconBuoy
    : maskIcon;
};

const Spot = ({
  isFav,
  spot,
  fields = [],
  popupComponent: CustomPopup,
  ...props
}) => {
  if (!spot.geojson) {
    return null;
  }

  let spotData = {};
  try {
    spotData = JSON.parse(spot.internal.content);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse data for Spots');
  }

  const [lon, lat] = spot.geojson.coordinates;

  const spotIcon = getIcon(spot);

  return (
    <Marker
      position={[lat, lon]}
      opacity={spot.By ? 0.5 : 1}
      icon={spotIcon}
      {...props}
    >
      <Tooltip>{spot.Nom}</Tooltip>

      {(typeof CustomPopup === 'undefined') && (
        <Popup>
          <Typography variant="h4" component="h3">
            {spot.Nom}
          </Typography>

          {Boolean(fields.length) && (
            <Table size="small">
              <TableBody>
                {fields.map(field => (
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
