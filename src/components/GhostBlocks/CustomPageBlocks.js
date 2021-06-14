import React from 'react';
import clsx from 'clsx';

import HomeInstit from '../HomeInstit';

import useBlockStyles from '../../hooks/useBlockStyles';

const CustomPageBlocks = () => {
  const classes = useBlockStyles();

  return (
    <HomeInstit
      className={clsx(
        classes.spacings,
      )}
    />
  );
};

export default CustomPageBlocks;
