import React from 'react';
import { Typography } from '@material-ui/core';

import Button from './Button';
import Link from './Link';

const HomeButton = () => (
  <>
    <Button
      to="reglement"
      variant="contained"
      color="secondary"
      component={Link}
    >
      Signer le règlement de plongée
    </Button>

    <br /><br /><br /><br />

    <Button
      to="declaration"
      variant="contained"
      color="primary"
      component={Link}
    >
      Déclarer une plongée
    </Button>

    <br /><br />

    <Typography variant="body2">
      <Link to="historique">Obtenir le bilan des déclarations</Link>
    </Typography>
  </>
);

export default HomeButton;
