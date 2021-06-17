import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';

import HomeHero from '../components/HomeHero';
import HtmlAstRender from '../components/HtmlAstRender';

import customBlocks from '../components/GhostBlocks';

const useStyles = makeStyles(theme => ({
  root: {},

  main: {
    paddingBottom: theme.spacing(10),
  },

  title: {
    marginTop: theme.spacing(4),
    textTransform: 'uppercase',
  },

  content: {
    marginTop: theme.spacing(3),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const {
    page: {
      childHtmlRehype: { htmlAst } = {},
    } = {},
  } = useStaticQuery(graphql`
    {
      page: ghostPage(slug: {eq: "frontpage"}) {
        childHtmlRehype {
          htmlAst
        }
      }
    }
  `);

  return (
    <Layout
      header={false}
      // footer={false}
      container={false}
      className={classes.main}
      rootClass={classes.root}
    >
      <HomeHero />

      <HtmlAstRender
        component={Container}
        hast={htmlAst}
        className={classes.content}
        components={{
          h2: props => (
            <Typography
              variant="h2"
              className={classes.title}
              color="primary"
              {...props}
            />
          ),
          ...customBlocks,
        }}
      />
    </Layout>
  );
};

export default HomePage;
