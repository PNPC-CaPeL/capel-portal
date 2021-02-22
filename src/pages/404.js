import React from 'react';

import { Card, CardActions, CardContent, Typography } from '@material-ui/core';

import Layout from '../components/Layout';
import Link from '../components/Link';

const NotFoundPage = () => (
  <Layout>
    <Card>
      <CardContent>
        <Typography variant="h1">Erreur 404</Typography>
        <Typography variant="subtitle1">La page que vous demandez n'existe pas.</Typography>
      </CardContent>
      <CardActions>
        <Link to="/">‹ Retour à l'accueil</Link>
      </CardActions>
    </Card>

  </Layout>
);

export default NotFoundPage;
