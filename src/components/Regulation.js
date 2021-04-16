import React from 'react';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Grid, Typography } from '@material-ui/core';
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
  regH1: {
    fontSize: '2rem',
  },
  shouldRead: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const Regulation = () => {
  const [scrollInfo, setRef] = useScrollInfo();

  const classes = useStyles();
  const skills = useSkills();

  const [complete, setComplete] = React.useState(false);
  const [hasRead, setHasRead] = React.useState(false);

  const reset = () => {
    setComplete(false);
    setHasRead(false);
  };

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

  const customComponent = {
    h2: ({ className, ...props }) => (
      <Typography
        variant="h2"
        className={clsx(className, classes.regH1)}
        paragraph
        {...props}
      />
    ),
    p: props => <Typography variant="body2" paragraph {...props} />,
  };

  return (
    <Grid container justify={complete ? 'space-around' : 'space-between'}>
      {Boolean(complete) && (
        <Grid item md={5}>
          <Typography variant="h3" paragraph>
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
            une <Link onClick={reset} to=".">nouvelle signature</Link> ou
            bien retourner sur la <Link to="/">page d'accueil</Link>.
          </Typography>
        </Grid>
      )}

      {!complete && (
        <>
          <Grid item md={7} className={classes.wrapper} ref={setRef}>
            <MarkdownText hast={htmlAst} components={customComponent} body="body2" />
          </Grid>

          <Grid item md={4} container>
            {!hasRead && (
              <Box className={classes.shouldRead}>
                <Typography variant="body1" paragraph>
                  Merci de lire<br />
                  l'ensemble du règlement avant de le signer.
                </Typography>
              </Box>
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
