<template>
  <div>
    <header class="">
      <div
        class="min-h-28 lg:container mx-auto flex flex-wrap gap-4 justify-center lg:justify-between items-center"
      >
        <CapelMenu class="w-full md:w-fit md:p-0 md:order-last" />
        <a
          title="Le Parc national de Port-Cros"
          href="https://www.portcros-parcnational.fr"
          target="_blank"
          class="mt-4"
        >
          <img
            src="/pnpc-white.png"
            class="w-auto max-h-24"
          />
        </a>
      </div>
      <div
        class="container mx-auto py-12 flex gap-12 flex-col md:flex-row justify-around items-center"
      >
        <div class="mt-4 w-full md:w-2/3 flex flex-col items-center">
          <h1 class="sr-only">
            CaPel, Carnet de Plongée en Ligne, Parc National de Port-Cros
          </h1>
          <img
            class="h-full mx-auto"
            src="/logo.svg"
          />
          <ul
            class="mt-4 flex justify-center flex-wrap items-center w-full xl:w-1/2 gap-6"
          >
            <li
              v-for="partenaire of partenaireList"
              :key="partenaire.libelle"
            >
              <a
                :title="partenaire.libelle"
                :href="partenaire.lien"
                target="_blank"
              >
                <img
                  :src="partenaire.img"
                  :class="['w-auto', partenaire.height]"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="md:w-3/5 flex flex-col md:flex-row items-center rounded bg-white/60">
          <div class="flex flex-col py-8 md:py-16 px-4 md:w-1/2">
            <NuxtLink
              :to="localePath('/inscription')"
              class="px-4 py-2 drop-shadow rounded text-center tracking-widest font-medium text-white bg-capel-blue hover:bg-capel-blue-800"
            >
              {{ $t('home.signUp') }}
            </NuxtLink>
            <div class="w-full">
              <hr class="m-6 border border-capel-blue" />
            </div>
            <a
              href="https://app-capel.portcros-parcnational.fr"
              class="px-4 py-2 drop-shadow rounded text-center tracking-widest font-medium text-white bg-capel-red hover:bg-capel-red-800"
              tabindex="0"
              role="button"
              aria-disabled="false"
            >
              {{ $t('home.declareDive') }}
            </a>
          </div>
          <div class="flex flex-col items-center justify-center py-8 md:py-16 px-4 md:w-1/2">
            <a
              title="Application CaPeL"
              href="https://app-capel.portcros-parcnational.fr"
              target="_blank"
              class="m-4 text-center"
            >
              <img
                src="/logo-app.png"
                class="w-auto max-h-24 text-center"
              />
            </a>
            <a
              href="https://app-capel.portcros-parcnational.fr"
              target="_blank"
              class="px-4 py-2 drop-shadow rounded text-center tracking-widest font-medium text-white bg-capel-blue hover:bg-capel-blue-800"
            >
              {{ $t('home.goToApp') }}
            </a>
          </div>
        </div>
      </div>
    </header>
    <slot />
    <CapelFooter />
  </div>
</template>

<script setup lang="ts">
const partenaireList = [
  {
    libelle: 'Life Marha',
    img: '/marha.png',
    lien: 'https://www.life-marha.fr/',
    height: 'max-h-12',
  },
  {
    libelle: 'Life',
    img: '/life.png',
    lien: 'http://www.natura2000.fr/life/fran%C3%A7ais',
    height: 'max-h-14',
  },
  {
    libelle: 'natura2000',
    img: '/natura2000.png',
    lien: 'https://www.natura2000.fr/life/fran%C3%A7ais',
    height: 'max-h-14',
  },
]
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
