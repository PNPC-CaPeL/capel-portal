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

import { Link } from 'gatsby-material-ui-components';

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
const maskIconUser = icon && icon({ ...maskBase, iconUrl: '/diving-mask-user.svg' });
const wreckIcon = icon && icon(shipwreck);
const wreckIconBuoy = icon && icon({ ...shipwreck, iconUrl: '/shipwreck-buoy.svg' });
const wreckIconUser = icon && icon({ ...shipwreck, iconUrl: '/shipwreck-user.svg' });

const getIcon = spot => {
  const isEpave = spot.Type === 'Epave';
  const isUser = spot.Statut === 'Contribué';
  const isBuoy = spot.Amarrage;

  if (isUser) {
    return isEpave ? wreckIconUser : maskIconUser;
  }

  if (isBuoy) {
    return isEpave ? wreckIconBuoy : maskIconBuoy;
  }

  return isEpave ? wreckIcon : maskIcon;
};

const enhance = value => {
  if (value.match(/^https?:\/\//)) {
    return (
      <Link to={value}>En savoir plus…</Link>
    );
  }

  return value;
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
                      <TableCell>{enhance(spotData[field])}</TableCell>
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
