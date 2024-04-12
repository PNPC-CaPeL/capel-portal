<template>
  <div>
    <div
      v-if="data?.image"
      class="w-full h-[200px] md:h-[350px] lg:h-[450px]"
    >
      <NuxtImg
        :src="data?.image"
        class="w-full h-full object-cover"
        format="webp"
      />
    </div>
    <main class="content container mx-auto mt-8 text-base text-black">
      <ContentRenderer
        v-if="data"
        :value="data"
      >
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

useHead({
  title: data.value?.title ?? 'Capel',
})

const components = {
  carte: CapelMap,
}
</script>
