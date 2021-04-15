import React from 'react';

// import { StaticImage } from 'gatsby-plugin-image';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

const HomeInstit = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" color="primary">
          La plongée sous marine
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" color="primary">
          Où plonger ?
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" color="primary">
          La réglementation
        </Typography>

        <Typography variant="h5">
          La plongée :
        </Typography>
        <Typography variant="body1">
          Alias maiores adipisci. Repellat natus voluptatem libero suscipit
          sed consequatur est. Nesciunt expedita deserunt dolor numquam
          ullam ea nisi eius.
        </Typography>

        <Typography variant="h5">
          Le mouillage :
        </Typography>
        <Typography variant="body1">
          Alias maiores adipisci. Repellat natus voluptatem libero suscipit
          sed consequatur est. Nesciunt expedita deserunt dolor numquam
          ullam ea nisi eius.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomeInstit;
