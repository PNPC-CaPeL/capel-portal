import React from 'react';

import { Import } from 'tripetto-runner-foundation';
import { Grid, Typography } from '@material-ui/core';
import { CircleMarker } from 'react-leaflet';

import Map from './Map';
import TripettoForm from './TripettoForm';
import useDivings from '../hooks/useDivings';
import { withDivings } from '../lib/definition-enhancers';
import DTPicker from './DTPicker';
import Link from './Link';

const isLive = typeof window !== 'undefined';

const Declaration = () => {
  const formInstance = React.useRef();
  const [position, setPosition] = React.useState();
  const [complete, setComplete] = React.useState(false);

  const divings = useDivings();

  const handleMapClick = ({ latlng: { lat, lng } }) => {
    if (!formInstance?.current?.isRunning) {
      return;
    }

    Import.fields(formInstance.current, [
      { name: 'Lieu', value: JSON.stringify([+lat.toFixed(5), +lng.toFixed(5)]) },
    ]);
    setPosition({ lat, lng });
  };

  const handleSpotClick = event => {
    const location = event?.layer?.feature?.properties?.title;
    if (!location || !formInstance?.current?.isRunning) { return; }
    Import.fields(formInstance.current, [{ name: 'Lieu', value: location }]);
    setPosition(0);
  };

  const handleDateChange = isoDate => {
    if (!isoDate || !formInstance?.current?.isRunning) { return; }
    Import.fields(formInstance.current, [{ name: 'Date', value: isoDate }]);
  };

  return (
    <Grid container justify="space-around">
      {Boolean(complete) && (
        <Grid item md={4}>
          <Typography variant="h1" paragraph>
            Merci
          </Typography>

          <Typography variant="body1" paragraph>
            vous recevrez une confirmation de la prise en compte de votre déclarations
            par e-mail dans quelques minutes.
          </Typography>

          <Typography variant="body1" paragraph>
            Vous pouvez <Link to="." onClick={() => setComplete(false)}>déclarer une autre plongée</Link>,
            ou retourner sur la <Link to="/">page d'accueil</Link>.
          </Typography>
        </Grid>
      )}

      {!complete && (
        <>
          <Grid item md={7}>
            <Map
              onBackgroundClick={handleMapClick}
              spotProps={{ eventHandlers: { click: handleSpotClick }, popupComponent: null }}
            >
              {Boolean(position) && <CircleMarker center={position} radius={5} />}
            </Map>
            <br />

            {isLive && <DTPicker onChange={handleDateChange} />}
          </Grid>

          <Grid item md={4}>
            <TripettoForm
              form="declaration"
              endpoint={process.env.GATSBY_ENDPOINT_DECLARATION}
              onReady={instance => { formInstance.current = instance; }}
              enhanceDefinition={withDivings(divings)}
              onComplete={() => setComplete(true)}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Declaration;
