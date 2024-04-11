import * as L from 'leaflet'
import type { Spot } from '~/server/api/spots'
import type { Structure } from '~/server/api/structures'

export const mapBuild = function (targetId: string): L.Map {
  const map = new L.Map(targetId, {
    center: new L.LatLng(43.01, 6.275),
    zoom: 11.5,
    maxZoom: 19,
    // minZoom: 7,
  })

  new L.TileLayer(
    '//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  ).addTo(map as L.Map)
  new L.TileLayer('//tiles.openseamap.org/seamark/{z}/{x}/{y}.png').addTo(
    map as L.Map,
  )

  map.attributionControl.setPrefix('')
  L.control
    .attribution({
      prefix: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map)

  return map
}

const iconBase = {
  iconSize: [32, 22],
  iconAnchor: [16, 11],
  popupAnchor: [0, -11],
  tooltipAnchor: [18, 0],
} as L.IconOptions

const maskBase = {
  ...iconBase,
  iconUrl: '/diving-mask.svg',
} as L.IconOptions

const shipwreck = {
  ...iconBase,
  iconUrl: '/shipwreck.svg',
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

export const structureIcon = L.icon({
  iconUrl: '/structure.svg',
  iconSize: [16, 16],
  // iconAnchor: [16, 11],
  popupAnchor: [0, -8], // from iconAnchor
  tooltipAnchor: [8, 0], // from iconAnchor
})

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

export const getStructureInnerPopup = function (structure: Structure): string {
  let innerPopup = `<h3>${structure.nom}</h3>
                    <p>
                      ${structure.adresse}<br />
                      ${structure.codePostal} ${structure.ville}<br />
                      ${structure.tel}<br />
                    </p>
  `

  if (structure.site) {
    innerPopup += `<p><a href="${structure.site}" target="_blank">Voir leur site internet</a></p>`
  }

  return innerPopup
}

export const getStyle = function (style: string): L.PathOptions {
  switch (style) {
    case 'rouge':
      return {
        color: 'red',
        stroke: true,
        fill: true,
        weight: 1,
        fillOpacity: 0.5,
      }
    case 'rouge-pointille':
      return {
        color: 'red',
        stroke: true,
        fill: true,
        weight: 1.5,
        dashArray: '10',
        fillOpacity: 0.1,
      }
    case 'orange-pointille':
      return {
        color: '#e8473d',
        stroke: true,
        fill: true,
        weight: 2,
        dashArray: '3 5',
        fillOpacity: 0.1,
      }
    case 'rouge-contour':
      return {
        color: 'red',
        stroke: true,
        fill: true,
        weight: 1,
        fillOpacity: 0,
      }
    case 'orange':
      return {
        color: 'orange',
        stroke: true,
        fill: true,
        weight: 1,
        fillOpacity: 0.2,
      }
    case 'vert-contour':
      return {
        color: '#7cbba3',
        stroke: true,
        fill: true,
        weight: 1,
        opacity: 0.6,
        fillOpacity: 0,
      }
    case 'bleu-epais':
      return {
        color: 'blue',
        stroke: true,
        fill: true,
        weight: 12,
        opacity: 0.05,
        fillOpacity: 0,
      }
    case 'bleu':
      return {
        color: '#0000dd',
        stroke: true,
        fill: true,
        weight: 5,
        opacity: 0.05,
        fillOpacity: 0.03,
      }
    default:
      return {}
  }
}
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
