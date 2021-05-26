import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from './Button';
import Link from './Link';

const useStyles = makeStyles(theme => ({
  separator: {
    margin: theme.spacing(10, 3),
    height: 2,
    background: theme.palette.primary.light,

    [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
      margin: theme.spacing(4, 6),
    },
  },

  history: {
    marginTop: theme.spacing(2),
    fontSize: '0.8rem',
    '& a': {
      color: theme.palette.grey[500],
    },
  },
}));

const HomeButton = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        to="inscription"
        variant="contained"
        color="primary"
        component={Link}
      >
        S'inscrire à CaPeL
      </Button>

      <Box className={classes.separator} />

      <Button
        to="reglement"
        variant="contained"
        color="secondary"
        component={Link}
      >
        Signer le règlement de plongée
      </Button>

      <Box className={classes.separator} />

      <Button
        to="declaration"
        variant="contained"
        color="primary"
        component={Link}
      >
        Déclarer une plongée
      </Button>

      <Typography variant="body2" className={classes.history}>
        <Link to="historique">Obtenir le bilan des déclarations</Link>
      </Typography>
    </>
  );
};

export default HomeButton;
