import React from 'react';
import clsx from 'clsx';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SNButton from './SNButton';

const useStyles = makeStyles(theme => ({
  social: {
    background: `linear-gradient(0deg, ${theme.palette.secondary.main} 50%, transparent 50%);`,
  },

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
    <>
      <Box className={classes.social}>
        <Container>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item><SNButton type="facebook" /></Grid>
            <Grid item><SNButton type="twitter" /></Grid>
            <Grid item><SNButton type="instagram" /></Grid>
            <Grid item><SNButton type="youtube" /></Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="footer" className={clsx(classes.footer, className)}>
        <Container {...props}>
          footer content
        </Container>
      </Box>
    </>
  );
};

export default Footer;
