import React from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';

import Observation from '../assets/observation.svg';
import Cetaces from '../assets/cetaces.svg';
import Meduses from '../assets/meduses.svg';
import Fishwatch from '../assets/fishwatch.svg';
import Polution from '../assets/polution.svg';
import Enginsdepeche from '../assets/enginsdepeche.svg';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  item: {
    width: 150,
    textAlign: 'center',
    fontWeight: 600,
    '& a': {
      color: 'inherit',
    },
  },
}));

const Observations = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      wrap="wrap"
      justify="space-between"
      spacing={1}
      className={clsx(className, classes.root)}
      {...props}
    >
      <Grid item className={classes.item}>
        <Link to="http://bioobs.fr">
          <Observation /><br />
          Observations naturalistes ffessm
        </Link>
      </Grid>
      <Grid item className={classes.item}>
        <Link to="http://www.obsenmer.org">
          <Cetaces /><br />
          Cétacés, tortues, requins et raies
        </Link>
      </Grid>
      <Grid item className={classes.item}>
        <Link to="http://meduse.acri.fr/home/home.php">
          <Meduses /><br />
          Méduses
        </Link>
      </Grid>
      <Grid item className={classes.item}>
        <Link to="http://biologie.ffessm.fr/index.php/bioobs">
          <Fishwatch /><br />
          Fish Watch
        </Link>
      </Grid>
      <Grid item className={classes.item}>
        <Link to="http://www.dirm.mediterranee.developpement-durable.gouv.fr/cross-med-r43.html">
          <Polution /><br />
          Pollution
        </Link>
      </Grid>
      <Grid item className={classes.item}>
        <Link to="https://www.mio.univ-amu.fr/ghostmed/fr/">
          <Enginsdepeche /><br />
          Engins de pêche perdus
        </Link>
      </Grid>
    </Grid>
  );
};

export default Observations;
