import React from 'react';
import inside from '@turf/boolean-point-in-polygon';
import createPersistedState from 'use-persisted-state';

import { Card, CardContent, Typography } from '@material-ui/core';

import MarkdownText from './MarkdownText';

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

  const favInformations = informations.filter(info => {
    const { childMarkdownRemark: { frontmatter: { spots = [], zone = '{}' } } } = info;
    const spotIntersect = spots.filter(value => favSpotTitles.includes(value));

    const polygon = JSON.parse(zone);

    return (
      Boolean(spotIntersect.length)
      || favSpots.some(({ coordinates }) => inside(coordinates, polygon))
    );
  });

  return (
    <>
      {favInformations.map(({ childMarkdownRemark: { excerptAst, frontmatter: { title } } }) => (
        <Card>
          <CardContent>
            <Typography variant="h3" paragraph>
              {title}
            </Typography>
            <MarkdownText hast={excerptAst} />
          </CardContent>
        </Card>
      ))}

      {favInformations.length === 0 && (
        <>
          {informations.map(({ childMarkdownRemark: { excerptAst, frontmatter: { title } } }) => (
            <Card style={{ opacity: 0.5 }} key={title}>
              <CardContent>
                <Typography variant="h3" paragraph>
                  {title}
                </Typography>
                <MarkdownText hast={excerptAst} />
              </CardContent>
            </Card>
          ))}
        </>
      )}

    </>
  );
};

export default HomeInformations;
