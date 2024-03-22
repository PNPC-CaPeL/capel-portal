<template>
  <main>
    <ContentDoc :path="path" />
  </main>
</template>
<script setup lang="ts">
  const route = useRoute()
  const { locale } = useI18n();
  const path = `/blog/${locale.value}/${route.params.slug}`;
</script>
