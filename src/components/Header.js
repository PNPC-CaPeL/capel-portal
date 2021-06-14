import React from 'react';
import clsx from 'clsx';

import { StaticImage } from 'gatsby-plugin-image';
import { AppBar, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';
import MainNav from './MainNav';
import Logo from '../assets/logo.svg';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  container: {
    position: 'relative',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  logo: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const Header = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      position="static"
      className={clsx(className, classes.appBar)}
      {...props}
    >
      <StaticImage
        src="../assets/home-banner.jpg"
        alt=""
        className={classes.bgImage}
        placeholder="blurred"
      />

      <Container className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={4} sm={3} md={2}>
            <Link to="/" color="inherit">
              <Logo className={classes.logo} />
            </Link>
          </Grid>

          <Grid item xs={8}>
            <MainNav />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
