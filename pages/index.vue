<template>
  <main class="container mx-auto my-8 text-base">
    <div class="content">
      <ContentRenderer :value="data">
        <ContentRendererMarkdown :value="data" />
      </ContentRenderer>
    </div>
    <h2 class="-mb-8 uppercase text-4xl font-semibold text-capel-blue">
      {{ $t('ourDivingAreas') }}
    </h2>
    <CapelMap />
    <CapelPageGrid />
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const file = `${locale.value}/index.md`
const { data } = await useAsyncData(file, () =>
  queryContent().where({ _file: file }).findOne(),
)
</script>
