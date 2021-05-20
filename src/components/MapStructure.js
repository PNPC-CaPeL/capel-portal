import React from 'react';
import { Popup, Marker, Tooltip } from 'react-leaflet';
import { icon } from 'leaflet';
import { Typography } from '@material-ui/core';

import HtmlAstRender from './HtmlAstRender';

const iconBase = {
  iconUrl: '/structure.svg',
  iconSize: [24, 24],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -15], // from iconAnchor
  tooltipAnchor: [15, 0], // from iconAnchor
};

const MapStructures = ({
  geojson,
  structure,
  popupComponent: CustomPopup,
  ...props
}) => {
  const { childMarkdownRemark: { htmlAst, frontmatter: { location, title } } } = structure;

  const [lon, lat] = JSON.parse(location)?.coordinates;

  return (
    <Marker
      position={[lat, lon]}
      icon={icon(iconBase)}
      {...props}
      title={title}
    >
      <Tooltip>{structure.childMarkdownRemark.frontmatter.title}</Tooltip>

      {(typeof CustomPopup === 'undefined') && (
        <Popup>
          <Typography variant="h3">
            {structure.childMarkdownRemark.frontmatter.title}
          </Typography>

          <HtmlAstRender hast={htmlAst} />
        </Popup>
      )}
    </Marker>
  );
};

export default MapStructures;
