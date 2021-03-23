import React from 'react';

import { Import, Export } from 'tripetto-runner-foundation';
import { Box, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import { CircleMarker } from 'react-leaflet';

import createPersistedState from 'use-persisted-state';

import Map from './Map';
import TripettoForm from './TripettoForm';
import useDivings from '../hooks/useDivings';
import { withDivings } from '../lib/definition-enhancers';
import DTPicker from './DTPicker';
import Link from './Link';

const isLive = typeof window !== 'undefined';

const useFormCache = createPersistedState('capel-form-cache');

const Declaration = () => {
  const formInstance = React.useRef();
  const [position, setPosition] = React.useState();
  const [complete, setComplete] = React.useState(false);

  const [formCache, setFormCache] = useFormCache(false);

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
    const location = event?.target?.options?.title;
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
              onReady={instance => {
                formInstance.current = instance;
                formCache && Import.fields(instance, formCache);
              }}
              enhanceDefinition={withDivings(divings)}
              onComplete={instance => {
                const formFields = Export.fields(instance).fields;
                formCache && setFormCache(formFields);
                setComplete(true);
              }}
            />

            <Box style={{ textAlign: 'center' }}>
              <FormControlLabel
                control={(
                  <Switch
                    size="small"
                    checked={!!formCache}
                    onChange={() => setFormCache(prevFormCache => (prevFormCache ? false : {}))}
                  />
                )}
                label="Mémoriser ma saisie"
                labelPlacement="start"
              />
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Declaration;
