import React from 'react';

import L from 'leaflet'; // eslint-disable-line no-unused-vars
import 'leaflet-sleep';

import { Helmet } from 'react-helmet';
import { MapContainer, ScaleControl, TileLayer, useMapEvent } from 'react-leaflet';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles } from '@material-ui/core/styles';
import Spots from './Spots';
import MapStructures from './MapStructures';
import GeoJSONAsync from './GeoJSONAsync';

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

const Map = ({ onBackgroundClick, spotProps = {}, children = null, ...props }) => {
  const classes = useStyles();
  if (!isLive) { return null; }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Helmet>

      <MapContainer
        center={[43.01, 6.275]}
        zoom={11.5}
        className={classes.root}
        zoomSnap={0.5}
        zoomDelta={0.5}
        sleepNote={false}
        hoverToWake={false}
        {...props}
      >

        {typeof onBackgroundClick === 'function' && (
          <LocationSelector handleClick={onBackgroundClick} />
        )}

        {children}

        <Spots {...spotProps} />

        <MapStructures />

        <GeoJSONAsync filename="zones.geojson" />

        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
        />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
        />

        <ScaleControl position="bottomleft" />
      </MapContainer>
    </ErrorBoundary>
  );
};

export default Map;
