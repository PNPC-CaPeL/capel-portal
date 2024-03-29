<template>
  <main>
    <ContentRenderer :value="data">
      <h1>{{ data.title }}</h1>
      <ContentRendererMarkdown
        :value="data"
        :components="components"
      />
    </ContentRenderer>
  </main>
</template>

<script setup lang="ts">
import { CapelMap } from '#components'

const route = useRoute()
const { locale } = useI18n()

const file = `${locale.value}/${route.params.slug.join('/')}.md`
const { data } = await useAsyncData(file, () =>
  queryContent().where({ _file: file }).findOne(),
)

const components = {
  carte: CapelMap,
}
</script>
