import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import HtmlAstRender from './HtmlAstRender';
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
      {blocks.map(({ title, featureImage, childHtmlRehype: { htmlAst } = {} }) => (
        <Grid item xs={12} md={4} key={title}>
          {(featureImage
            ? <GatsbyImage image={getImage(featureImage)} alt="" />
            : <Box className={classes.placeholder} />
          )}

          <Typography variant="h4" color="primary" className={classes.title} paragraph>
            {title}
          </Typography>

          <HtmlAstRender hast={htmlAst} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeInstit;
