import React from 'react';

// import { StaticImage } from 'gatsby-plugin-image';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MarkdownText from './MarkdownText';
import { useHomepageBlocks } from '../hooks/useHomepageBlocks';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  title: {
    textTransform: 'uppercase',
  },
}));

const HomeInstit = () => {
  const classes = useStyles();
  const blocks = useHomepageBlocks();

  return (
    <Grid container className={classes.root} spacing={4}>
      {blocks.map(({ title, htmlAst }) => (
        <Grid item xs={12} md={4} key={title}>
          <Typography variant="h4" color="primary" className={classes.title} paragraph>
            {title}
          </Typography>

          <MarkdownText hast={htmlAst} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeInstit;
