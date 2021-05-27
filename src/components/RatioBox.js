import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  outer: ({ ratio }) => ({
    width: 'auto',
    height: 0,
    paddingBottom: `calc(100% / ${ratio})`,
    position: 'relative',
  }),

  inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },
});

const RatioBox = ({ ratio = (4 / 3), ...props }) => {
  const classes = useStyles({ ratio });

  return (
    <Box className={classes.outer}>
      <Box className={classes.inner} {...props} />
    </Box>
  );
};

export default RatioBox;
