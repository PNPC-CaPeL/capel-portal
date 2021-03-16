import React from 'react';
import L from 'leaflet';

import { Helmet } from 'react-helmet';
import { MapContainer, ScaleControl, TileLayer, useMapEvent } from 'react-leaflet';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles } from '@material-ui/core/styles';
import Spots from './Spots';

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

const Map = ({ onBackgroundClick, spotProps = {}, children = null }) => {
  const classes = useStyles();
  if (!isLive) { return null; }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Helmet>

      <MapContainer
        center={[43.01, 6.4]}
        zoom={12}
        className={classes.root}
        zoomSnap={0.5}
        zoomDelta={0.5}
      >

        {typeof onBackgroundClick === 'function' && (
          <LocationSelector handleClick={onBackgroundClick} />
        )}

        {children}

        <Spots {...spotProps} />

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