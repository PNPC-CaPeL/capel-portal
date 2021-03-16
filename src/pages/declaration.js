import React from 'react';

import Layout from '../components/Layout';
import Declaration from '../components/Declaration';

const headerProps = { color: 'secondary' };

const DeclarationPage = () => (
  <Layout title="Déclarer une plongée" headerProps={headerProps} footer={false}>
    <Declaration />
  </Layout>
);

export default DeclarationPage;
