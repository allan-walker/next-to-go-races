<script setup lang="ts">
import { onMounted } from 'vue'

import RaceList from '@/components/RaceList.vue'
import { useRacesStore } from '@/stores/races.store'

const store = useRacesStore()

onMounted(async () => {
  await store.refresh()
})
</script>

<template>
  <header>
    <h1 class="text-4xl font-semibold text-white">Next to Go</h1>
  </header>

  <main>
    <RaceList />
  </main>
</template>
