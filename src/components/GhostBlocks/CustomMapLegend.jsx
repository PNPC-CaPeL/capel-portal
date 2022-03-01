import React from 'react';
import clsx from 'clsx';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import style2svg from '../../lib/style2svg';
import useLckSettings from '../../hooks/useLckSettings';

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

const MapLegend = ({ className, ...props }) => {
  const classes = useStyles();

  const { 1: {
    MAP_STYLES: { value: styles = {} } = {},
    MAP_LEGENDS: { value: mapLegends = [] } = {},
  } } = useLckSettings();

  const legendColumns = mapLegends.filter(({ type }) => type === 'column');

  return (
    <Grid
      container
      className={clsx(classes.root, className)}
      spacing={4}
      {...props}
    >
      {legendColumns.map(({ children = [] }) => (
        <Grid
          item
          key={JSON.stringify(children)}
          xs={12}
          md={Math.floor(12 / legendColumns.length)}
        >
          {children.map(({ type, label, icon, style, customProperties = {} }) => (
            <Grid item className={classes.item} key={label}>
              <Typography
                variant="body2"
                className={clsx({
                  [classes.label]: type === 'polygon',
                  [classes.iconLabel]: type === 'marker',
                })}
              >
                {type === 'polygon' && (
                  <svg width="20" height="20">
                    <path d="M2.5 2.5h15v15H2.5z" {...style2svg(styles[style])} />
                  </svg>
                )}

                {type === 'marker' && (
                  <span>
                    <img
                      className={classes.icon}
                      alt={label}
                      src={`/${icon}.svg`}
                      {...customProperties}
                    />
                  </span>
                )}

                {' '}
                {label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ))}


      {!legendColumns.length && (
        <>
          <Grid
            item
            xs={12}
            md={9}
            container
            spacing={1}
            alignContent="flex-start"
          >
            {mapLegends
              .filter(({ type }) => type === 'polygon')
              .map(({ label, style }) => (
                <Grid item className={classes.item} key={label}>
                  <Typography variant="body2" className={classes.label}>
                    <svg width="20" height="20">
                      <path d="M2.5 2.5h15v15H2.5z" {...style2svg(styles[style])} />
                    </svg>

                    {label}
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
            alignItems="flex-start"
          >
            {mapLegends
              .filter(({ type }) => type === 'marker')
              .map(({ label, icon, customProperties = {} }) => (
                <Grid item key={label} className={classes.item} xs={12}>
                  <Typography
                    variant="body2"
                    className={classes.iconLabel}
                  >
                    <span>
                      <img
                        className={classes.icon}
                        alt={label}
                        src={`/${icon}.svg`}
                        {...customProperties}
                      />
                    </span>
                    {' '}
                    {label}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default MapLegend;
