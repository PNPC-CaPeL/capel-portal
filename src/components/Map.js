import React from 'react';
import L from 'leaflet';

import { Helmet } from 'react-helmet';
import { MapContainer, ScaleControl, TileLayer } from 'react-leaflet';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles } from '@material-ui/core/styles';
import Spots from './Spots';

// import BaseLayerControl from './BaseLayerControl';
// import CompassControl from './CompassControl';
// import MapLayers from './MapLayers';
// import SyncedViewport from './SyncedViewport';

const isLive = typeof window !== 'undefined';

if (isLive) {
  ['iconUrl', 'shadowUrl', 'iconRetinaUrl'].forEach(icon => {
    const previousValue = L.Icon.Default.prototype.options[icon];
    L.Icon.Default.prototype.options[icon] = `https://unpkg.com/leaflet@1.7.1/dist/images/${previousValue}`;
  });
}

// const stationsPaneStyle = { zIndex: 610 };
// const tooltipPopupMarkerPaneStyle = { zIndex: 460 };
// const highlightPaneStyle = { zIndex: 480 };
// const surfacesPaneStyle = { zIndex: 450 };

const FallbackComponent = () => (
  <div>Map component crash</div>
);

const useStyles = makeStyles({
  root: {
    height: 'auto',
    width: 'auto',
    minHeight: 100,
    minWidth: 100,
    flex: '1 1 auto',
  },
});

const Map = () => {
  const classes = useStyles();
  if (!isLive) { return null; }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Helmet>

      <MapContainer
        // preferCanvas
        // bounds={[[45.3852, -0.1450], [43.7669, 4.0844]]}
        center={[43.01, 6.4]}
        zoom={12}
        className={classes.root}
        zoomSnap={0.5}
        zoomDelta={0.5}
      >
        {/* <SyncedViewport /> */}

        {/* <Pane name="stations" style={stationsPaneStyle} /> */}
        {/* <Pane name="tooltipPopupMarker" style={tooltipPopupMarkerPaneStyle} /> */}
        {/* <Pane name="highlight" style={highlightPaneStyle} /> */}
        {/* <Pane name="surfaces" style={surfacesPaneStyle} /> */}

        {/* <CompassControl position="topleft" /> */}

        {/* <BaseLayerControl /> */}
        {/* <MapLayers /> */}
        <Spots />

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
