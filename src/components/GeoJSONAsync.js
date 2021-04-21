import React from 'react';
import { withPrefix } from 'gatsby';
import { useQuery } from 'react-query';
import { GeoJSON } from 'react-leaflet';

const getLayerData = async ({ queryKey: [, filename] }) => {
  const response = await fetch(withPrefix(filename));
  const json = await response.json();
  return json;
};

const GeoJSONAsync = ({
  component: Component = GeoJSON,
  filename,
  ...props
}) => {
  const { data } = useQuery(
    ['GeoJSONAsync', filename],
    getLayerData,
    { retry: 1, staleTime: Infinity },
  );

  if (!data) {
    return <></>;
  }

  return (
    <Component data={data} {...props} />
  );
};

export default GeoJSONAsync;
