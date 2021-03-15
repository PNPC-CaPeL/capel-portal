import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import TripettoForm from '../components/TripettoForm';
import MarkdownText from '../components/MarkdownText';

import useSkills from '../hooks/useSkills';
import findObject from '../lib/find-object';

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

  const enhanceDefinition = def => {
    const skillsNode = findObject(def, 'name', 'Niveau');
    skillsNode.forEach(node => {
      // eslint-disable-next-line no-param-reassign
      node.block.buttons = skills.map(({ title }, index) => ({ name: title, id: index + 1 }));
    });

    return def;
  };

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
            enhanceDefinition={enhanceDefinition}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ReglementPage;
