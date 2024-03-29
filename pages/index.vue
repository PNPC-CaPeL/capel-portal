<template>
  <div>
    <ContentRenderer :value="data">
      <ContentRendererMarkdown :value="data" />
    </ContentRenderer>
    <h2 class="-mb-4">
      {{ $t('ourDivingAreas') }}
    </h2>
    <CapelMap />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const file = `${locale.value}/index.md`
const { data } = await useAsyncData(file, () =>
  queryContent().where({ _file: file }).findOne(),
)
</script>
