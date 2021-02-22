import React from 'react';

import { Button } from '@material-ui/core';

import Layout from '../components/Layout';
import Link from '../components/Link';

const HomePage = () => (
  <Layout header={false} footer={false}>
    <Button to="reglement" variant="outlined" color="primary" component={Link}>
      Signer le règlement de plongée
    </Button>
    <br />
    <br />
    <br />

    <Button to="declaration" variant="outlined" color="secondary" component={Link}>
      Déclarer une plongée
    </Button>
    <br />

    <Link to="historique">Obtenir le bilan des déclarations</Link>
  </Layout>
);

export default HomePage;
