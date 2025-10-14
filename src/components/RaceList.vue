<script setup lang="ts">
import { useRacesStore } from '@/stores/races.store'
import RaceCard from './RaceCard.vue'

const store = useRacesStore()
</script>

<template>
  <ul class="mt-4 grid gap-3">
    <RaceCard
      v-for="r in store.visibleFive"
      :key="r.race_id"
      :meeting-name="r.meeting_name"
      :race-number="r.race_number"
      :start-seconds="r.advertised_start.seconds"
    />
    <li v-if="!store.visibleFive.length" class="text-gray-500">
      No upcoming races for selected categories.
    </li>
  </ul>
</template>
