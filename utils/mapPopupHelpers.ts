import type { Spot } from '~/server/api/spots'
import type { Structure } from '~/server/api/structures'

export const getSpotInnerPopup = function (spot: Spot): string {
  let innerPopup = `<div class="font-sans text-base">`
  innerPopup += `<h3 class="text-2xl font-bold">${spot.nom}</h3>`
  innerPopup += `<table class="mt-2">`

  for (const field in spot.popupData) {
    if (spot.popupData[field]) {
      innerPopup += `<tr class="border-b">
                      <th class="p-2">${field}</th>
                      <td class="p-2">${spot.popupData[field]}</td>
                    <tr>`
    }
  }
  if (spot.lien) {
    innerPopup += `<tr class="border-b">
                    <th class="p-2">Lien</th>
                    <td class="p-2">
                      <a href="${spot.lien}" target="_blank">En savoir plus</a>
                    </td>
                  <tr>`
  }
  innerPopup += `</table>`
  innerPopup += `</div>`

  return innerPopup
}

export const getStructureInnerPopup = function (structure: Structure): string {
  let innerPopup = `<div div class="font-sans text-base">
                      <h3 class="text-2xl font-bold">${structure.nom}</h3>
                      <p class="mt-2">`
  if (structure.adresse) {
    innerPopup += `${structure.adresse}<br />`
  }
  if (structure.codePostal || structure.ville) {
    innerPopup += `${structure.codePostal} ${structure.ville}<br />`
  }
  if (structure.tel) {
    innerPopup += `${structure.tel}<br />`
  }
  if (structure.site) {
    innerPopup += `<a href="${structure.site}" target="_blank">Voir leur site internet</a>`
  }
  innerPopup += `</p>`
  innerPopup += `</div>`

  return innerPopup
}
