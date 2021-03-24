import React from 'react';
import clsx from 'clsx';

import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
}));

const Footer = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Box component="footer" className={clsx(classes.footer, className)}>
      <Container {...props}>
        footer content
      </Container>
    </Box>
  );
};

export default Footer;
