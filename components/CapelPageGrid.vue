<template>
  <ul class="grid grid-cols-3 gap-8 w-full mt-2">
    <li
      v-for="item of data"
      :key="item.id"
    >
      <NuxtLink
        :to="item._path.replace('/fr', '')"
        class="flex flex-col items-center"
      >
        <div class="h-[290px]">
          <img
            :src="item?.image"
            class="w-full h-full object-cover"
          />
        </div>
        <p class="text-xl m-6 uppercase text-center font-bold text-capel-blue">
          {{ item.title }}
        </p>
        <p
          v-if="item.description"
          class="text-center"
        >
          {{ item.description }}
        </p>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  async setup() {
    const { locale } = useI18n()
    const { data } = await useAsyncData(`${locale.value}/`, () =>
      queryContent(`${locale.value}/`).find(),
    )

    return {
      locale,
      data,
    }
  },
}
</script>
