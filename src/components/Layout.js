import React from 'react';
import clsx from 'clsx';
import Helmet from 'react-helmet';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';

import useGhostSettings from '../hooks/useGhostSettings';

import favicon from '../assets/icon.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  main: {
    marginBottom: 'auto',
  },
});

const Layout = ({
  className,
  rootClass,
  title,
  header = true,
  headerProps = {},
  footer = true,
  container = true,
  ...rest
}) => {
  const classes = useStyles();
  const { title: ghostTitle, lang } = useGhostSettings();
  const ContainerComponent = container ? Container : Box;

  return (
    <div className={clsx(classes.root, rootClass)}>
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={`%s | ${ghostTitle}`}
        defaultTitle={ghostTitle}
      >
        <link rel="icon" href={favicon} />
      </Helmet>

      {Boolean(header) && <Header {...headerProps} />}

      <ContainerComponent
        component="main"
        className={clsx(classes.main, className)}
        {...rest}
      />

      {Boolean(footer) && <Footer />}
    </div>
  );
};

export default Layout;
