import React from 'react';
import inside from '@turf/boolean-point-in-polygon';
import createPersistedState from 'use-persisted-state';

import HomeInformationCard from './HomeInformationCard';

import useInformations from '../hooks/useInformations';
import useSpots from '../hooks/useSpots';

const useFavs = createPersistedState('capel-favs');

const HomeInformations = () => {
  const [favs] = useFavs({});
  const informations = useInformations();

  const favSpots = useSpots()
    .filter(({ name }) => Object.keys(favs).includes(name))
    .map(spot => {
      const { name, childMarkdownRemark: { frontmatter: { title, location } } } = spot;
      return {
        name,
        title,
        coordinates: JSON.parse(location).coordinates,
      };
    });

  const favSpotTitles = favSpots.map(({ title }) => title);

  const isFavInfo = info => {
    const { childMarkdownRemark: { frontmatter: { spots = [], zone = '{}' } } } = info;
    const spotIntersect = spots.filter(value => favSpotTitles.includes(value));

    const polygon = JSON.parse(zone);

    return (
      Boolean(spotIntersect.length)
      || favSpots.some(({ coordinates }) => inside(coordinates, polygon))
    );
  };

  const favInformations = informations.filter(isFavInfo);
  const notFavInformations = informations.filter(info => !isFavInfo(info));

  return (
    <>
      {favInformations.map(({ childMarkdownRemark: { excerptAst, frontmatter: { title } } }) => (
        <HomeInformationCard
          key={title}
          title={title}
          hast={excerptAst}
        />
      ))}

      {notFavInformations.map(({ childMarkdownRemark: { excerptAst, frontmatter: { title } } }) => (
        <HomeInformationCard
          key={title}
          title={title}
          hast={excerptAst}
          style={{ opacity: 0.5 }}
        />
      ))}
    </>
  );
};

export default HomeInformations;
