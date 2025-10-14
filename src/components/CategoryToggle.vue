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
      class="px-3 py-1 rounded-full border transition cursor-pointer"
      :class="
        store.enabledCategories.has(id)
          ? 'bg-blue-50 border-blue-600 text-blue-700'
          : 'border-gray-300 text-gray-500'
      "
      @click="store.toggleCategory(id)"
    >
      {{ label }}
    </button>
  </div>
</template>
