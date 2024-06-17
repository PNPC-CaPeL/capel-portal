<template>
  <div
    id="capel-map"
    class="h-full"
  />
</template>

<script lang="ts">
import * as L from 'leaflet'
import type { Aire } from '~/server/api/aires'
import type { Division } from '~/server/api/divisions'
import type { Spot } from '~/server/api/spots'
import type { Structure } from '~/server/api/structures'
import type { Zone } from '~/server/api/zones'

export default {
  setup() {
    const { t } = useI18n()

    return { t }
  },
  data() {
    return { map: null as null | L.Map }
  },
  mounted() {
    this.mapBuild()
    $fetch('/api/spots').then((result) => {
      this.mapAddSpots(result)
    })
    $fetch('/api/structures').then((result) => {
      this.mapAddStructures(result)
    })
    $fetch('/api/aires').then((result) => {
      this.mapAddAires(result)
    })
    $fetch('/api/zones').then((result) => {
      this.mapAddZones(result)
    })
    $fetch('/api/divisions').then((result) => {
      this.mapAddDivisions(result)
    })
  },
  methods: {
    mapBuild() {
      this.map = new L.Map('capel-map', {
        center: new L.LatLng(43.01, 6.275),
        zoom: 11.5,
        maxZoom: 19,
        // minZoom: 7,
      })

      new L.TileLayer(
        '//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      ).addTo(this.map)
      new L.TileLayer('//tiles.openseamap.org/seamark/{z}/{x}/{y}.png').addTo(
        this.map,
      )

      this.map.attributionControl.setPrefix('')

      L.control
        .attribution({
          prefix: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        })
        .addTo(this.map)
    },
    mapAddSpots(spots: Spot[]): void {
      for (const spot of spots) {
        if (spot.geojson) {
          const [lon, lat] = spot.geojson.coordinates

          L.marker([lat, lon])
            .addTo(this.map)
            .setIcon(getSpotIcon(spot))
            .bindPopup(getSpotInnerPopup(spot, this.t))
            .bindTooltip(String(spot.nom))
        }
      }
    },
    mapAddStructures(structures: Structure[]): void {
      for (const structure of structures) {
        if (structure.geojson) {
          const [lon, lat] = structure.geojson.coordinates

          L.marker([lat, lon])
            .addTo(this.map)
            .setIcon(structureIcon)
            .bindPopup(getStructureInnerPopup(structure, this.t))
            .bindTooltip(String(structure.nom))
        }
      }
    },
    mapAddAires(aires: Aire[]): void {
      for (const aire of aires) {
        if (aire.geojson) {
          // const [lon, lat] = aire.geojson.coordinates

          L.geoJSON(aire.geojson, {
            style: getPathOptions(String(aire.style)),
          })
            .addTo(this.map)
            .bindTooltip(String(aire.nom), { offset: [10, 0], sticky: true })
        }
      }
    },
    mapAddZones(zones: Zone[]): void {
      for (const zone of zones) {
        if (zone.geojson) {
          // const [lon, lat] = aire.geojson.coordinates

          L.geoJSON(zone.geojson, {
            style: getPathOptions(String(zone.style)),
          })
            .addTo(this.map)
            .bindTooltip(
              `<strong>${zone.nom}</strong><br /><em>${zone.protection}</em>`,
              { offset: [10, 0], sticky: true },
            )
        }
      }
    },
    mapAddDivisions(divisions: Division[]): void {
      for (const division of divisions) {
        if (division.geojson) {
          // const [lon, lat] = aire.geojson.coordinates

          L.geoJSON(division.geojson, {
            style: getPathOptions(String(division.style)),
          })
            .addTo(this.map)
            .bindTooltip(String(division.nom), {
              offset: [10, 0],
              sticky: true,
            })
        }
      }
    },
  },
}
</script>
