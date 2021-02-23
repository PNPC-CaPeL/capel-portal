import React from 'react';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const HistoriquePage = () => (
  <Layout title="Obtenir votre historique de déclarations">
    <TripettoForm form="history" endpoint={process.env.GATSBY_ENDPOINT_HISTORY} />
  </Layout>
);

export default HistoriquePage;
