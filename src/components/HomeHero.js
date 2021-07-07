import React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';

import HomeButton from './HomeButtons';
import Logo from '../assets/logo.svg';
import MainNav from './MainNav';

const useStyles = makeStyles(theme => {
  const maxWidth = mq => `@media (max-width: ${theme.breakpoints.values[mq]}px)`;
  const minWidth = mq => `@media (min-width: ${theme.breakpoints.values[mq]}px)`;

  return ({
    root: {
      position: 'relative',
      paddingTop: theme.spacing(2),

      [maxWidth('md')]: { paddingBottom: theme.spacing(3) },
      [maxWidth('sm')]: { paddingBottom: theme.spacing(2) },
    },

    bgImage: {
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    inner: {
      position: 'relative',
    },

    bottom: {
      marginTop: theme.spacing(2),
      [minWidth('md')]: {
        height: 'calc(70vh - 8em)',
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

      color: theme.palette.primary.contrastText,
    },

    logo: {
      maxWidth: '100%',
      height: 'auto',
      width: 500,
    },

    tagline: {
      fontWeight: 600,
      fontSize: '2.4rem',
    },

    right: {
      position: 'relative',
      zIndex: 1,

      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',

      [maxWidth('md')]: {
        marginTop: theme.spacing(10),
      },
    },

    rightInner: {
      position: 'relative',
      padding: theme.spacing(8, 1),
      [maxWidth('md')]: { padding: theme.spacing(4, 1) },

      background: fade(theme.palette.background.default, 0.60),
      borderRadius: theme.shape.borderRadius,
    },
  });
});

const HomeHero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <StaticImage
        src="../assets/home-banner.jpg"
        alt=""
        className={classes.bgImage}
        placeholder="blurred"
      />

      <Container className={classes.inner}>
        <Grid container spacing={3} justify="space-between" alignItems="center">
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            container
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={4}>
              <Link to="http://www.portcros-parcnational.fr/fr">
                <StaticImage
                  src="../assets/pnpc-white.png"
                  alt="Parc National de Port-Cros"
                  placeholder="none"
                  objectFit="scale-down"
                  objectPosition="center"
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to="https://www.life-marha.fr">
                <StaticImage
                  src="../assets/marha.png"
                  alt="Marine habitats"
                  placeholder="none"
                  objectFit="scale-down"
                  objectPosition="center"
                />
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="https://www.life-marha.fr">
                <StaticImage
                  src="../assets/life.jpg"
                  alt="Projet Life"
                  placeholder="none"
                  objectFit="scale-down"
                  objectPosition="center"
                />
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="https://www.natura2000.fr">
                <StaticImage
                  src="../assets/natura2000.png"
                  alt="Natura 2000"
                  placeholder="none"
                  objectFit="scale-down"
                  objectPosition="center"
                />
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <MainNav />
          </Grid>
        </Grid>

        <Grid container justify="center" className={classes.bottom}>
          <Grid
            item
            xs={12}
            md={8}
            className={classes.left}
            container
          >
            <Grid item>
              <Logo className={classes.logo} />
              <br /><br />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.right}
            container
          >
            <Grid item className={classes.rightInner}>
              <HomeButton />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeHero;
