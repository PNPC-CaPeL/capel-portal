import React from 'react';
import { Popup, Marker, Tooltip } from 'react-leaflet';
import { icon } from 'leaflet';
import { Typography, Tooltip as MUiTooltip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import MarkdownText from './MarkdownText';

const maskBase = {
  iconUrl: '/diving-mask.svg',
  iconSize: [32, 22],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -12], // from iconAnchor
  tooltipAnchor: [17, 0], // from iconAnchor
};
const maskIcon = icon && icon(maskBase);
const maskFavIcon = icon && icon({ ...maskBase, iconUrl: '/diving-mask-fav.svg' });

const Spot = ({
  geojson,
  isFav,
  spot,
  onFavClick = () => {},
  popupComponent: CustomPopup,
  ...props
}) => {
  const { childMarkdownRemark: { htmlAst, frontmatter: { location, title } } } = spot;
  const StarComponent = isFav ? StarIcon : StarBorderIcon;

  const [lon, lat] = JSON.parse(location)?.coordinates;

  return (
    <Marker
      position={[lat, lon]}
      opacity={isFav ? 1 : 0.6}
      icon={isFav ? maskFavIcon : maskIcon}
      {...props}
      title={title}
    >
      <Tooltip>{spot.childMarkdownRemark.frontmatter.title}</Tooltip>

      {(typeof CustomPopup === 'undefined') && (
        <Popup>
          <Typography variant="h3">
            <MUiTooltip title={!isFav ? 'Ajouter aux favoris' : 'Retirer des favoris'}>
              <StarComponent onClick={onFavClick} color={isFav && 'secondary'} style={{ cursor: 'pointer' }} />
            </MUiTooltip>
            {spot.childMarkdownRemark.frontmatter.title}
          </Typography>

          <MarkdownText hast={htmlAst} />
        </Popup>
      )}

      {CustomPopup && (<CustomPopup spot={spot} />)}
    </Marker>
  );
};

export default Spot;
