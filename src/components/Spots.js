import React from 'react';
import { GeoJSON } from 'react-leaflet';

import useSpots from '../hooks/useSpots';

const bindTooltipPopup = spot => (feature, layer) => {
  // layer.bindPopup('lorem ipsum');
  layer.bindTooltip(spot.childMarkdownRemark.frontmatter.title);
};

const Spots = props => {
  const spots = useSpots();

  if (!spots || !spots.length) {
    return null;
  }

  return (
    <>
      {spots.map(spot => {
        const {
          name,
          childMarkdownRemark: { frontmatter: { location }, frontmatter },
        } = spot;

        const geojson = {
          type: 'Feature',
          geometry: JSON.parse(location),
          properties: { name, ...frontmatter },
        };

        return (
          <GeoJSON
            key={name}
            data={geojson}
            onEachFeature={bindTooltipPopup(spot)}
            {...props}
          />
        );
      })}
    </>
  );
};

export default Spots;
