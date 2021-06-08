import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from './Button';
import Link from './Link';

const useStyles = makeStyles(theme => ({
  separator: {
    margin: theme.spacing(5, 3),
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
        to={process.env.GATSBY_LCK_HOME}
        variant="contained"
        color="secondary"
        component={Link}
      >
        Se connecter
      </Button>
    </>
  );
};

export default React.memo(HomeButton);
