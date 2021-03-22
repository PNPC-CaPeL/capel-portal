import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { marker, icon } from 'leaflet';

import useSpots from '../hooks/useSpots';

const bindTooltipPopup = spot => (feature, layer) => {
  // layer.bindPopup('lorem ipsum');
  layer.bindTooltip(spot.childMarkdownRemark.frontmatter.title);
};

const pointToLayer = (geoJsonPoint, latlng) =>
  marker(latlng, {
    icon: icon({
      iconUrl: '/diving-mask.svg',
      iconSize: [32, 22],
      // iconAnchor: [16, 11],
      popupAnchor: [0, 12], // from iconAnchor
      tooltipAnchor: [17, 0], // from iconAnchor
    }),
  });

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
            pointToLayer={pointToLayer}
            onEachFeature={bindTooltipPopup(spot)}
            {...props}
          />
        );
      })}
    </>
  );
};

export default Spots;
