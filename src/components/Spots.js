import React from 'react';

import useSpots from '../hooks/useSpots';
import Spot from './Spot';

const Spots = props => {
  const spots = useSpots() || [];

  return (
    <>
      {spots.map(spot => (
        <Spot key={spot.id} spot={spot} {...props} />
      ))}
    </>
  );
};

export default Spots;
