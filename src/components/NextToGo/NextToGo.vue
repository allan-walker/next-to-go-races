<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Panel from '@/components/global/Panel.vue'
import RaceCategoryToggle from './RaceCategoryToggle.vue'
import RaceList from './RaceList.vue'
import { useRacesStore } from '@/stores/races.store'

// Configurable while providing sensible defaults
const props = withDefaults(
  defineProps<{
    pollMs?: number
    tickMs?: number
  }>(),
  {
    pollMs: 15000,
    tickMs: 1000,
  },
)

const store = useRacesStore()
let pollId: number
let tickId: number

onMounted(async () => {
  await store.refresh()

  // Poll the API every 15s to refresh race data
  pollId = window.setInterval(() => store.refresh(), 15000)

  // Update countdown timers every second
  tickId = window.setInterval(() => store.tick(), 1000)
})
onUnmounted(() => {
  // Stop timers when component unmounts
  clearInterval(pollId)
  clearInterval(tickId)
})
</script>

<template>
  <Panel title="Next to Go Races" :divider="true">
    <template #actions>
      <RaceCategoryToggle />
    </template>

    <template #panelBody>
      <RaceList />
    </template>
  </Panel>
</template>
