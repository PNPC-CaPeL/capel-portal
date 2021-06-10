import React from 'react';
import clsx from 'clsx';

import { graphql, useStaticQuery } from 'gatsby';
import { Box, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Map from '../components/Map';

import HomeHero from '../components/HomeHero';
import HomeInformations from '../components/HomeInformations';
import HomeInstit from '../components/HomeInstit';
import HomeStats from '../components/HomeStats';
import MapLegend from '../components/MapLegend';
import HtmlAstRender from '../components/HtmlAstRender';

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

  spacings: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  fullbleed: {
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    width: '100vw',
  },

  blueback: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const {
    page: {
      childHtmlRehype: { htmlAst } = {},
    } = {},
  } = useStaticQuery(graphql`
    {
      page: ghostPage(slug: {eq: "frontpage"}) {
        childHtmlRehype {
          htmlAst
        }
      }
    }
  `);

  return (
    <Layout
      header={false}
      // footer={false}
      container={false}
      className={classes.main}
      rootClass={classes.root}
    >
      <HomeHero />

      <HtmlAstRender
        component={Container}
        hast={htmlAst}
        components={{
          h2: props => (
            <Typography variant="h2" className={classes.title} color="primary" {...props} />
          ),
          'custom-map': () => (
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

              <MapLegend />
            </>
          ),
          'custom-stats': () => (
            <Box
              className={clsx(
                classes.spacings,
                classes.blueback,
                classes.fullbleed,
              )}
            >
              <Container>
                <HomeStats />
              </Container>
            </Box>
          ),
          'custom-blocks': () => (
            <HomeInstit
              className={clsx(
                classes.spacings,
              )}
            />
          ),
          'custom-news': () => (
            <HomeInformations
              className={clsx(
                classes.spacings,
              )}
            />
          ),
        }}
      />

      {/*
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

      <Box className={clsx(classes.meteo, classes.blueback)}>
        <Container>
          Météo
          <Box style={{ height: 150 }} />
        </Container>
      </Box>
       */}

      {/* <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Vos observations
        </Typography>

        <Observations />
      </Container>

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Nos partenaires
        </Typography>

        <HomePartners />
      </Container> */}
    </Layout>
  );
};

export default HomePage;
