import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';
import MarkdownText from '../components/MarkdownText';

import useSkills from '../hooks/useSkills';
import { withSkills } from '../lib/definition-enhancers';

const useStyles = makeStyles({
  wrapper: {
    height: 600,
    overflow: 'auto',
  },
});

const ReglementPage = () => {
  const classes = useStyles();
  const skills = useSkills();

  const { markdownRemark: { htmlAst } } = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: {text_id: {eq: "regulation"}}) {
        htmlAst
      }
    }
  `);

  return (
    <Layout title="Signer le réglement" footer={false}>
      <Grid container justify="space-between">
        <Grid item md={7} className={classes.wrapper}>
          <MarkdownText hast={htmlAst} />
        </Grid>

        <Grid item md={4}>
          <TripettoForm
            form="regulation"
            endpoint={process.env.GATSBY_ENDPOINT_REGULATION}
            enhanceDefinition={withSkills(skills)}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ReglementPage;
