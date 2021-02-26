import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Link from '../components/Link';

import Logo from '../assets/logo.svg';

const customBlue = '#39bff0';
const customBackground = {
  backgroundColor: customBlue,
  backgroundImage: 'url(https://i.picsum.photos/id/147/1024/768.jpg?grayscale&hmac=Z1Tb44cckOpbVkkaq3sC5YuV9EzTUqjXEoA7_LiRCEc)',
  backgroundBlendMode: 'overlay',
  backgroundPosition: 'left center',
  backgroundSize: 'cover',
};

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'hidden',
    overflowY: 'auto',
    [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: customBackground,

  },
  main: {
    height: '100vh',
    margin: '0 auto',

    display: 'flex',
    alignItems: 'stretch',
  },

  left: {
    alignSelf: 'stretch',

    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    color: 'white',
    '& a': { color: 'inherit' },

    [`@media (max-width: ${theme.breakpoints.values.lg}px)`]: customBackground,
  },

  logo: {
    maxWidth: '100%',
  },

  right: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',

    [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        background: 'white',
        left: -40,
        width: '50vw',
        height: '100vh',
        transform: 'skew(-7deg)',
      },
    },
  },

  rightInner: {
    position: 'relative',
    padding: theme.spacing(1),
  },

  wrapper: {
    textAlign: 'center',
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout header={false} footer={false} className={classes.main} rootClass={classes.root}>
      <Grid container alignItems="stretch">
        <Grid xs={12} md={7} item className={classes.left} container>
          <Grid item>
            <GatsbyLink to="/">
              <Logo className={classes.logo} />
            </GatsbyLink>

            <br />
            <br />

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

            <br />
            <br />
            <br />
            <br />

            <Button to="declaration" variant="contained" color="secondary" component={Link}>
              Déclarer une plongée
            </Button>

            <br />
            <br />

            <Link to="historique">Obtenir le bilan des déclarations</Link>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
