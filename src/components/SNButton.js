import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import instagram from '../assets/instagram.svg';
import youtube from '../assets/youtube.svg';

const picto = {
  facebook,
  twitter,
  instagram,
  youtube,
};

const links = {
  facebook: { href: 'https://perdu.com' },
  twitter: { href: 'https://perdu.com' },
  instagram: { href: 'https://perdu.com' },
  youtube: { href: 'https://perdu.com' },
  default: { href: 'https://perdu.com' },
};

const useStyles = makeStyles({
  link: {
    display: 'inline-block',
    textDecoration: 'none',
  },

  picto: {
    display: 'block',
    width: 70,
    height: 70,
  },
});

const SNButton = ({ type = 'default', ...props }) => {
  const classes = useStyles();

  if (!Object.keys(links).includes(type)) {
    // eslint-disable-next-line no-param-reassign
    type = 'default';
  }

  const Picto = picto[type];

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={classes.link}
      {...links[type]}
    >
      <Box {...props}>
        <Picto className={classes.picto} />
      </Box>
    </a>
  );
};

export default SNButton;
