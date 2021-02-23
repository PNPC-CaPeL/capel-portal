import React from 'react';

import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const headerProps = { color: 'secondary' };

const DeclarationPage = () => (
  <Layout title="Déclarer une plongée" headerProps={headerProps} footer={false}>
    <Grid container justify="space-around">
      <Grid item sm={4}>
        <TripettoForm
          form="declaration"
          endpoint={process.env.GATSBY_ENDPOINT_DECLARATION}
        />
      </Grid>
    </Grid>
  </Layout>
);

export default DeclarationPage;
