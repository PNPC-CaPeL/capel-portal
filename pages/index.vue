<template>
  <main class="content">
    <div class="container mx-auto my-8 text-base">
      <ContentRenderer :value="data">
        <ContentRendererMarkdown :value="data" />
      </ContentRenderer>
    </div>
    <h2
      class="container mx-auto -mb-4 uppercase text-4xl font-semibold text-capel-blue"
    >
      {{ $t('ourDivingAreas') }}
    </h2>
    <CapelMap />
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const file = `${locale.value}/index.md`
const { data } = await useAsyncData(file, () =>
  queryContent().where({ _file: file }).findOne(),
)
</script>
