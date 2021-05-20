import React from 'react';
import { graphql } from 'gatsby';

import { Helmet } from 'react-helmet';
import { Box, Typography } from '@material-ui/core';

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

      <Box
        component="article"
        className="content-body"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

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
