import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import instagram from '../assets/instagram.svg';
import youtube from '../assets/youtube.svg';
import pinterest from '../assets/pinterest.svg';

import { useLckSettings } from '../hooks/useLckSettings';

const picto = {
  facebook,
  twitter,
  instagram,
  youtube,
  pinterest,
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
  const { 1: settings } = useLckSettings();

  const links = {
    facebook: { href: settings?.LINK_FACEBOOK?.text_value },
    twitter: { href: settings?.LINK_TWITTER?.text_value },
    instagram: { href: settings?.LINK_INSTAGRAM?.text_value },
    youtube: { href: settings?.LINK_YOUTUBE?.text_value },
    pinterest: { href: settings?.LINK_PINTEREST?.text_value },
    default: { href: 'https://perdu.com' },
  };

  if (!Object.keys(links).includes(type)) {
    // eslint-disable-next-line no-param-reassign
    type = 'default';
  }

  if (!links[type].href) {
    return null;
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
