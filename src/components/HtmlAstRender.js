import React from 'react';
import clsx from 'clsx';
import Rehype2react from 'rehype-react';

import { Link } from 'gatsby-material-ui-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  Box,
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useRemoteImages from '../hooks/useRemoteImages';

const useStyles = makeStyles(theme => {
  const maxWidth = mq => `@media (max-width: ${theme.breakpoints.values[mq]}px)`;
  // const minMaxWidth = (minMq, maxMq) => (`
  //   @media (min-width: ${theme.breakpoints.values[minMq]}px)
  //     and (max-width: ${theme.breakpoints.values[maxMq]}px)`);
  // const minWidth = mq => `@media (min-width: ${theme.breakpoints.values[mq]}px)`;

  return {
    markdown: {
      '& .MuiTypography-body1 + .MuiTypography-body1:not(li)': {
        margin: theme.spacing(2, 0),
      },
      '& [class*="MuiTypography-h"]:not(:first-child)': {
        marginTop: theme.spacing(4),
      },
    },

    figcaptionContainer: {
      marginBottom: theme.spacing(4),
      textAlign: 'center',
    },

    '@global': {
      '.kg-card': {
        marginLeft: 0,
        marginRight: 0,
      },

      '.kg-width-wide': {
        margin: 'auto calc(50% - 50vw - .8rem)',
        transform: 'translateX(calc(50vw - 50% + .8rem))',

        width: 'calc(65vw + 2px)',
        minWidth: 'calc(100% + 18rem)',

        [maxWidth('lg')]: {
          minWidth: 'calc(100%)',
        },
      },

      '.kg-width-full': {
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      },
    },
  };
});

const HtmlAstRender = ({
  hast,
  components,
  className,
  body = 'body1',
  ...rest
}) => {
  const classes = useStyles();
  const { byUrl } = useRemoteImages();

  const renderAst = new Rehype2react({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      h1: props => <Typography variant="h1" {...props} />,
      h2: props => <Typography variant="h2" {...props} />,
      h3: props => <Typography variant="h3" {...props} />,
      h4: props => <Typography variant="h4" {...props} />,
      h5: props => <Typography variant="h5" {...props} />,
      h6: props => <Typography variant="h6" {...props} />,
      p: props => <Typography variant={body} {...props} />,
      li: props => <Typography variant={body} component="li" {...props} />,
      a: props => <Link {...props} />,
      table: props => <Table {...props} />,
      thead: props => <TableHead {...props} />,
      tbody: props => <TableBody {...props} />,
      tr: props => <TableRow {...props} />,
      td: props => <TableCell {...props} />,
      th: props => <TableCell component="th" {...props} />,
      img: ({ src, ...props }) => {
        const imageData = getImage(byUrl[src]);
        return imageData
          ? <GatsbyImage {...props} image={imageData} />
          : <img alt="" style={{ maxWidth: '100%' }} src={src} {...props} />;
      },
      figcaption: props => (
        <Container className={classes.figcaptionContainer}>
          <Typography component="figcaption" variant="caption" {...props} />
        </Container>
      ),
      ...components,
    },
  }).Compiler;

  return (
    <Box
      className={clsx(classes.markdown, className)}
      {...rest}
    >
      {renderAst(hast)}
    </Box>
  );
};

export default HtmlAstRender;
