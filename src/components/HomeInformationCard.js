import React from 'react';
import clsx from 'clsx';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MarkdownText from './MarkdownText';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const HomeInformationCard = ({ className, title, hast, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...props}>
      <Typography variant="h4">
        {title}
      </Typography>

      <MarkdownText hast={hast} />
    </Box>
  );
};

export default HomeInformationCard;
