import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';

import HtmlAstRender from '../HtmlAstRender';
import Layout from '../Layout';

const GhostPost = ({ data }) => {
  const post = data.ghostPost;

  return (
    <Layout>
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>

      {post.featureImage && <GatsbyImage alt="" image={getImage(post.featureImage)} />}

      <Typography variant="h1">
        {post.title}
      </Typography>

      <HtmlAstRender hast={post.childHtmlRehype.htmlAst} />
    </Layout>
  );
};

export default GhostPost;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
