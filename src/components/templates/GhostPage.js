import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HtmlAstRender from '../HtmlAstRender';
import Layout from '../Layout';

const useStyles = makeStyles({
  noFI: {
    marginTop: 0,
  },
});

const GhostPage = ({
  data: {
    wrapper: {
      codeinjection_styles: customCss,
      bigFeatureImage: featureImage,
      title,
      childHtmlRehype,
    },
  },
}) => {
  const classes = useStyles();

  return (
    <Layout
      title={title}
      headerProps={{ title: null }}
      className={featureImage && classes.noFI}
    >
      <Helmet>
        <style type="text/css">{`${customCss}`}</style>
      </Helmet>

      {featureImage && (
        <GatsbyImage
          alt=""
          image={getImage(featureImage)}
          objectFit="cover"
          style={{
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
            width: '100vw',
          }}
        />
      )}

      <Typography variant="h1">
        {title}
      </Typography>

      <HtmlAstRender hast={childHtmlRehype.htmlAst} />
    </Layout>
  );
};

export default GhostPage;

export const pageQuery = graphql`
  query($slug: String!) {
    wrapper: ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
      bigFeatureImage: featureImage { childImageSharp { gatsbyImageData(
        aspectRatio: 3,
        placeholder: BLURRED
        width: 1240,
      ) } }
    }
  }
`;
