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
            {{ $t('stats.registrations.line1') }}
            <br>
            {{ $t('stats.registrations.line2') }}
          </div>
        </div>
        <div>{{ $t('stats.registrationsIncluding', {diverCount: stats?.plongeurCount ?? '-'}) }}</div>
      </div>
      <div>
        <div class="flex gap-2 items-end">
          <div class="text-6xl tracking-tightest font-['sans']">
            {{ stats?.signatureCount ?? '-' }}
          </div>
          <div class="text-2xl leading-7 font-medium">
            {{ $t('stats.permits.line1') }}
            <br>
            {{ $t('stats.permits.line2') }}
          </div>
        </div>
        <div>
          {{ $t('stats.permitsIncluding', {diverCount: stats?.signaturePlongeurCount ?? '-', organisationCount:stats?.signatureStructureCount ?? '-' }) }}
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
