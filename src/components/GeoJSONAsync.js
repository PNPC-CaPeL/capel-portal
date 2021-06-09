import React from 'react';

import { useQuery } from 'react-query';
import { GeoJSON } from 'react-leaflet';

const getLayerData = async ({ queryKey: { 1: filename } }) => {
  const response = await fetch(filename);
  const result = await response.json();
  return result;
};

const useLayerData = filename =>
  useQuery(
    ['GeoJSONAsync', filename],
    getLayerData,
    { retry: 1, staleTime: Infinity },
  );

const GeoJSONAsync = ({
  component: Component = GeoJSON,
  styleJSON,
  filename,
  ...props
}) => {
  const { data } = useLayerData(filename);

  const style = React.useCallback(() => {
    const defaultStyle = {
      weight: 1,
      radius: 8,
    };
    if (!styleJSON) { return defaultStyle; }

    try {
      const layerStyle =  JSON.parse(styleJSON);
      return {
        ...defaultStyle,
        ...layerStyle,
      };
    } catch (e) {
      return defaultStyle;
    }
  }, [styleJSON]);

  if (!data) {
    return <></>;
  }

  return (
    <Component style={style} data={data} {...props} />
  );
};

export default GeoJSONAsync;
