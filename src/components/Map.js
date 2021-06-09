import React from 'react';

import L from 'leaflet'; // eslint-disable-line no-unused-vars
import 'leaflet-sleep';

import { Helmet } from 'react-helmet';
import { MapContainer, ScaleControl, TileLayer, useMapEvent } from 'react-leaflet';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Spots from './Spots';
import MapStructures from './MapStructures';
import GeoJSONAsync from './GeoJSONAsync';

import { styleFromProperties } from '../lib/map-styles';

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

const circleMarkerDefaults = {
  radius: 8,
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const LocationSelector = ({ handleClick }) => {
  useMapEvent('click', handleClick);
  return null;
};

const Map = ({ onBackgroundClick, spotProps = {}, children = null, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const pointToLayerA = React.useCallback((feature, latlng) => L.circleMarker(latlng, {
    ...circleMarkerDefaults,
    fillColor: theme.palette.primary.main,
  }), [theme.palette.primary.main]);

  const pointToLayerB = React.useCallback((feature, latlng) => L.circleMarker(latlng, {
    ...circleMarkerDefaults,
    fillColor: theme.palette.secondary.main,
  }), [theme.palette.secondary.main]);

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

        <GeoJSONAsync
          filename="https://raw.githubusercontent.com/PNPC-CaPeL/capel-proto-contents/main/public/zones.geojson"
          style={({ properties }) => styleFromProperties(properties)}
        />

        <GeoJSONAsync
          filename="https://raw.githubusercontent.com/PNPC-CaPeL/capel-proto-contents/main/spots.geojson"
          pointToLayer={pointToLayerA}
        />

        <GeoJSONAsync
          filename="https://raw.githubusercontent.com/PNPC-CaPeL/capel-proto-contents/main/structures.geojson"
          pointToLayer={pointToLayerB}
        />

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
