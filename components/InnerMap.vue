<template>
  <div
    id="capel-map"
    class="h-full"
  />
</template>

<script lang="ts">
import * as L from 'leaflet'
import type { Club, Spot } from '~/server/api/lckData'

export default {
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map: null as null | L.Map,
      spots: [] as Spot[],
      clubs: [] as Club[],
    }
  },
  mounted() {
    this.buildMap()
    $fetch('/api/lckData').then((result) => {
      this.spots = result.spots
      this.clubs = result.clubs
      this.addSpotsToMap()
    })
  },
  methods: {
    buildMap(): void {
      this.map = new L.Map('capel-map', {
        center: new L.LatLng(43.01, 6.275),
        zoom: 11.5,
        maxZoom: 19,
        // minZoom: 7,
      })

      new L.TileLayer(
        '//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      ).addTo(this.map as L.Map)
      new L.TileLayer('//tiles.openseamap.org/seamark/{z}/{x}/{y}.png').addTo(
        this.map as L.Map,
      )

      this.map.attributionControl.setPrefix('')
      L.control
        .attribution({
          prefix: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        })
        .addTo(this.map)
    },
    addSpotsToMap(): void {
      for (const spot of this.spots) {
        if (spot.geojson) {
          const [lon, lat] = spot.geojson.coordinates

          L.marker([lat, lon])
            .addTo(this.map)
            .setIcon(getSpotIcon(spot))
            .bindPopup(getSpotInnerPopup(spot))
            .bindTooltip(spot.nom)
        }
      }
    },
  },
}
</script>
