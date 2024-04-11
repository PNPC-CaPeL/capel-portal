<template>
  <div>
    <div class="container mx-auto mt-8">
      <main class="content">
        <ContentRenderer :value="data">
          <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
      </main>
    </div>
    <CapelStats />
    <h2
      class="container mx-auto mt-8 -mb-6 uppercase text-4xl font-semibold text-capel-blue"
    >
      {{ $t('ourDivingAreas') }}
    </h2>
    <CapelMap class="container mx-auto" />
    <CapelMenuGrid class="container mx-auto" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const { locale } = useI18n()

const file = `${locale.value}/index.md`
const { data } = await useAsyncData(file, () =>
  queryContent().where({ _file: file }).findOne(),
)
</script>
