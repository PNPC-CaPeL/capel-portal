import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useCounts from '../hooks/useCounts';

const useStyles = makeStyles(() => ({
  total: {
    fontWeight: '600',
    fontSize: '10em',
    lineHeight: 1,
    textAlign: 'right',
  },
}));

const Count = ({ title, single, structure, total }) => {
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
        <Box>{single} individuels</Box>
        <Box>{structure} structures</Box>
      </Grid>
    </Grid>
  );
};

const HomeStats = () => {
  const counts = useCounts();

  return (
    <Grid container spacing={2} justify="space-around">
      <Grid item>
        <Count title={<>Nombre<br />d'inscriptions</>} {...counts.regulation} />
      </Grid>
      <Grid item>
        <Count title={<>Nombre<br />d'autorisations délivrées</>} {...counts.declaration} />
      </Grid>
    </Grid>
  );
};

export default HomeStats;
