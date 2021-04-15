import React from 'react';
import clsx from 'clsx';

import { Link as GatsbyLink } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { Box, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../components/Button';
import HomeInformations from '../components/HomeInformations';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Map from '../components/Map';

import Logo from '../assets/logo.svg';

const useStyles = makeStyles(theme => {
  const maxWidth = mq => `@media (max-width: ${theme.breakpoints.values[mq]}px)`;
  const minWidth = mq => `@media (min-width: ${theme.breakpoints.values[mq]}px)`;

  return {
    root: {},

    main: {
      marginTop: 0,
      paddingBottom: theme.spacing(10),
    },

    top: {
      position: 'relative',
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: '30%',
        border: '1px solid green',
      },
      [maxWidth('md')]: {
        paddingBottom: theme.spacing(3),
      },
      [maxWidth('sm')]: {
        paddingBottom: theme.spacing(2),
      },
    },

    bgImage: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: '30%',
      [maxWidth('md')]: {
        right: 0,
      },
    },

    left: {
      position: 'relative',
      zIndex: 1,

      alignSelf: 'stretch',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',

      '& a': { color: 'inherit' },

      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),

      color: 'white',
      [minWidth('md')]: {
        height: '90vh',
      },
    },

    logo: {
      maxWidth: '100%',
      height: 'auto',
      width: 500,
    },

    pnpc: {
      height: 'auto',
      width: 179,

      position: 'absolute',
      left: '1rem',
      top: '1rem',
    },

    tagline: {
      fontWeight: 700,
    },

    right: {
      position: 'relative',
      zIndex: 1,

      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',

      background: theme.palette.background.default,
    },

    rightInner: {
      position: 'relative',
      padding: theme.spacing(1),
      [maxWidth('md')]: {
        padding: theme.spacing(4, 1),
      },
    },

    map: {
      height: '80vh',
    },

    title: {
      textTransform: 'uppercase',
      marginTop: theme.spacing(4),
    },

    bluebleed: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  };
});

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
      <Box className={classes.top}>
        <StaticImage
          src="../remote-contents/media/home-banner.jpg"
          alt=""
          className={classes.bgImage}
          placeholder="blurred"
        />

        <Container>
          <Grid container justify="center">
            <Grid
              xs={12}
              md={8}
              item
              className={classes.left}
              container
            >
              <Grid item className={classes.pnpc}>
                <StaticImage
                  src="../remote-contents/media/pnpc-white.png"
                  alt="Parc National de Port-Cros"
                  placeholder="none"
                  objectFit="cover"
                  objectPosition="left top"
                />
              </Grid>

              <Grid item>
                <GatsbyLink to="/">
                  <Logo className={classes.logo} />
                </GatsbyLink>

                <br /><br />

                <Typography variant="h2" className={classes.tagline}>
                  Gérons aujourd'hui,<br />
                  nos espaces de plongées<br />
                  de demain.
                </Typography>
              </Grid>
            </Grid>

            <Grid xs={12} md={4} item container className={classes.right}>
              <Grid item className={classes.rightInner}>
                <Button to="reglement" variant="contained" color="secondary" component={Link}>
                  Signer le règlement de plongée
                </Button>

                <br /><br /><br /><br />

                <Button to="declaration" variant="contained" color="primary" component={Link}>
                  Déclarer une plongée
                </Button>

                <br /><br />

                <Typography variant="body2">
                  <Link to="historique">Obtenir le bilan des déclarations</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Nos espaces de plongées
        </Typography>
      </Container>

      <Grid container className={classes.map}>
        <Map />
      </Grid>

      <Box className={clsx(classes.counts, classes.bluebleed)}>
        <Container>
          counts
        </Container>
      </Box>

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Informations
        </Typography>

        <HomeInformations />
      </Container>

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Météo
        </Typography>
      </Container>

      <Box className={clsx(classes.meteo, classes.bluebleed)}>
        <Container>
          Météo
        </Container>
      </Box>

      <Container>
        <Typography variant="h2" className={classes.title} color="primary">
          Nos partenaires
        </Typography>

        Partenaires
      </Container>
    </Layout>
  );
};

export default HomePage;
