import React from 'react';

import { StaticImage } from 'gatsby-plugin-image';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';

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
        <Link to="https://www.life-marha.fr">
          <StaticImage
            className={classes.partner}
            placeholder="blurred"
            objectFit="contain"
            src="../assets/marha.png"
            alt="marha"
          />
        </Link>
      </Grid>
      <Grid item xs={6} md={2}>
        <Link to="https://www.life-marha.fr">
          <StaticImage
            className={classes.partner}
            placeholder="blurred"
            objectFit="contain"
            src="../assets/life.jpg"
            alt="Life"
          />
        </Link>
      </Grid>
      <Grid item xs={6} md={2}>
        <Link to="https://www.natura2000.fr">
          <StaticImage
            className={classes.partner}
            placeholder="blurred"
            objectFit="contain"
            src="../assets/natura2000.png"
            alt="Natura 2000"
          />
        </Link>
      </Grid>
      <Grid item xs={6} md={2}>
        <Link to="https://ffessm.fr">
          <StaticImage
            className={classes.partner}
            placeholder="blurred"
            objectFit="contain"
            src="../assets/ffessm.png"
            alt="FFESSM"
          />
        </Link>
      </Grid>
      <Grid item xs={6} md={2}>
        <Link to="https://ffessm-var.fr">
          <StaticImage
            className={classes.partner}
            placeholder="blurred"
            objectFit="contain"
            src="../assets/ffessm83.png"
            alt="FFESSM 83"
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default HomePartners;
