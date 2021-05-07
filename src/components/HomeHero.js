import React from 'react';

import { Link as GatsbyLink } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';

import HomeButton from './HomeButtons';
import Logo from '../assets/logo.svg';

const useStyles = makeStyles(theme => {
  const maxWidth = mq => `@media (max-width: ${theme.breakpoints.values[mq]}px)`;
  const minWidth = mq => `@media (min-width: ${theme.breakpoints.values[mq]}px)`;

  return ({
    top: {
      position: 'relative',

      [maxWidth('md')]: { paddingBottom: theme.spacing(3) },
      [maxWidth('sm')]: { paddingBottom: theme.spacing(2) },
    },

    bgImage: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: '30%',
      [maxWidth('md')]: { right: 0 },
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
      fontWeight: 600,
      fontSize: '2.4rem',
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
      [maxWidth('md')]: { padding: theme.spacing(4, 1) },
    },
  });
});

const HomeHero = () => {
  const classes = useStyles();

  return (
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
              <Link to="http://www.portcros-parcnational.fr/fr">
                <StaticImage
                  src="../remote-contents/media/pnpc-white.png"
                  alt="Parc National de Port-Cros"
                  placeholder="none"
                  objectFit="cover"
                  objectPosition="left top"
                />
              </Link>
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
              <HomeButton />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeHero;
