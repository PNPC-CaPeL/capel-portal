import React from 'react';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const HistoriquePage = () => (
  <Layout title="Obtenir votre historique de déclarations">
    <TripettoForm token={process.env.GATSBY_TRIPETTO_HISTORY} />
  </Layout>
);

export default HistoriquePage;
