import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import localeData  from 'dayjs/plugin/localeData';
import 'dayjs/locale/fr';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HtmlAstRender from './HtmlAstRender';

import useInformations from '../hooks/useInformations';
import { H2, H3 } from './HomeInformationHeadings';

dayjs.locale('fr');
dayjs.extend(localeData);

const globalLocaleData = dayjs.localeData();

const useStyles = makeStyles(theme => ({
  info: {
    marginTop: theme.spacing(2),
  },
  placeholder: {
    height: 0,
    paddingBottom: 'calc(100% * 1 / 1)',
    background: theme.palette.grey[200],
  },
}));

const HomeInformations = ({ className, ...props }) => {
  const classes = useStyles();
  const informations = useInformations();

  const altComponents = React.useMemo(() => ({
    h2: componentProps => <H2 {...componentProps} />,
    h3: componentProps => <H3 {...componentProps} />,
  }), []);

  return (
    <Box className={clsx(classes.wrapper, className)} {...props}>
      {informations.map(({
        childHtmlRehype: { htmlAst: hast },
        featureImage,
        title,
        date,
        id,
      }) => {
        const d = dayjs(date);
        const day = globalLocaleData.weekdays()[d.day()];
        const month = globalLocaleData.months()[d.month()];

        return (
          <Grid
            key={id}
            container
            spacing={2}
            className={clsx(classes.info, className)}
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={2} style={{ textAlign: 'center' }}>
              {(featureImage
                ? <GatsbyImage image={getImage(featureImage)} alt="" />
                : <Box className={classes.placeholder} />
              )}
            </Grid>

            <Grid item xs={12} sm={10}>
              <Typography variant="overline">
                {dayjs(date).format(`[${day}] D [${month}] YYYY`)}
              </Typography>

              <Typography variant="h4" component="h2">
                {title}
              </Typography>

              <HtmlAstRender hast={hast} body="body2" components={altComponents} />
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default HomeInformations;
