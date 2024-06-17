<template>
  <div>
    <header class="">
      <div
        class="min-h-28 lg:container mx-auto gap-4 flex flex-col lg:flex-row justify-between items-center"
      >
        <NuxtLink
          :to="localePath('/')"
          :title="$t('getBackHome')"
          class="h-28 py-4"
        >
          <span class="sr-only">
            CaPel, Carnet de Plongée en Ligne, Parc National de Port-Cros
          </span>
          <img
            class="h-full"
            src="/logo.svg"
          />
        </NuxtLink>
        <CapelMenu class="w-full" />
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
