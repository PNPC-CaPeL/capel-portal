import React from 'react';
import clsx from 'clsx';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const links = {
  facebook: { href: 'https://perdu.com' },
  twitter: { href: 'https://perdu.com' },
  default: { href: 'https://perdu.com' },
};

const useStyles = makeStyles(theme => ({
  link: {
    display: 'inline-block',
    textDecoration: 'none',
  },

  circle: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    borderRadius: '100%',
    width: 70,
    height: 70,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const SNButton = ({ type = 'default', className, ...props }) => {
  const classes = useStyles();

  if (!Object.keys(links).includes(type)) {
    // eslint-disable-next-line no-param-reassign
    type = 'default';
  }

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={classes.link}
      {...links[type]}
    >
      <Box className={clsx(classes.circle, className)} {...props}>
        sn
      </Box>
    </a>
  );
};

export default SNButton;
