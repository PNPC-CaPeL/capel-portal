import React from 'react';
import clsx from 'clsx';

import { Box, Container } from '@material-ui/core';

import HomeStats from '../HomeStats';

import useBlockStyles from '../../hooks/useBlockStyles';

const CustomStats = () => {
  const classes = useBlockStyles();

  return (
    <Box
      className={clsx(
        classes.spacings,
        classes.blueback,
        classes.fullbleed,
      )}
    >
      <Container>
        <HomeStats />
      </Container>
    </Box>
  );
};

export default CustomStats;
