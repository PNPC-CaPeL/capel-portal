<template>
  <ul class="list-none flex gap-4 text-capel-light-blue">
    <li
      v-for="link of localizedNavigation.children"
      :key="link._path"
    >
      <NuxtLink
        :to="link._path.replace('/fr', '')"
        class="font-bold hover:text-white"
      >
        {{ link.menuTitle ?? link.title }}
      </NuxtLink>
    </li>
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
      return (
        this.navigation?.filter(
          (item) => item._path === `/${this.locale}`,
        )[0] ?? null
      )
    },
  },
}
</script>
