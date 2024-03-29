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

// {
//   "rouge": {
//     "color": "red",
//     "stroke": true,
//     "fill": true,
//     "weight": 1,
//     "fillOpacity": 0.5
//   },
//   "rouge-pointille": {
//     "color": "red",
//     "stroke": true,
//     "fill": true,
//     "weight": 1.5,
//     "dashArray": "10",
//     "fillOpacity": 0.1
//   },
//   "orange-pointille": {
//     "color": "#e8473d",
//     "stroke": true,
//     "fill": true,
//     "weight": 2,
//     "dashArray": "3 5",
//     "fillOpacity": 0.1
//   },
//   "rouge-contour": {
//     "color": "red",
//     "stroke": true,
//     "fill": true,
//     "weight": 1,
//     "fillOpacity": 0
//   },
//   "orange": {
//     "color": "orange",
//     "stroke": true,
//     "fill": true,
//     "weight": 1,
//     "fillOpacity": 0.2
//   },
//   "vert-contour": {
//     "color": "#7cbba3",
//     "stroke": true,
//     "fill": true,
//     "weight": 1,
//     "strokeOpacity": 0.6,
//     "fillOpacity": 0
//   },
//   "bleu-epais": {
//     "color": "blue",
//     "stroke": true,
//     "fill": true,
//     "weight": 12,
//     "opacity": 0.05,
//     "fillOpacity": 0
//   },
//   "bleu": {
//     "color": "#0000dd",
//     "stroke": true,
//     "fill": true,
//     "weight": 5,
//     "opacity": 0.05,
//     "fillOpacity": 0.03
//   }
// }
// [
//   {
//     "type": "column",
//     "children": [
//       {
//         "type": "polygon",
//         "label": "Plongée interdite",
//         "style": "rouge"
//       },
//       {
//         "type": "polygon",
//         "label": "Plongée interdite du 1er avril au 30 septembre",
//         "style": "rouge-pointille"
//       },
//       {
//         "type": "polygon",
//         "label": "Plongée interdite du 1er Avril au 30 octobre",
//         "style": "orange-pointille"
//       }
//     ]
//   },
//   {
//     "type": "column",
//     "children": [
//       {
//         "type": "polygon",
//         "label": "Accostage, amarrage et débarquement interdits",
//         "style": "rouge-contour"
//       },
//       {
//         "type": "polygon",
//         "label": "Mouillage interdit sauf sur dispositif de plongée",
//         "style": "orange"
//       },
//       {
//         "type": "polygon",
//         "label": "Plongée soumise à autorisation",
//         "style": "bleu"
//       }
//     ]
//   },
//   {
//     "type": "column",
//     "children": [
//       {
//         "type": "marker",
//         "label": "Spot (naturel)",
//         "icon": "diving-mask"
//       },
//       {
//         "type": "marker",
//         "label": "Spot avec amarrage (naturel)",
//         "icon": "diving-mask-buoy"
//       },
//       {
//         "type": "marker",
//         "label": "Spot contribué (naturel)",
//         "icon": "diving-mask-user"
//       },
//       {
//         "type": "marker",
//         "label": "Spot (épave)",
//         "icon": "shipwreck"
//       },
//       {
//         "type": "marker",
//         "label": "Spot avec amarrage (épave)",
//         "icon": "shipwreck-buoy"
//       },
//       {
//         "type": "marker",
//         "label": "Spot contribué (épave)",
//         "icon": "shipwreck-user"
//       },
//       {
//         "type": "marker",
//         "label": "Structure partenaire",
//         "icon": "structure"
//       }
//     ]
//   }
// ]
