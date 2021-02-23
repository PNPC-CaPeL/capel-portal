import React from 'react';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';

const DeclarationPage = () => (
  <Layout title="Déclarer une plongée">
    <TripettoForm form="declaration" endpoint={process.env.GATSBY_ENDPOINT_DECLARATION} />
  </Layout>
);

export default DeclarationPage;
