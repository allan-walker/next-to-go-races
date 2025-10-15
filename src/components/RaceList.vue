<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRacesStore } from '@/stores/races.store'
import RaceCard from './RaceCard.vue'

const store = useRacesStore()
const { currentTime } = storeToRefs(store)

// Derive the display status from start time vs. now
function statusFor(startSeconds: number): 'open' | 'starting' | 'closed' {
  const diff = Math.floor(startSeconds - currentTime.value / 1000)
  if (diff <= -60) return 'closed'
  if (diff <= 0) return 'starting'
  return 'open'
}
</script>

<template>
  <ul class="mt-4 grid gap-3">
    <RaceCard
      v-for="r in store.visibleFive"
      :key="r.race_id"
      :meeting-name="r.meeting_name"
      :race-number="r.race_number"
      :start-seconds="r.advertised_start.seconds"
      :category-id="r.category_id"
      :status="statusFor(r.advertised_start.seconds)"
    />
    <li v-if="!store.visibleFive.length" class="text-gray-500">
      No upcoming races for selected categories.
    </li>
  </ul>
</template>
