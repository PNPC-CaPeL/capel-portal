import React from 'react';
import { Typography } from '@material-ui/core';

import useLckSettings from '../hooks/useLckSettings';

const Basemap = () => {
  const { 1: {
    MAP_BASEMAP: { value: basemaps = [] } = {},
  } } = useLckSettings();

  return (
    <>
      <Typography variant="body1">
        Fond de carte actuel via le paramètre <tt>MAP_BASEMAP</tt>
      </Typography>

      <pre>
        {JSON.stringify(basemaps, null, 2)}
      </pre>
    </>
  );
};

export default Basemap;
