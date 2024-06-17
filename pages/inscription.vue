<template>
  <main
    class="container mx-auto py-12 flex gap-12 flex-col md:flex-row justify-around items-start"
  >
    <div class="w-full md:w-2/3 content">
      <ContentRenderer
        v-if="data"
        :value="data"
      >
        <h1 class="font-bold text-5xl mt-8 mb-4">
          {{ data?.title }}
        </h1>
        <ContentRendererMarkdown :value="data" />
      </ContentRenderer>
    </div>
    <div class="w-full md:w-1/3 flex flex-col items-center p-4">
      <CapelInscriptionForm />
    </div>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const file = `${locale.value}/inscription.md`
const { data } = await useAsyncData(file, () =>
  queryContent().where({ _file: file }).findOne(),
)
</script>
