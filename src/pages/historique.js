import React from 'react';

import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const HistoriquePage = () => (
  <Layout title="Obtenir votre historique de déclarations" footer={false}>
    <Grid container justify="space-around">
      <Grid item md={4}>
        <TripettoForm
          form="history"
          endpoint={process.env.GATSBY_ENDPOINT_HISTORY}
        />
      </Grid>
    </Grid>
  </Layout>
);

export default HistoriquePage;
