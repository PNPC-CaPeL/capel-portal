<template>
  <div class="my-6">
    <div class="h-screen/2 bg-white w-screen absolute left-0">
      <ClientOnly>
        <InnerMap />
      </ClientOnly>
    </div>
    <div class="h-screen/2" />
    <CapelMapLegend />
  </div>
</template>
