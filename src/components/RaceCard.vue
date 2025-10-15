<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRacesStore } from '@/stores/races.store'
import { formatCountdown } from '@/composables/useCountdown'
import { RACE_CATEGORIES } from '@/types/neds'

const props = defineProps<{
  meetingName: string
  raceNumber: number
  startSeconds: number
  categoryId: string
  status?: 'open' | 'starting' | 'closed'
}>()
const store = useRacesStore()
const { currentTime } = storeToRefs(store)
const secondsRemaining = computed(() => Math.floor(props.startSeconds - currentTime.value / 1000))

const countdown = computed(() => formatCountdown(currentTime.value, props.startSeconds))

// Determine text color based on race timing or status.
const countdownClass = computed(() => {
  if (props.status === 'starting' || props.status === 'closed') return 'text-red-500'
  if (secondsRemaining.value <= 60 && secondsRemaining.value > 0) return 'text-brand'
  return 'text-navy-600'
})

// Category label
const categoryLabel = computed(() => RACE_CATEGORIES[props.categoryId] ?? 'Unknown')
</script>

<template>
  <li class="flex items-center justify-between rounded-xl2 border p-3 shadow-sm">
    <div>
      <p class="font-medium text-navy-600">{{ meetingName }}</p>
      <p class="text-sm text-gray-500">{{ categoryLabel }} – Race {{ raceNumber }}</p>
    </div>
    <time
      class="tabular-nums text-lg font-semibold transition-colors duration-300"
      :class="countdownClass"
      aria-live="polite"
    >
      {{ countdown }}
    </time>
  </li>
</template>
