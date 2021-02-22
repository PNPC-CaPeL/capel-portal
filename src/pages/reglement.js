import React from 'react';

import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';

const ReglementPage = () => (
  <Layout>
    <Grid container>
      <Grid item xs>
        le règlement
      </Grid>
      <Grid item xs>
        le formulaire
      </Grid>
    </Grid>
  </Layout>
);

export default ReglementPage;
