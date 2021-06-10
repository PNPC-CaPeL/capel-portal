import React from 'react';
import clsx from 'clsx';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-material-ui-components';

import HtmlAstRender from './HtmlAstRender';
import { useHomepageBlocks } from '../hooks/useHomepageBlocks';
import { md2hast } from '../lib/md2hast';

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

const HomeInstit = ({ className, ...props }) => {
  const classes = useStyles();
  const blocks = useHomepageBlocks();

  return (
    <Grid container className={clsx(className, classes.root)} spacing={4} {...props}>
      {blocks.map(({ title, featureImage, autoExcerpt, customExcerpt, slug }) => {
        const excerptHast = md2hast(customExcerpt || autoExcerpt);

        return (
          <Grid item xs={12} md={4} key={title}>
            <Link to={`/${slug}`}>
              {(featureImage
                ? <GatsbyImage image={getImage(featureImage)} alt="" />
                : <Box className={classes.placeholder} />
              )}
            </Link>

            <Typography variant="h4" color="primary" className={classes.title} paragraph>
              <Link to={`/${slug}`}>
                {title}
              </Link>
            </Typography>

            <HtmlAstRender hast={excerptHast} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HomeInstit;
