<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRacesStore } from '@/stores/races.store'

const props = defineProps<{ meetingName: string; raceNumber: number; startSeconds: number }>()
const store = useRacesStore()
</script>

<template>
  <li class="flex items-center justify-between rounded border p-3 shadow-sm">
    <div>
      <p class="font-medium">{{ meetingName }}</p>
      <p class="text-sm text-gray-500">Race {{ raceNumber }}</p>
    </div>
    <time class="tabular-nums text-lg font-semibold" aria-live="polite">
      <!-- @TODO: countdown to go here -->
    </time>
  </li>
</template>
