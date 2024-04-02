<template>
  <div class="container mx-auto mt-2 flex gap-4 justify-between">
    <ul
      v-for="(column, key) in legendData"
      :key="key"
      class="list-none flex flex-col gap-1"
    >
      <li
        v-for="item in column"
        :key="item.label"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()

const legendData = [
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
]
</script>
