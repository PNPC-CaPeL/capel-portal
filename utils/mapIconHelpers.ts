import { icon } from 'leaflet'
import type { IconOptions, Icon } from 'leaflet'
import type { Spot } from '~/server/api/spots'

const iconBase = {
  iconSize: [32, 22],
  iconAnchor: [16, 11],
  popupAnchor: [0, -11],
  tooltipAnchor: [18, 0],
} as IconOptions

const maskBase = {
  ...iconBase,
  iconUrl: '/diving-mask.svg',
} as IconOptions

const shipwreck = {
  ...iconBase,
  iconUrl: '/shipwreck.svg',
} as IconOptions

const maskIcon = icon && icon(maskBase)
const maskIconBuoy =
  icon && icon({ ...maskBase, iconUrl: '/diving-mask-buoy.svg' })
const maskIconUser =
  icon && icon({ ...maskBase, iconUrl: '/diving-mask-user.svg' })
const wreckIcon = icon && icon(shipwreck)
const wreckIconBuoy =
  icon && icon({ ...shipwreck, iconUrl: '/shipwreck-buoy.svg' })
const wreckIconUser =
  icon && icon({ ...shipwreck, iconUrl: '/shipwreck-user.svg' })

export const structureIcon = icon({
  iconUrl: '/structure.svg',
  iconSize: [16, 16],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -8], // from iconAnchor
  tooltipAnchor: [8, 0], // from iconAnchor
})

export const getSpotIcon = function (spot: Spot): Icon {
  const isEpave = spot.type === 'Epave'
  const isUser = spot.statut === 'Contribué'
  const isBuoy = spot.amarrage

  if (isUser) {
    return isEpave ? wreckIconUser : maskIconUser
  }

  if (isBuoy) {
    return isEpave ? wreckIconBuoy : maskIconBuoy
  }

  return isEpave ? wreckIcon : maskIcon
}
