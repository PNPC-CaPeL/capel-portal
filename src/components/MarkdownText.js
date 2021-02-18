import React from 'react';
import clsx from 'clsx';
import Rehype2react from 'rehype-react';

import Box from '@material-ui/core/Box';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';

const useStyles = makeStyles(theme => ({
  markdown: {
    '& .MuiTypography-body1 + .MuiTypography-body1:not(li)': {
      margin: theme.spacing(2, 0),
    },
    '& [class*="MuiTypography-h"]:not(:first-child)': {
      marginTop: theme.spacing(4),
    },
  },
}));

const MarkdownText = ({ hast, components, className, ...rest }) => {
  const classes = useStyles();

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
      p: props => <Typography variant="body1" {...props} />,
      li: props => <Typography variant="body1" component="li" {...props} />,
      a: props => <Link {...props} />,
      table: props => <Table {...props} />,
      thead: props => <TableHead {...props} />,
      tbody: props => <TableBody {...props} />,
      tr: props => <TableRow {...props} />,
      td: props => <TableCell {...props} />,
      th: props => <TableCell component="th" {...props} />,
      img: props => <img style={{ maxWidth: '100%' }} {...props} />, // eslint-disable-line jsx-a11y/alt-text
      ...components,
    },
  }).Compiler;

  return (
    <Box className={clsx(classes.markdown, className)} {...rest}>{renderAst(hast)}</Box>
  );
};

export default MarkdownText;
