import React from 'react';
import clsx from 'clsx';

import HomeInformations from '../HomeInformations';

import useBlockStyles from '../../hooks/useBlockStyles';

const CustomNews = () => {
  const classes = useBlockStyles();

  return (
    <HomeInformations
      className={clsx(
        classes.spacings,
      )}
    />
  );
};

export default CustomNews;
