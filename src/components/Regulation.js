import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const Regulation = props => {
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
  );
};

export default Regulation;
