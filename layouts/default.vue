<template>
  <div>
    <header class="">
      <div
        class="min-h-28 container mx-auto py-4 gap-4 flex flex-col lg:flex-row justify-between items-center"
      >
        <NuxtLink
          :to="localePath('/')"
          :title="$t('getBackHome')"
          class="h-28"
        >
          <img
            class="h-full"
            src="/logo.svg"
          />
        </NuxtLink>
        <CapelMenu />
      </div>
    </header>
    <slot />
    <CapelFooter />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style scoped>
main {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
}

header {
  background-image: url('/home-banner.jpg');
  background-position: center;
  background-size: cover;
}
</style>
