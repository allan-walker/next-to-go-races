<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import HeaderBar from '@/components/HeaderBar.vue'
import CategoryToggle from '@/components/CategoryToggle.vue'
import RaceList from '@/components/RaceList.vue'
import Panel from '@/components/Panel.vue'
import { useRacesStore } from '@/stores/races.store'

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
  <div class="min-h-screen bg-navy-50 pb-6 text-navy-600 font-sans">
    <HeaderBar />

    <main class="p-2 sm:p-6 flex w-full flex-col items-center">
      <Panel title="Next to Go Races" :divider="true">
        <template #actions>
          <CategoryToggle />
        </template>
        <template #panelBody>
          <RaceList />
        </template>
      </Panel>
    </main>
  </div>
</template>
