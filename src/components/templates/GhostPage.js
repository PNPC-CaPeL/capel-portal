import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';

import HtmlAstRender from '../HtmlAstRender';
import Layout from '../Layout';

const GhostPage = ({
  data: {
    wrapper: {
      codeinjection_styles: customCss,
      featureImage,
      title,
      childHtmlRehype,
    },
  },
}) => (
  <Layout
    title={title}
    headerProps={{ title: null }}
  >
    <Helmet>
      <style type="text/css">{`${customCss}`}</style>
    </Helmet>

    {featureImage && (
      <GatsbyImage alt="" image={getImage(featureImage)} />
    )}

    <Typography variant="h1">
      {title}
    </Typography>

    <HtmlAstRender hast={childHtmlRehype.htmlAst} />
  </Layout>
);

export default GhostPage;

export const pageQuery = graphql`
  query($slug: String!) {
    wrapper: ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
