import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import instagram from '../assets/instagram.svg';
import youtube from '../assets/youtube.svg';
import pinterest from '../assets/pinterest.svg';

const picto = {
  facebook,
  twitter,
  instagram,
  youtube,
  pinterest,
};

const links = {
  facebook: { href: 'https://www.facebook.com/PNPC83' },
  twitter: { href: 'https://twitter.com/PNPC83' },
  instagram: { href: 'https://www.instagram.com/parcnationaldeportcros' },
  youtube: { href: 'https://www.youtube.com/user/PNPC83' },
  pinterest: { href: 'https://www.pinterest.fr/pnpc83/' },
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
