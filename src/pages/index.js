import React from 'react';
import clsx from 'clsx';

import { Link as GatsbyLink } from 'gatsby';
import { Box, Grid, Typography, Container } from '@material-ui/core';
import { Button } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Link from '../components/Link';
import Map from '../components/Map';

import Logo from '../assets/logo.svg';

const customBlue = '#39bff0';

const customBackground = {
  backgroundColor: customBlue,
  backgroundImage: 'url(https://i.picsum.photos/id/147/1024/768.jpg?grayscale&hmac=Z1Tb44cckOpbVkkaq3sC5YuV9EzTUqjXEoA7_LiRCEc)',
  backgroundBlendMode: 'overlay',
  backgroundPosition: 'left center',
  backgroundSize: 'cover',
};

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
        [minWidth('md')]: {
          ...customBackground,
        },
      },
      [maxWidth('md')]: {
        ...customBackground,
        paddingBottom: theme.spacing(3),
      },
      [maxWidth('sm')]: {
        paddingBottom: theme.spacing(2),
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
        <Container>
          <Grid container justify="center">
            <Grid xs={12} md={8} item className={classes.left} container>
              <Grid item>
                <GatsbyLink to="/">
                  <Logo className={classes.logo} />
                </GatsbyLink>

                <br /><br />

                <Typography variant="h2">
                  Gérons aujourd'hui,<br />
                  nos espaces de plongées<br />
                  de demain.
                </Typography>
              </Grid>
            </Grid>

            <Grid xs={12} md={4} item container className={classes.right}>
              <Grid item className={classes.rightInner}>
                <Button to="reglement" variant="contained" color="primary" component={Link}>
                  Signer le règlement de plongée
                </Button>

                <br /><br /><br /><br />

                <Button to="declaration" variant="contained" color="secondary" component={Link}>
                  Déclarer une plongée
                </Button>

                <br /><br />

                <Link to="historique">Obtenir le bilan des déclarations</Link>
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

        Informations
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
