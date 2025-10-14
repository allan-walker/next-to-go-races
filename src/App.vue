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
  <div class="min-h-screen bg-navy-50 text-navy-600 font-sans p-6">
    <header>
      <h1 class="text-xl font-semibold tracking-wide uppercase">Neds Racing</h1>
    </header>

    <main>
      <section class="">
        <div class="flex items-center justify-between">
          <h2 class="text-l font-semibold tracking-wide uppercase">Next to Go Racing</h2>
          <CategoryToggle class="mt-3" />
        </div>
        <RaceList />
      </section>
    </main>
  </div>
</template>
