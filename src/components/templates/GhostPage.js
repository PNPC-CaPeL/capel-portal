import React from 'react';
import { graphql } from 'gatsby';

import { Helmet } from 'react-helmet';
import { Box, Typography } from '@material-ui/core';

import Layout from '../Layout';

const GhostPage = ({ data }) => {
  const page = data.ghostPage;

  return (
    <Layout>
      <Helmet>
        <style type="text/css">{`${page.codeinjection_styles}`}</style>
      </Helmet>

      <Typography variant="h1">
        {page.title}
      </Typography>

      <Box
        component="section"
        className="content-body"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </Layout>
  );
};

export default GhostPage;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
