<template>
  <div class="mt-2 flex gap-12 justify-center text-sm font-normal">
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
          class="h-4 w-auto"
        />
        {{ item.label }}
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
            label: 'Plongée interdite',
            style: 'rouge',
          },
          {
            type: 'polygon',
            label: 'Plongée interdite du 1er avril au 30 septembre',
            style: 'rouge-pointille',
          },
          {
            type: 'polygon',
            label: 'Plongée interdite du 1er Avril au 30 octobre',
            style: 'orange-pointille',
          },
        ],
        [
          {
            type: 'polygon',
            label: 'Accostage, amarrage et débarquement interdits',
            style: 'rouge-contour',
          },
          {
            type: 'polygon',
            label: 'Mouillage interdit sauf sur dispositif de plongée',
            style: 'orange',
          },
          {
            type: 'polygon',
            label: 'Plongée soumise à autorisation',
            style: 'bleu',
          },
        ],
        [
          {
            type: 'marker',
            label: 'Spot (naturel)',
            icon: 'diving-mask',
          },
          {
            type: 'marker',
            label: 'Spot avec amarrage (naturel)',
            icon: 'diving-mask-buoy',
          },
          {
            type: 'marker',
            label: 'Spot contribué (naturel)',
            icon: 'diving-mask-user',
          },
          {
            type: 'marker',
            label: 'Spot (épave)',
            icon: 'shipwreck',
          },
          {
            type: 'marker',
            label: 'Spot avec amarrage (épave)',
            icon: 'shipwreck-buoy',
          },
          {
            type: 'marker',
            label: 'Spot contribué (épave)',
            icon: 'shipwreck-user',
          },
          {
            type: 'marker',
            label: 'Structure partenaire',
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
