import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useLckMetrics from '../hooks/useLckMetrics';

const useStyles = makeStyles(theme => ({
  total: {
    fontWeight: '500',
    fontSize: '3.75rem',
    lineHeight: 1,
    textAlign: 'right',
    fontFamily: 'sans',
    letterSpacing: '-0.1em',
    marginRight: theme.spacing(1),
    marginBottom: '-0.5rem',
  },
}));

const HomeStats = props => {
  const { 1: metrics } = useLckMetrics();
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="space-around" {...props}>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item className={classes.total}>
            {metrics.signatureCount.count}
          </Grid>

          <Grid item>
            <Typography variant="h4">
              signatures du<br />réglement du parc
            </Typography>
          </Grid>
        </Grid>
        <Box>
          dont {metrics.signatureCountByPI.count} individuels{' '}
          et {metrics.signatureCountBySP.count} structures
        </Box>
      </Grid>

      <Grid item>
        <Grid container alignItems="center">
          <Grid item className={classes.total}>
            {metrics.diveCount.count}
          </Grid>

          <Grid item>
            <Typography variant="h4">
              autorisations<br /> de plongée délivrées
            </Typography>
          </Grid>
        </Grid>
        <Box>pour {metrics.diverCount.count} plongeurs</Box>
      </Grid>
    </Grid>
  );
};

export default HomeStats;
