import React from 'react';

import L from 'leaflet'; // eslint-disable-line no-unused-vars
import 'leaflet-sleep';

import { Helmet } from 'react-helmet';
import { MapContainer, ScaleControl, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles } from '@material-ui/core/styles';
import Spots from './Spots';
import MapStructures from './MapStructures';
import MapZones from './MapZones';
import useLckSettings from '../hooks/useLckSettings';

const isLive = typeof window !== 'undefined';

const FallbackComponent = () => (
  <div>Map component crash</div>
);

const useStyles = makeStyles({
  root: {
    height: 'auto',
    width: 'auto',
    minHeight: 300,
    minWidth: 100,
    flex: '1 1 auto',
  },
});

const LocationSelector = ({ handleClick }) => {
  useMapEvent('click', handleClick);
  return null;
};

const RemoveAttributionPrefix = () => {
  const map = useMap();
  React.useEffect(() => map.attributionControl.setPrefix(''), [map]);
  return null;
};

const Map = ({ onBackgroundClick, spotProps = {}, children = null, ...props }) => {
  const classes = useStyles();

  const { 1: {
    MAP_CENTER,
    MAP_ZOOM,
  } } = useLckSettings();

  let center = [43.01, 6.275];
  try {
    center = JSON.parse(MAP_CENTER.text_value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse custom center for map');
  }

  let zoom = 11.5;
  try {
    zoom = JSON.parse(MAP_ZOOM.text_value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse custom zoom for map');
  }

  if (!isLive) { return null; }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Helmet>

      <MapContainer
        center={center}
        zoom={zoom}
        className={classes.root}
        zoomSnap={0.5}
        zoomDelta={0.5}
        sleepNote={false}
        hoverToWake={false}
        {...props}
      >
        <RemoveAttributionPrefix />

        {typeof onBackgroundClick === 'function' && (
          <LocationSelector handleClick={onBackgroundClick} />
        )}

        {children}

        <Spots {...spotProps} />

        <MapStructures />

        <MapZones />

        <TileLayer
          attribution=""
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
        />

        <ScaleControl position="bottomleft" />
      </MapContainer>
    </ErrorBoundary>
  );
};

export default Map;
