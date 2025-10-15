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
  if (props.status === 'starting' || props.status === 'closed') return 'text-gray-500'
  if (secondsRemaining.value <= 60 && secondsRemaining.value > 0) return 'text-brand'
  return 'text-navy-600'
})

// Dynamic card outline + opacity
const cardClass = computed(() => {
  if (props.status === 'starting' || props.status === 'closed') {
    return 'opacity-70 border-navy-200'
  }
  if (secondsRemaining.value <= 60 && secondsRemaining.value > 0) {
    return 'border-brand'
  }
  return 'border-navy-200'
})

// Screen-reader-friendly countdown for aria-label
const a11yCountdown = computed(() => {
  const s = Math.max(secondsRemaining.value, 0)
  const m = Math.floor(s / 60),
    r = s % 60
  const mp = m === 1 ? 'minute' : 'minutes'
  const sp = r === 1 ? 'second' : 'seconds'
  return m ? `${m} ${mp} ${r ? `${r} ${sp}` : ''}`.trim() : `${r} ${sp}`
})

// Category label
const categoryLabel = computed(() => RACE_CATEGORIES[props.categoryId] ?? 'Unknown')
</script>

<template>
  <li
    class="flex items-center justify-between rounded-xl2 border p-3 shadow-sm transition-all duration-300"
    :class="cardClass"
  >
    <div>
      <p class="font-medium text-navy-600">{{ meetingName }}</p>
      <p class="text-sm text-gray-500">{{ categoryLabel }} – Race {{ raceNumber }}</p>
    </div>
    <time
      class="tabular-nums text-lg font-semibold transition-colors duration-300"
      :class="countdownClass"
      :datetime="`PT${Math.max(secondsRemaining, 0)}S`"
      :aria-label="
        secondsRemaining > 0
          ? `Starts in ${a11yCountdown}`
          : status === 'starting'
            ? 'Starting now'
            : 'Closed'
      "
      aria-live="polite"
    >
      {{ countdown }}
    </time>

    <!-- A small assertive live region for status flips -->
    <p class="sr-only" aria-live="assertive" aria-atomic="true">
      {{ status === 'starting' ? 'Race starting' : status === 'closed' ? 'Race closed' : '' }}
    </p>
  </li>
</template>
