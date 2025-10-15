<script setup lang="ts">
import { useRacesStore } from '@/stores/races.store'
import { RACE_CATEGORIES } from '@/types/neds'
const store = useRacesStore()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="(label, id) in RACE_CATEGORIES"
      :key="id"
      @click="store.toggleCategory(id)"
      class="px-3 py-1 rounded-full border text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer focus-ring"
      :class="
        store.enabledCategories.has(id)
          ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-[#3d4348]'
          : 'bg-neutral-50 border-navy-300 text-navy-600 hover:bg-navy-100'
      "
    >
      {{ label }}
    </button>
  </div>
</template>
