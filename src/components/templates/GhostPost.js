import React from 'react';
import { graphql } from 'gatsby';

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

      {post.feature_image && (
        <figure className="post-feature-image">
          <img src={post.feature_image} alt={post.title} />
        </figure>
      )}

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
