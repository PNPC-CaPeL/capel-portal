import React from 'react';

import createPersistedState from 'use-persisted-state';

import useSpots from '../hooks/useSpots';
import Spot from './Spot';

const useFavs = createPersistedState('capel-favs');

const Spots = props => {
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
          childMarkdownRemark: { frontmatter: { location }, frontmatter },
        } = spot;

        const isFav = favs[spot.name];

        const geojson = {
          type: 'Feature',
          geometry: JSON.parse(location),
          properties: { name, ...frontmatter, favorite: !!isFav },
        };

        return (
          <Spot
            key={name}
            geojson={geojson}
            isFav={isFav}
            spot={spot}
            onFavClick={() => setFavs(({ [spot.name]: isPrevFav, ...prevFavs }) =>
              (isPrevFav ? prevFavs : { ...prevFavs, [spot.name]: true }))}
            {...props}
          />
        );
      })}
    </>
  );
};

export default Spots;
