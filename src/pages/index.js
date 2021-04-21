import React from 'react';
import clsx from 'clsx';

import { Box, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HomeInformations from '../components/HomeInformations';
import Layout from '../components/Layout';
import Map from '../components/Map';

import HomeHero from '../components/HomeHero';
import HomePartners from '../components/HomePartners';
import HomeInstit from '../components/HomeInstit';
import HomeStats from '../components/HomeStats';
import MapLegend from '../components/MapLegend';

const useStyles = makeStyles(theme => ({
  root: {},

  main: {
    marginTop: 0,
    paddingBottom: theme.spacing(10),
  },

  map: {
    height: '80vh',
  },

  title: {
    marginTop: theme.spacing(4),
    textTransform: 'uppercase',
  },

  bluebleed: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },

  meteo: {
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout
      header={false}
      // footer={false}
      container={false}
      className={classes.main}
      rootClass={classes.root}
    >
      <HomeHero />

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Nos espaces de plongées
        </Typography>
      </Container>

      <Grid container className={classes.map}>
        <Map />
      </Grid>

      <Container>
        <MapLegend />
      </Container>

      <Container>
        <Typography variant="h3" className={classes.title} color="primary">
          Informations
        </Typography>

        <HomeInformations />
      </Container>

      <Container>
        <Typography
          variant="h2"
          className={classes.title}
          color="primary"
          style={{ textAlign: 'right' }}
        >
          Météo marine
        </Typography>
      </Container>

      <Box className={clsx(classes.meteo, classes.bluebleed)}>
        <Container>
          Météo
          <Box style={{ height: 150 }} />
        </Container>
      </Box>

      <Container style={{ marginTop: '2rem' }}>
        <HomeInstit />
      </Container>

      <Box className={clsx(classes.bluebleed)}>
        <Container>
          <HomeStats />
        </Container>
      </Box>

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Nos partenaires
        </Typography>

        <HomePartners />
      </Container>
    </Layout>
  );
};

export default HomePage;
