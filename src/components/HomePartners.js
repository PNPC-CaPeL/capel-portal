import React from 'react';

import { StaticImage } from 'gatsby-plugin-image';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  partners: {
    marginTop: '3rem',
  },

  partner: {
    height: 120,
  },
});

const HomePartners = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.partners}
      spacing={1}
      justify="space-between"
    >
      <Grid item xs={6} md={2}>
        <StaticImage
          className={classes.partner}
          placeholder="blurred"
          objectFit="contain"
          src="../remote-contents/media/marha.png"
          alt="marha"
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <StaticImage
          className={classes.partner}
          placeholder="blurred"
          objectFit="contain"
          src="../remote-contents/media/life.jpg"
          alt="Life"
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <StaticImage
          className={classes.partner}
          placeholder="blurred"
          objectFit="contain"
          src="../remote-contents/media/natura2000.png"
          alt="Natura 2000"
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <StaticImage
          className={classes.partner}
          placeholder="blurred"
          objectFit="contain"
          src="../remote-contents/media/ffessm.png"
          alt="FFESSM"
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <StaticImage
          className={classes.partner}
          placeholder="blurred"
          objectFit="contain"
          src="../remote-contents/media/ffessm83.png"
          alt="FFESSM 83"
        />
      </Grid>
    </Grid>
  );
};

export default HomePartners;
