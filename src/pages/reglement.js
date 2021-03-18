import React from 'react';

import Layout from '../components/Layout';

import Regulation from '../components/Regulation';

const ReglementPage = () => (
  <Layout title="Signer le réglement" footer={false}>
    <Regulation />
  </Layout>
);

export default ReglementPage;
