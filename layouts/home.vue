<template>
  <div>
    <header class="">
      <div
        class="min-h-28 container mx-auto flex gap-4 flex-col xl:flex-row justify-between items-center"
      >
        <ul class="mt-4 flex justify-center items-center w-full xl:w-1/2 gap-6">
          <li
            v-for="partenaire of partenaireList"
            :key="partenaire.libelle"
          >
            <a
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
        <CapelMenu />
      </div>
      <div
        class="container mx-auto py-12 flex gap-12 flex-col md:flex-row justify-around items-center"
      >
        <div class="w-full md:w-2/3">
          <img
            class="h-full mx-auto"
            src="/logo.svg"
          />
        </div>
        <div
          class="w-fit md:w-1/3 flex flex-col items-center py-8 md:py-16 px-4 rounded bg-white/60"
        >
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
            href="https://backoffice.capel.portcros-parcnational.fr"
            class="px-4 py-2 drop-shadow rounded text-center tracking-widest font-medium text-white bg-capel-red hover:bg-capel-red-800"
            tabindex="0"
            role="button"
            aria-disabled="false"
          >
            {{ $t('home.declareDive') }}<br />
            {{ $t('home.signIn') }}
          </a>
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
    libelle: 'Le Parc national de Port-Cros',
    img: '/pnpc-white.png',
    lien: 'https://www.portcros-parcnational.fr',
    height: 'max-h-24',
  },
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
