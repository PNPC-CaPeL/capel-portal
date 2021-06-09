import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useLckMetrics from '../hooks/useLckMetrics';

const useStyles = makeStyles(theme => ({
  total: {
    fontWeight: '600',
    fontSize: '10em',
    lineHeight: 1,
    textAlign: 'right',
    fontFamily: 'sans',
    letterSpacing: '-0.1em',
    marginRight: theme.spacing(2),
  },
}));

const Count = ({ title, single, structure, total, children }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item className={classes.total}>
        {total}
      </Grid>

      <Grid item>
        <Typography variant="h4">
          {title}
        </Typography>

        {children || (
          <>
            <Box>{single} individuels</Box>
            <Box>{structure} structures</Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

const HomeStats = props => {
  const { 1: metrics } = useLckMetrics();

  return (
    <Grid container spacing={2} justify="space-around" {...props}>
      <Grid item>
        <Count
          title={<>signatures du<br />réglement du parc</>}
          total={metrics.signatureCount.count}
        >
          <Box>dont {metrics.signatureCountByPI.count} individuels</Box>
          <Box>et {metrics.signatureCountBySP.count} structures</Box>
        </Count>
      </Grid>
      <Grid item>
        <Count
          title={<>autorisations<br /> de plongée délivrées</>}
          total={metrics.diveCount.count}
        >
          <Box>pour {metrics.diverCount.count} plongeurs</Box>
        </Count>
      </Grid>
    </Grid>
  );
};

export default HomeStats;
