import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';

import HtmlAstRender from '../HtmlAstRender';
import Layout from '../Layout';

const GhostPage = ({ data }) => {
  const page = data.ghostPage;

  return (
    <Layout>
      <Helmet>
        <style type="text/css">{`${page.codeinjection_styles}`}</style>
      </Helmet>

      <GatsbyImage image={getImage(page.featureImage)} />

      <Typography variant="h1">
        {page.title}
      </Typography>

      <HtmlAstRender hast={page.childHtmlRehype.htmlAst} />
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
