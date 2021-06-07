import React from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h3: {
    fontWeight: 'bold',
    marginTop: '0 !important',
  },
});

export const H2 = ({ className, ...props }) => (
  <Typography variant="h4" component="h3" {...props} />
);

export const H3 = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="h5"
      component="h4"
      {...props}
      className={clsx(className, classes.h3)}
    />
  );
};

export default {
  H3,
};
