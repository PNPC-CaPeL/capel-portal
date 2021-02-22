import React from 'react';

import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const ReglementPage = () => (
  <Layout title="Signer le réglement">
    <Grid container>
      <Grid item xs>
        le règlement
      </Grid>

      <Grid item xs>
        le formulaire

        <TripettoForm token={process.env.GATSBY_TRIPETTO_REGULATION} />
      </Grid>
    </Grid>
  </Layout>
);

export default ReglementPage;
