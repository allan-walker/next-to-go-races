<script setup lang="ts">
import BrandWordmark from '@/assets/brand-wordmark-onbrand.svg'
</script>

<template>
  <header class="bg-brand text-white flex items-center justify-start px-6 py-3 shadow-soft">
    <img :src="BrandWordmark" alt="Brand logo" class="h-6 md:h-8" />
  </header>
</template>
