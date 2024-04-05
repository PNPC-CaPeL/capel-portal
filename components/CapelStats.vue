<template>
  <div class="bg-capel-blue text-white py-2">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-around items-center gap-2"
    >
      <div>
        <div class="flex gap-2 items-end">
          <div class="text-6xl tracking-tightest font-['sans']">
            {{ userCount }}
          </div>
          <div class="text-2xl leading-7 font-medium">
            inscriptions<br />
            au carnet de plongée
          </div>
        </div>
        <div>dont {{ stats?.plongeurCount ?? '-' }} plongeurs individuels</div>
      </div>
      <div>
        <div class="flex gap-2 items-end">
          <div class="text-6xl tracking-tightest font-['sans']">
            {{ stats?.signatureCount ?? '-' }}
          </div>
          <div class="text-2xl leading-7 font-medium">
            autorisations
            <br />
            délivrées
          </div>
        </div>
        <div>
          dont {{ stats?.signaturePlongeurCount ?? '-' }} plongeurs individuels
          et {{ stats?.signatureStructureCount ?? '-' }} structures
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Stats } from '~/server/api/stats'

export default {
  async setup() {
    const { data: stats } = await useFetch<Stats>('/api/stats')

    return { stats }
  },
  computed: {
    userCount(): number | string {
      const count = this.stats?.plongeurCount + this.stats?.structureCount

      return isNaN(count) ? '-' : count
    },
  },
}
</script>
