import React from 'react';
import clsx from 'clsx';

import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HtmlAstRender from './HtmlAstRender';
import SNButton from './SNButton';
import useFooterBlocks from '../hooks/useFooterBlocks';

const useStyles = makeStyles(theme => {
  const minWidth = mq => `@media (min-width: ${theme.breakpoints.values[mq]}px)`;

  return {
    social: {
      background: `linear-gradient(0deg, ${theme.palette.secondary.main} 50%, transparent 50%);`,
    },

    footer: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(4),

      '& a': {
        color: 'inherit',
      },
    },
    block: {
      [minWidth('md')]: {
        '&:nth-child(2)': { textAlign: 'center' },
        '&:nth-child(3)': { textAlign: 'right' },
      },
    },
  };
});

const Footer = ({ className, ...props }) => {
  const classes = useStyles();
  const [footer] = useFooterBlocks();

  return (
    <>
      <Box className={classes.social}>
        <Container>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item><SNButton type="facebook" /></Grid>
            <Grid item><SNButton type="twitter" /></Grid>
            <Grid item><SNButton type="instagram" /></Grid>
            <Grid item><SNButton type="youtube" /></Grid>
            <Grid item><SNButton type="pinterest" /></Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="footer"
        className={clsx(classes.footer, className)}
      >
        <Container {...props}>
          <HtmlAstRender
            component={Grid}
            container
            hast={footer.childHtmlRehype.htmlAst}
            components={{
              section: sectionProps =>
                <Grid item xs={12} md={4} className={classes.block} {...sectionProps} />,
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
