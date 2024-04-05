<template>
  <div class="bg-capel-blue text-white py-2">
    <div class="container mx-auto flex justify-around">
      <div>
        <div class="flex gap-2 items-end">
          <div class="text-6xl tracking-tightest font-['sans']">
            {{ userCount }}
          </div>
          <div class="text-2xl leading-7 font-semibold">
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
          <div class="text-2xl leading-7 font-semibold">
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
  data() {
    return {
      stats: {} as Stats,
    }
  },
  computed: {
    userCount(): number | string {
      const count = this.stats?.plongeurCount + this.stats?.structureCount

      return isNaN(count) ? '-' : count
    },
  },
  mounted() {
    $fetch('/api/stats').then((result) => {
      this.stats = result
    })
  },
}
</script>
