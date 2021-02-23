import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';
import MDBlock from '../components/MDBlock';

const useStyles = makeStyles({
  wrapper: {
    height: 600,
    overflow: 'auto',
  },
});

const ReglementPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Signer le réglement" footer={false}>
      <Grid container justify="space-between">
        <Grid item md={7} className={classes.wrapper}>
          <MDBlock block="regulation" />
        </Grid>

        <Grid item md={4}>
          <TripettoForm
            form="regulation"
            endpoint={process.env.GATSBY_ENDPOINT_REGULATION}
            className={classes.stick}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ReglementPage;
