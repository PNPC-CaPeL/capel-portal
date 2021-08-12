import React from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import Map from '../Map';

import useBlockStyles from '../../hooks/useBlockStyles';

const CustomMap = () => {
  const classes = useBlockStyles();

  return (
    <>
      <Grid
        container
        className={clsx(
          classes.fullbleed,
          classes.map,
        )}
      >
        <Map />
      </Grid>
    </>
  );
};

export default CustomMap;
