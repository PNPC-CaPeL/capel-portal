import React from 'react';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const DeclarationPage = () => (
  <Layout title="Déclarer une plongée">
    <TripettoForm token={process.env.GATSBY_TRIPETTO_DECLARATION} />
  </Layout>
);

export default DeclarationPage;
