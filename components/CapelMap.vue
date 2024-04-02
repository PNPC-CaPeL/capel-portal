<template>
  <div class="my-6">
    <div class="h-[300px] bg-white w-screen absolute left-0">
      <ClientOnly>
        <InnerMap />
      </ClientOnly>
    </div>
    <div class="h-[300px]" />
    <CapelMapLegend />
  </div>
</template>
