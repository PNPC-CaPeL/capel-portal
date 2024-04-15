<template>
  <div
    class="mt-2 flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center text-sm font-normal"
  >
    <ul
      v-for="(column, key) in legendData"
      :key="key"
      class="list-none gap-1 flex flex-col"
    >
      <li
        v-for="item in column"
        :key="item.label"
        class="flex gap-1 items-center"
      >
        <svg
          v-if="item.type == 'polygon'"
          width="20"
          height="20"
        >
          <path
            d="M2.5 2.5h15v15H2.5z"
            v-bind="getSvgPathOptions(item.style)"
          />
        </svg>
        <img
          v-else-if="item.type == 'marker'"
          :src="'/' + item.icon + '.svg'"
          class="h-auto w-6"
        />
        {{ $t(item.label) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      legendData: [
        [
          {
            type: 'polygon',
            label: 'map.legend.divingProhibited',
            style: 'rouge',
          },
          {
            type: 'polygon',
            label: 'map.legend.divingProhibitedAprilToSeptember',
            style: 'rouge-pointille',
          },
          {
            type: 'polygon',
            label: 'map.legend.divingProhibitedAprilToOctober',
            style: 'orange-pointille',
          },
        ],
        [
          {
            type: 'polygon',
            label: 'map.legend.berthingMooringDisembarkingProhibited',
            style: 'rouge-contour',
          },
          {
            type: 'polygon',
            label: 'map.legend.anchoringProhibited',
            style: 'orange',
          },
          {
            type: 'polygon',
            label: 'map.legend.divingWithAuthorisation',
            style: 'bleu',
          },
        ],
        [
          {
            type: 'marker',
            label: 'map.legend.spotNatural',
            icon: 'diving-mask',
          },
          {
            type: 'marker',
            label: 'map.legend.spotNaturalMooring',
            icon: 'diving-mask-buoy',
          },
          {
            type: 'marker',
            label: 'map.legend.spotNaturalContributed',
            icon: 'diving-mask-user',
          },
          {
            type: 'marker',
            label: 'map.legend.spotWreck',
            icon: 'shipwreck',
          },
          {
            type: 'marker',
            label: 'map.legend.spotWreckMooring',
            icon: 'shipwreck-buoy',
          },
          {
            type: 'marker',
            label: 'map.legend.spotWreckContributed',
            icon: 'shipwreck-user',
          },
          {
            type: 'marker',
            label: 'map.legend.partner',
            icon: 'structure',
          },
        ],
      ],
    }
  },
  methods: {
    getSvgPathOptions: getSvgPathOptions,
  },
}
</script>
