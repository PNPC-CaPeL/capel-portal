import React from 'react';
import clsx from 'clsx';
import Helmet from 'react-helmet';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';

import { useSiteMetadata } from '../hooks/useSiteMetadata';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: '2rem',
    marginBottom: 'auto',
  },
});

const Layout = ({
  className,
  title: pageTitle,
  header = true,
  footer = true,
  ...rest
}) => {
  const classes = useStyles();
  const { title } = useSiteMetadata();

  return (
    <div className={classes.root}>
      <Helmet
        htmlAttributes={{ lang: 'fr' }}
        title={pageTitle}
        titleTemplate={`%s | ${title}`}
        defaultTitle={title}
      />
      {Boolean(header) && <Header />}

      <Container
        component="main"
        className={clsx(classes.main, className)}
        {...rest}
      />

      {Boolean(footer) && <Footer />}
    </div>
  );
};

export default Layout;
