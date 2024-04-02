<template>
  <div>
    <div class="w-full h-[415px]">
      <img
        class="w-full h-full object-cover"
        :src="data?.image"
      />
    </div>
    <main class="content container mx-auto my-8 text-base text-black">
      <ContentRenderer :value="data">
        <h1 class="font-bold text-5xl mt-8 mb-4">
          {{ data.title }}
        </h1>
        <ContentRendererMarkdown
          :value="data"
          :components="components"
        />
      </ContentRenderer>
    </main>
  </div>
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
