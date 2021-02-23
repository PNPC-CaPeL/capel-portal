import React from 'react';

import { AppBar, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const Header = ({ title, ...props }) => {
  const classes = useStyles();

  return (
    <AppBar elevation={0} position="static" {...props}>
      <Container className={classes.container}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Link to="/" color="inherit">Capel</Link>
          </Grid>
          <Grid item>
            <Typography variant="h1">{title}</Typography>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
