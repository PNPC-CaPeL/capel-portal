import React from 'react';

import { Import } from 'tripetto-runner-foundation';
import { Grid } from '@material-ui/core';
import { CircleMarker } from 'react-leaflet';

import Map from './Map';
import TripettoForm from './TripettoForm';

const Declaration = () => {
  const formInstance = React.useRef();
  const [position, setPosition] = React.useState();

  const handleMapClick = ({ latlng: { lat, lng } }) => {
    if (!formInstance.current) {
      return;
    }

    Import.fields(formInstance.current, [
      { name: 'Lieu', value: [lat.toFixed(5), lng.toFixed(5)].toString() },
    ]);
    setPosition({ lat, lng });
  };

  const handleSpotClick = event => {
    const location = event?.layer?.feature?.properties?.title;
    if (!location) { return; }
    Import.fields(formInstance.current, [{ name: 'Lieu', value: location }]);
    setPosition(0);
  };

  return (
    <Grid container justify="space-around">
      <Grid item md={7}>
        <Map
          onBackgroundClick={handleMapClick}
          spotProps={{ eventHandlers: { click: handleSpotClick } }}
        >
          {Boolean(position) && <CircleMarker center={position} radius={5} />}
        </Map>
      </Grid>

      <Grid item md={4}>
        <TripettoForm
          form="declaration"
          endpoint={process.env.GATSBY_ENDPOINT_DECLARATION}
          onReady={instance => { formInstance.current = instance; }}
        />
      </Grid>
    </Grid>
  );
};

export default Declaration;
