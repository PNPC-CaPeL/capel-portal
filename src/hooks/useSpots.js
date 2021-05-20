import React from 'react';

export const useSpots = () => {
  // To be replaced with fetched data from LocoKit
  const spots = React.useMemo(() => ([]), []);

  return spots;
};

export default useSpots;
