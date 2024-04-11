<template>
  <div
    class="flex flex-col justify-center items-end p-1 bg-capel-blue-500/60 md:bg-transparent"
  >
    <ul class="list-none flex flex-wrap md:justify-end text-capel-blue-200">
      <li
        v-for="item in locales"
        :key="item.code"
        class="p-1"
      >
        <NuxtLink
          :to="switchLocalePath(item.code)"
          class="hover:text-white"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
    <ul class="list-none flex flex-wrap justify-end text-capel-blue-200">
      <li
        v-for="link of localizedNavigation"
        :key="link._path"
        class="px-2 py-0"
      >
        <NuxtLink
          :to="link._path.replace('/fr', '')"
          class="font-bold hover:text-white"
        >
          {{ link.menu_title ?? link.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  async setup() {
    const { locales, locale } = useI18n()
    const switchLocalePath = useSwitchLocalePath()
    const { data: navigation } = await useAsyncData(`navigation`, () =>
      fetchContentNavigation(),
    )

    return {
      locales,
      locale,
      switchLocalePath,
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
