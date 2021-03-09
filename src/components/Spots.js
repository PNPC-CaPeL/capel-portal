import React from 'react';
import { GeoJSON, Marker } from 'react-leaflet';
import L from 'leaflet';

import useSpots from '../hooks/useSpots';

const pointToLayer = (feature, latLng) => L.circleMarker(latLng);
// const pointToLayer = (feature, latLng) => L.circleMarker(latLng);

const Spots = () => {
  const spots = useSpots();

  if (!spots || !spots.length) {
    return null;
  }

  return (
    <>
      {spots.map(({ name, childMarkdownRemark: { frontmatter: { location: geojson } } }) => (
        <GeoJSON
          key={name}
          data={JSON.parse(geojson)}
          // styleJSON={Style}
          // pointToLayer={pointToLayer}
          // onEachFeature={bindTooltipPopup}
        />

      ))}
      <Marker position={[43.006486, 6.3860755]} />
    </>
  );
};

export default Spots;
