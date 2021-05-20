import React from 'react';

export const useCounts = () => {
  // To be replaced with fetched data from LocoKit
  const counts = React.useMemo(() => ({
    regulation: { structure: 0, single: 0 },
    declaration: { structure: 0, single: 0 },
  }), []);

  return counts;
};

export default useCounts;
