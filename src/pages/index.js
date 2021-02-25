import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Link from '../components/Link';

import Logo from '../assets/logo.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    textAlign: 'center',
  },
  main: {
    height: '100vh',
    margin: '0 auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    display: 'flex',
    alignItems: 'center',
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout header={false} footer={false} className={classes.main}>
      <Grid container alignItems="stretch" style={{ minHeight: '50vh' }}>
        <Grid md={7} item style={{ alignSelf: 'center' }}>
          <GatsbyLink to="/">
            <Logo />
          </GatsbyLink>
          <Typography variant="h2">
            Gérons aujourd'hui, nos espaces de plongées de demain.
          </Typography>
        </Grid>
        <Grid md={5} item container direction="column" justify="space-evenly" alignItems="center">
          <Grid item>
            <Button to="reglement" variant="outlined" color="primary" component={Link}>
              Signer le règlement de plongée
            </Button>
          </Grid>

          <Grid item>
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
