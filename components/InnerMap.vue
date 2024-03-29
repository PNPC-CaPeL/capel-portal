<template>
  <div id="capel-map" />
</template>

<script lang="ts">
import * as L from 'leaflet'

export default {
  async setup() {
    const lckData = await $fetch('/api/lckData')

    return { lckData }
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map: null as any,
    }
  },
  mounted() {
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

    this.addSpotsToMap()
  },
  methods: {
    addSpotsToMap(): void {
      // Adding spots
      for (const spot of this.lckData.spots) {
        const geojson = spot.geojson

        if (geojson) {
          const [lon, lat] = geojson.coordinates

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
<style scoped>
#capel-map {
  height: 300px;
}
</style>
