import React from 'react';

// import { StaticImage } from 'gatsby-plugin-image';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import MarkdownText from './MarkdownText';
import { useHomepageBlocks } from '../hooks/useHomepageBlocks';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  placeholder: {
    height: 0,
    paddingBottom: 'calc(100% * 3 / 4)',
    background: theme.palette.grey[200],
  },
  title: {
    textTransform: 'uppercase',
    marginTop: theme.spacing(2),
  },
}));

const HomeInstit = () => {
  const classes = useStyles();
  const blocks = useHomepageBlocks();

  return (
    <Grid container className={classes.root} spacing={4}>
      {blocks.map(({ title, htmlAst, pictureFile }) => (
        <Grid item xs={12} md={4} key={title}>
          {(pictureFile
            ? <GatsbyImage image={getImage(pictureFile)} alt="" />
            : <Box className={classes.placeholder} />
          )}

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
