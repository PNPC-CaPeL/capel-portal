import React from 'react';
import clsx from 'clsx';
import Rehype2react from 'rehype-react';

import { Link } from 'gatsby-material-ui-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  Box,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useRemoteImages from '../hooks/useRemoteImages';
import RatioBox from './RatioBox';

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

    figcaption: {
      textAlign: 'center',
    },

    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    '@global': {
      '.kg-card': {
        marginLeft: 0,
        marginRight: 0,
        marginTop: theme.spacing(6),
      },

      '.kg-width-wide': {
        marginLeft: 'calc(50% - 50vw - .8rem)',
        marginRight: 'calc(50% - 50vw - .8rem)',
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

      '.twitter-tweet-rendered': {
        margin: '0 auto',
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
      hr: ({ className: cn, ...props }) =>
        <Divider className={clsx(cn, classes.divider)} {...props} />,
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
      figcaption: ({ className: cn, ...props }) => (
        <Typography
          component="figcaption"
          variant="caption"
          className={clsx(cn, classes.figcaption)}
          {...props}
        />
      ),
      iframe: props => {
        const isYoutube = [
          /^https:\/\/www\.youtube\.com/,
          /^https:\/\/youtube\.com/,
          /^https:\/\/youtu\.be/,
        ].some(re => props.src.match(re));

        if (!isYoutube) {
          return <iframe {...props} />; // eslint-disable-line
        }

        return (
          <Box style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 800 }}>
            <RatioBox ratio={3 / 2}>
              <iframe // eslint-disable-line
                {...props}
                width="auto"
                height="auto"
                style={{
                  ...props.style, // eslint-disable-line
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  height: '100%',
                  width: '100%',
                }}
              />
            </RatioBox>
          </Box>
        );
      },
      ...components,
    },
  }).Compiler;

  return (
    <Box
      className={clsx(classes.markdown, 'load-external-scripts', className)}
      {...rest}
    >
      {renderAst(hast)}
    </Box>
  );
};

export default HtmlAstRender;
