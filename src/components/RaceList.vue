<script setup lang="ts">
import { useRacesStore } from '@/stores/races.store'

const store = useRacesStore()
</script>

<template>
  <ul class="mt-4 grid gap-3">
    <!-- @TODO: Display this only when there are no results -->
    <li class="text-gray-500">No upcoming races for selected categories.</li>
  </ul>
</template>
