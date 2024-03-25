<template>
  <main>
    <header class="">
      <div
        class="h-28 container mx-auto flex justify-between items-center px-8"
      >
        <NuxtLink
          :to="localePath('/')"
          :title="$t('getBackHome')"
          class="h-full py-4"
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
  </main>
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
}
</style>
