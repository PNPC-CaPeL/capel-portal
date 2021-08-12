import React from 'react';

import L from 'leaflet'; // eslint-disable-line no-unused-vars
import 'leaflet-sleep';

import { Helmet } from 'react-helmet';
import * as ReactLeaflet from 'react-leaflet';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles } from '@material-ui/core/styles';
import Spots from './Spots';
import MapStructures from './MapStructures';
import MapZones from './MapZones';
import useLckSettings from '../hooks/useLckSettings';
import MapAires from './MapAires';

const { MapContainer, ScaleControl, TileLayer, useMap, useMapEvent } = ReactLeaflet;

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
    MAP_BASEMAP,
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

  let layers = [];
  try {
    layers = JSON.parse(MAP_BASEMAP.text_value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse basemaps');
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

        <MapAires />

        <MapZones />

        {layers.map(({ component, ...rest }) => {
          const Component = ReactLeaflet[component] || component || TileLayer;
          return (
            <Component key={rest.url} {...rest} />
          );
        })}

        <ScaleControl position="bottomleft" />
      </MapContainer>
    </ErrorBoundary>
  );
};

export default Map;
