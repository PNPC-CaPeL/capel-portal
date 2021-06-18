import React from 'react';
import clsx from 'clsx';

import { Link } from 'gatsby';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useGhostNavigation from '../hooks/useGhostNavigation';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#d3eff6', // white + primary
  },

  item: {
    textDecoration: 'none',
    color: 'inherit',
    transition: theme.transitions.create('color'),
    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
    textShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
  },
}));

const MainNav = ({ className, ...props }) => {
  const { primary: navigation } = useGhostNavigation();
  const classes = useStyles();

  return (
    <Grid
      container
      className={clsx(className, classes.root)}
      spacing={3}
      justify="flex-end"
      {...props}
    >
      {navigation.map(({ label, url }) => (
        <Grid key={label} item>
          <Link to={url} className={classes.item}>
            {label}
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(MainNav);
