import React from 'react';

import { Import, Export } from 'tripetto-runner-foundation';
import { Box, Grid, Typography } from '@material-ui/core';
import { CircleMarker } from 'react-leaflet';

import createPersistedState from 'use-persisted-state';

import Map from './Map';
import TripettoForm from './TripettoForm';
import useDivings from '../hooks/useDivings';
import useCadres from '../hooks/useCadres';
import { withDivings, withCadres, compose, withStructures } from '../lib/definition-enhancers';
import DTPicker from './DTPicker';
import Link from './Link';
import useRegStructures from '../hooks/useRegStructures';
import SaveFormState from './SaveFormState';

const isLive = typeof window !== 'undefined';

const useFormCache = createPersistedState('capel-form-cache');

const reducer = (state, action) => {
  switch (action.type) {
    case 'POSITION_SET': {
      return { ...state, ...action.payload };
    }
    case 'COMPLETE_SET': {
      return { ...state, complete: action.payload };
    }
    case 'DATETIME_SET': {
      return { ...state, datetime: action.payload };
    }
    default:
      return state;
  }
};

const Declaration = () => {
  const formInstance = React.useRef();
  const [state, dispatch] = React.useReducer(reducer, {
    complete: false,
    datetime: new Date(),
  });

  const [formCache, setFormCache] = useFormCache(false);

  const divings = useDivings();
  const cadres = useCadres();
  const structures = useRegStructures();

  const handleMapClick = ({ latlng: { lat, lng } }) => {
    if (!formInstance?.current?.isRunning) {
      return;
    }

    dispatch({
      type: 'POSITION_SET',
      payload: {
        lat: +lat.toFixed(5),
        lng: +lng.toFixed(5),
        name: null,
      },
    });

    Import.fields(formInstance.current, [
      { name: 'Lieu', value: JSON.stringify([+lat.toFixed(5), +lng.toFixed(5)]) },
    ]);
  };

  const handleSpotClick = event => {
    const marker = event.target;
    const location = marker?.options?.title;
    if (!location || !formInstance?.current?.isRunning) { return; }

    const latLng = marker.getLatLng();

    dispatch({ type: 'POSITION_SET', payload: { ...latLng, name: location } });
    Import.fields(formInstance.current, [
      { name: 'Lieu', value: location },
    ]);
  };

  const handleDateChange = isoDate => {
    if (!isoDate || !formInstance?.current?.isRunning) { return; }
    Import.fields(formInstance.current, [{ name: 'Date', value: isoDate }]);
    dispatch({ type: 'DATETIME_SET', payload: isoDate });
  };

  return (
    <Grid container justify="space-between">
      {Boolean(state.complete) && (
        <Grid item md={4}>
          <Typography variant="h1" paragraph>
            Merci
          </Typography>

          <Typography variant="body1" paragraph>
            vous recevrez une confirmation de la prise en compte de votre déclarations
            par e-mail dans quelques minutes.
          </Typography>

          <Typography variant="body1" paragraph>
            Vous pouvez <Link to="." onClick={() => dispatch({ type: 'COMPLETE_SET', payload: false })}>déclarer une autre plongée</Link>,
            ou retourner sur la <Link to="/">page d'accueil</Link>.
          </Typography>
        </Grid>
      )}

      {!state.complete && (
        <>
          <Grid item md={7}>
            <Map
              onBackgroundClick={handleMapClick}
              spotProps={{ eventHandlers: { click: handleSpotClick }, popupComponent: null }}
            >
              {Boolean(state.lat && state.lng && !state.name) && (
                <CircleMarker center={{ lat: state.lat, lng: state.lng }} radius={5} />
              )}
            </Map>
            <br />

            {isLive && <DTPicker onChange={handleDateChange} value={state.datetime} />}
          </Grid>

          <Grid item md={4}>
            <Box style={{ textAlign: 'right' }}>
              <SaveFormState
                checked={!!formCache}
                onChange={() => setFormCache(prevFormCache => (prevFormCache ? false : {}))}
                label="Mémoriser ma saisie"
              />
            </Box>

            <TripettoForm
              form="declaration"
              endpoint={process.env.GATSBY_ENDPOINT_DECLARATION}
              onReady={instance => {
                formInstance.current = instance;
                formCache && Import.fields(instance, formCache);

                const cachedDatetime = formCache && formCache.find?.(({ name }) => name === 'Date');
                if (cachedDatetime) {
                  dispatch({ type: 'DATETIME_SET', payload: cachedDatetime.value });
                }
              }}
              enhanceDefinition={compose(
                withDivings(divings),
                withCadres(cadres),
                withStructures(structures),
              )}
              onComplete={instance => {
                const formFields = Export.fields(instance).fields;
                formCache && setFormCache(formFields);
                dispatch({ type: 'COMPLETE_SET', payload: true });
              }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Declaration;
