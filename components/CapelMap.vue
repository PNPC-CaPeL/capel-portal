<template>
  <div
    v-for="item in data"
    :key="item.code"
  >
    {{ item.name }}
  </div>
</template>

<script setup>
const lckClient = useNuxtApp().$lckClient

// const data = []

const data = await lckClient.query(
  'e6ef266a-3d25-4740-b3da-9a13eb51f97c', //spot
  {
    $limit: 5,
    // '$sort[ref(data:d69a598d-88bb-40d6-92e4-4e5b05f41dde)]': -1,
  },
)
</script>
