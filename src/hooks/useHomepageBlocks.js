import React from 'react';

export const useHomepageBlocks = () => {
  // To be replaced with fetched data from Ghost
  const blocks = React.useMemo(() => ([]), []);

  return blocks;
};

export default useHomepageBlocks;
