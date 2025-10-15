<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import HeaderBar from '@/components/global/HeaderBar.vue'
import NextToGo from '@/components/NextToGo/NextToGo.vue'
</script>

<template>
  <div id="page" class="min-h-screen bg-navy-50 pb-6 text-navy-600 font-sans">
    <HeaderBar />

    <main id="main" class="p-2 sm:p-6 flex w-full flex-col items-center">
      <NextToGo />
    </main>
  </div>
</template>
