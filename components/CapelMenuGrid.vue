<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-10">
    <li
      v-for="item of localizedNavigation"
      :key="item.id"
    >
      <NuxtLink
        :to="item._path.replace('/fr', '')"
        class="flex flex-col items-center"
      >
        <div class="max-w-[80vw] max-h-[290px] md:h-[290px] overflow-hidden">
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
    const { data: navigation } = await useAsyncData(`navigation`, () =>
      fetchContentNavigation(),
    )

    return {
      locale,
      navigation,
    }
  },
  computed: {
    localizedNavigation(): any | null {
      const parentNavItem = this.navigation?.filter(
        (item) => item._path === `/${this.locale}`,
      )

      if (parentNavItem && parentNavItem.length && parentNavItem[0].children) {
        return parentNavItem[0].children.sort((a, b) => a.weight - b.weight)
      }

      return null
    },
  },
}
</script>
