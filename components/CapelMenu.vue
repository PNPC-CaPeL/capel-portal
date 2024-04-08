<template>
  <div class="flex flex-col justify-center md:items-end">
    <ul
      class="list-none flex flex-wrap lg:justify-end gap-4 text-capel-blue-200"
    >
      <li
        v-for="item in locales"
        :key="item.code"
      >
        <NuxtLink
          :to="switchLocalePath(item.code)"
          class="hover:text-white"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
    <ul
      class="list-none flex flex-wrap lg:justify-end gap-4 text-capel-blue-200"
    >
      <li
        v-for="link of localizedNavigation"
        :key="link._path"
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
