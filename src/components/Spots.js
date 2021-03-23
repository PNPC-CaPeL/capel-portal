import React from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import { marker, icon } from 'leaflet';
import { Button } from 'gatsby-theme-material-ui';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import createPersistedState from 'use-persisted-state';

import MarkdownText from './MarkdownText';
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
      popupAnchor: [0, -12], // from iconAnchor
      tooltipAnchor: [17, 0], // from iconAnchor
    }),
  });

const useFavs = createPersistedState('capel-favs');

const Spots = ({ popupComponent: CustomPopup, ...props }) => {
  const spots = useSpots();
  const [favs, setFavs] = useFavs({});

  if (!spots || !spots.length) {
    return null;
  }

  return (
    <>
      {spots.map(spot => {
        const {
          name,
          childMarkdownRemark: { frontmatter: { location }, frontmatter, htmlAst },
        } = spot;

        const geojson = {
          type: 'Feature',
          geometry: JSON.parse(location),
          properties: { name, ...frontmatter },
        };

        const isFav = favs[spot.name];
        const StarComponent = isFav ? StarIcon : StarBorderIcon;

        return (
          <GeoJSON
            key={name}
            data={geojson}
            pointToLayer={pointToLayer}
            onEachFeature={bindTooltipPopup(spot)}
            {...props}
          >
            {(typeof CustomPopup === 'undefined') && (
              <Popup>
                <StarComponent
                  onClick={() => setFavs(({ [spot.name]: isPrevFav, ...prevFavs }) =>
                    (isPrevFav ? prevFavs : { ...prevFavs, [spot.name]: true }))}
                  color={isFav && 'secondary'}
                />
                <MarkdownText hast={htmlAst} />
                <Button onClick={() => console.log(spot)} variant="outlined" color="secondary">
                  Déclarer une plongée ici.
                </Button>
              </Popup>
            )}

            {CustomPopup && (<CustomPopup spot={spot} />)}
          </GeoJSON>
        );
      })}
    </>
  );
};

export default Spots;
