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
}));

const MapLegend = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={clsx(classes.root, className)} {...props}>
      {styles.map(([properties, style]) => (
        <Grid item className={classes.item} key={JSON.stringify(properties)}>
          <Typography variant="body2" className={classes.label}>
            <svg width="20" height="20">
              <path d="M2.5 2.5h15v15H2.5z" {...style2svg(style)} />
            </svg>

            {Object.values(properties).join(', ')}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default MapLegend;
