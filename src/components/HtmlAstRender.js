import React from 'react';
import clsx from 'clsx';
import Rehype2react from 'rehype-react';

import { Link } from 'gatsby-material-ui-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useRemoteImages from '../hooks/useRemoteImages';

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
