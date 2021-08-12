import React from 'react';
import { Card, CardContent, Box, Grid, Typography } from '@material-ui/core';

import useLckSettings from '../../hooks/useLckSettings';

const getTile = url => url
  .replace('{x}', '8474')
  .replace('{y}', '6020')
  .replace('{z}', '14')
  .replace('{s}', 'a');

const Basemap = () => {
  const { 1: {
    MAP_BASEMAP: { value: basemaps = [] } = {},
  } } = useLckSettings();

  return (
    <Box style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Fond de carte actuel via le paramètre <tt>MAP_BASEMAP</tt>
          </Typography>

          {basemaps.map(basemap => (
            <Grid
              container
              key={basemap.url}
              justify="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid item md={9}>
                <pre style={{ whiteSpace: 'break-spaces' }}>
                  {JSON.stringify(basemap, null, 2)}
                </pre>
              </Grid>
              <Grid item md={3}>
                {basemap.component === 'TileLayer' && (
                  <img
                    src={getTile(basemap.url)}
                    alt=""
                    style={{ display: 'block', border: '1px dotted currentColor' }}
                  />
                )}
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Basemap;
