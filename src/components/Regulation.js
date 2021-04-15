import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useScrollInfo from 'react-element-scroll-hook';

import TripettoForm from './TripettoForm';
import MarkdownText from './MarkdownText';

import useSkills from '../hooks/useSkills';
import { withSkills } from '../lib/definition-enhancers';
import Link from './Link';

const useStyles = makeStyles({
  wrapper: {
    height: 600,
    overflow: 'auto',
  },
});

const Regulation = () => {
  const [scrollInfo, setRef] = useScrollInfo();

  const classes = useStyles();
  const skills = useSkills();

  const [complete, setComplete] = React.useState(false);
  const [hasRead, setHasRead] = React.useState(false);

  React.useEffect(() => {
    if (scrollInfo.y.percentage >= 0.95) {
      if (!hasRead) {
        setHasRead(true);
      }
    }
  }, [scrollInfo.y.percentage, hasRead]);

  const { markdownRemark: { htmlAst } } = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: {text_id: {eq: "regulation"}}) {
        htmlAst
      }
    }
  `);

  return (
    <Grid container justify="space-around">
      {Boolean(complete) && (
        <Grid item md={4}>
          <Typography variant="h1" paragraph>
            Merci de votre engagement,
          </Typography>

          <Typography variant="body1" paragraph>
            vous allez recevoir un mail attestant de votre signature du règlement qui vaut
            autorisation pour plonger dans les eaux des cœurs marin du Parc national de Port-Cros.
          </Typography>

          <Typography variant="body1" paragraph>
            Notez que vous devez être en mesure
            de <strong>présenter votre autorisation nominative</strong> en cas de
            contrôle par les agents du Parc national ou les Autorités de l’État en mer.
          </Typography>

          <Typography variant="body1" paragraph>
            Vous pouvez procéder à
            une <Link onClick={() => setComplete(false)} to=".">nouvelle signature</Link> ou
            bien retourner sur la <Link to="/">page d'accueil</Link>.
          </Typography>
        </Grid>
      )}

      {!complete && (
        <>
          <Grid item md={7} className={classes.wrapper} ref={setRef}>
            <MarkdownText hast={htmlAst} />
          </Grid>

          <Grid item md={4}>
            {!hasRead && (
              <Typography variant="body1" paragraph>
                Merci de lire l'ensemble du règlement avant de le signer.
              </Typography>
            )}

            {hasRead && (
              <TripettoForm
                disabled
                form="regulation"
                endpoint={process.env.GATSBY_ENDPOINT_REGULATION}
                enhanceDefinition={withSkills(skills)}
                onComplete={() => setComplete(true)}
              />
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Regulation;
