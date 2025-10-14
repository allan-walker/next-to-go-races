<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import CategoryToggle from '@/components/CategoryToggle.vue'
import RaceList from '@/components/RaceList.vue'
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
  <div class="min-h-screen bg-gray-900 text-white font-sans p-6">
    <header>
      <h1 class="text-4xl font-semibold text-white">Next to Go</h1>
      <CategoryToggle class="mt-3" />
    </header>

    <main>
      <RaceList />
    </main>
  </div>
</template>
