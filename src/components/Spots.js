import React from 'react';

import useLckSettings from '../hooks/useLckSettings';
import useSpots from '../hooks/useSpots';
import Spot from './Spot';

const Spots = props => {
  const spots = useSpots() || [];

  const { 1: {
    SPOT_PUBLIC_FIELDS,
  } } = useLckSettings();

  let spotFields = [];
  try {
    spotFields = JSON.parse(SPOT_PUBLIC_FIELDS.text_value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse custom fields for Spots');
  }

  return (
    <>
      {spots.map(spot => (
        <Spot key={spot.id} spot={spot} fields={spotFields} {...props} />
      ))}
    </>
  );
};

export default Spots;
