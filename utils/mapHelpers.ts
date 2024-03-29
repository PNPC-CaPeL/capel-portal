import type { Spot } from '~/server/api/lckData'
import * as L from 'leaflet'

const maskBase = {
  iconUrl: '/diving-mask.svg',
  iconSize: [32, 22],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -12], // from iconAnchor
  tooltipAnchor: [17, 0], // from iconAnchor
} as L.IconOptions

const shipwreck = {
  iconUrl: '/shipwreck.svg',
  iconSize: [32, 22],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -12], // from iconAnchor
  tooltipAnchor: [17, 0], // from iconAnchor
} as L.IconOptions

const maskIcon = L.icon && L.icon(maskBase)
const maskIconBuoy =
  L.icon && L.icon({ ...maskBase, iconUrl: '/diving-mask-buoy.svg' })
const maskIconUser =
  L.icon && L.icon({ ...maskBase, iconUrl: '/diving-mask-user.svg' })
const wreckIcon = L.icon && L.icon(shipwreck)
const wreckIconBuoy =
  L.icon && L.icon({ ...shipwreck, iconUrl: '/shipwreck-buoy.svg' })
const wreckIconUser =
  L.icon && L.icon({ ...shipwreck, iconUrl: '/shipwreck-user.svg' })

export const getSpotIcon = function (spot: Spot): L.Icon {
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

export const getSpotInnerPopup = function (spot: Spot): string {
  let innerPopup = `<h3>${spot.nom}</h3>`
  innerPopup += `<table>`
  for (const field in spot.popupData) {
    if (spot.popupData[field]) {
      innerPopup += `<tr><th>${field}</th><td>${spot.popupData[field]}</td><tr>`
    }
  }
  if (spot.lien) {
    innerPopup += `<tr>
                    <th>Lien</th>
                    <td>
                      <a href="${spot.lien}" target="_blank">En savoir plus</a>
                    </td>
                  <tr>`
  }
  innerPopup += `</table>`

  return innerPopup
}
