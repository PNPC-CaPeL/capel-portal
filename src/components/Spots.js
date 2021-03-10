import React from 'react';
import { GeoJSON } from 'react-leaflet';

import useSpots from '../hooks/useSpots';

const bindTooltipPopup = spot => (feature, layer) => {
  // layer.bindPopup('lorem ipsum');
  layer.bindTooltip(spot.childMarkdownRemark.frontmatter.title);
};

const Spots = () => {
  const spots = useSpots();

  if (!spots || !spots.length) {
    return null;
  }

  return (
    <>
      {spots.map(spot => {
        const { name, childMarkdownRemark: { frontmatter: { location } } } = spot;

        return (
          <GeoJSON
            key={name}
            data={JSON.parse(location)}
            // styleJSON={Style}
            // pointToLayer={pointToLayer}
            onEachFeature={bindTooltipPopup(spot)}
          />
        );
      })}
    </>
  );
};

export default Spots;
