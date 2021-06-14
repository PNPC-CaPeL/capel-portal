import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HtmlAstRender from '../HtmlAstRender';
import Layout from '../Layout';

import customBlocks from '../GhostBlocks';

const useStyles = makeStyles(theme => ({
  withFI: {
    marginTop: 0,
  },

  featureImage: {
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    width: '100vw',
  },

  mainTitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
}));

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
      className={featureImage && classes.withFI}
    >
      <Helmet>
        <style type="text/css">{`${customCss}`}</style>
      </Helmet>

      {featureImage && (
        <GatsbyImage
          alt=""
          image={getImage(featureImage)}
          objectFit="cover"
          className={classes.featureImage}
        />
      )}

      <Typography
        variant="h1"
        className={classes.mainTitle}
      >
        {title}
      </Typography>

      <HtmlAstRender
        hast={childHtmlRehype.htmlAst}
        components={customBlocks}
      />
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
