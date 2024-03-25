<template>
  <ul class="list-none flex gap-4 text-white">
    <li>
      <a>toto</a>
    </li>
    <li>
      <a>toto</a>
    </li>
    <li>
      <a>toto</a>
    </li>
    <li
      v-for="item in locales"
      :key="item.code"
    >
      <NuxtLink :to="switchLocalePath(item.code)">
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>
