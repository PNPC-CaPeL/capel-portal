import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Link from '../components/Link';

import Logo from '../assets/logo.svg';
import Angle from '../assets/angle.svg';

const customBlue = '#39bff0';

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(90deg, ${customBlue} 75%, #ffffff 75%)`,
  },
  main: {
    height: '100vh',
    margin: '0 auto',

    display: 'flex',
    alignItems: 'stretch',
  },
  left: {
    textAlign: 'center',
    background: customBlue,
    color: 'white',
    '& a': {
      color: 'inherit',
    },
    alignSelf: 'center',
  },
  angleWrapper: {
    background: customBlue,
    position: 'relative',
    color: 'white',
  },
  angle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  right: {
    background: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
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
        <Grid xs={12} md={7} item className={classes.left}>
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
        <Grid item only="md" md={1} className={classes.angleWrapper}>
          <Angle preserveAspectRatio="none" className={classes.angle} />
        </Grid>

        <Grid xs={12} md={4} item container className={classes.right}>
          <Grid item>
            <Button to="reglement" variant="outlined" color="primary" component={Link}>
              Signer le règlement de plongée
            </Button>

            <br />
            <br />
            <br />
            <br />

            <Button to="declaration" variant="outlined" color="secondary" component={Link}>
              Déclarer une plongée
            </Button>

            <br />

            <Link to="historique">Obtenir le bilan des déclarations</Link>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
