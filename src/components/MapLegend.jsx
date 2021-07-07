import React from 'react';
import clsx from 'clsx';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { styles, style2svg } from '../lib/map-styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
  },

  item: {
    marginRight: theme.spacing(2),
    '& svg': {
      verticalAlign: 'middle',
      marginRight: theme.spacing(0.5),
    },
  },

  label: {
    fontSize: '0.9rem',
  },

  icon: {
    maxWidth: 24,
    maxHeight: 24,
    verticalAlign: 'middle',
  },

  iconLabel: {
    whiteSpace: 'nowrap',
    fontSize: '0.9rem',
    '& span': {
      display: 'inline-block',
      width: 28,
    },
  },
}));

const icons = [
  {
    file: '/diving-mask.svg',
    label: 'Spot (naturel)',
  },
  {
    file: '/shipwreck.svg',
    label: 'Spot (épave)',
  },
  {
    file: '/structure2.svg',
    label: 'Partenaire',
  },
];

const MapLegend = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={clsx(classes.root, className)}
      {...props}
    >
      <Grid
        item
        xs={12}
        md={9}
        container
        spacing={1}
      >
        {styles.map(([properties, style]) => (
          <Grid item className={classes.item} key={JSON.stringify(properties)}>
            <Typography variant="body2" className={classes.label}>
              <svg width="20" height="20">
                <path d="M2.5 2.5h15v15H2.5z" {...style2svg(style)} />
              </svg>

              {Object.values(properties).join(', ').replace('ammarage', 'amarrage')}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid
        item
        xs={12}
        md={3}
        container
        spacing={1}
        alignItems="start"
      >
        {icons.map(({ file, label }) => (
          <Grid item key={label} className={classes.item} xs={12}>
            <Typography
              variant="body2"
              className={classes.iconLabel}
            >
              <span>
                <img
                  src={file}
                  className={classes.icon}
                  alt={label}
                />
              </span> {label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MapLegend;
