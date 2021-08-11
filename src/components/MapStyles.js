import React from 'react';
import { Typography, Tooltip } from '@material-ui/core';

import useLckSettings from '../hooks/useLckSettings';
import style2svg from '../lib/style2svg';

const MapStyles = () => {
  const { 1: {
    MAP_STYLES: { value: polygonStyles = {} } = {},
  } } = useLckSettings();

  return (
    <>
      <Typography variant="body1">
        Styles actuellement disponible via le paramètre <tt>MAP_STYLES</tt>
      </Typography>

      {Object.entries(polygonStyles).map(([key, value]) => (
        <Typography variant="body2" key={key}>
          <Tooltip title={(<pre>{JSON.stringify(value, null, 2)}</pre>)}>
            <svg width="20" height="20" style={{ verticalAlign: 'middle' }}>
              <path d="M2.5 2.5h15v15H2.5z" {...style2svg(value)} />
            </svg>
          </Tooltip>{' '}

          {key}
        </Typography>
      ))}
    </>
  );
};

export default MapStyles;
