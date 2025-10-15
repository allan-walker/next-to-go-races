<script setup lang="ts">
import { computed } from 'vue'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const props = withDefaults(
  defineProps<{
    title?: string
    headingTag?: HeadingTag
    padded?: boolean // inner padding
    elevated?: boolean // shadow
    ring?: boolean // outer ring/border
    rounded?: boolean // rounded corners
    divider?: boolean // divider under header
  }>(),
  {
    headingTag: 'h2',
    padded: true,
    elevated: true,
    ring: true,
    rounded: true,
    divider: false,
  },
)

// let parent override defaults via props
const panelClasses = computed(() => [
  'bg-neutral-50 max-w-[800px] w-full',
  props.rounded && 'rounded-xl2',
  props.elevated && 'shadow-soft',
  props.ring && 'ring-1 ring-navy-400',
])

const bodyClasses = computed(() => [props.padded && 'p-4 sm:p-6'])

const headerClasses = computed(() => [
  'flex items-center justify-between flex-col sm:flex-row gap-2',
  props.padded ? 'px-4 pt-4 sm:pt-6 sm:px-6' : '',
  props.divider ? 'pb-4 border-b border-navy-300' : 'pb-3',
])

const contentClasses = computed(() => [
  props.padded ? 'px-4 pb-4 pt-1 sm:px-6 sm:pb-6 sm:pt-2' : '',
])
</script>

<template>
  <section :class="panelClasses" role="region">
    <header v-if="title || $slots.actions" :class="headerClasses">
      <component
        :is="headingTag"
        v-if="title"
        class="text-2xl font-semibold tracking-wide uppercase text-navy-600"
      >
        {{ title }}
      </component>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </header>

    <div :class="[bodyClasses, !title && !$slots.actions ? '' : contentClasses]">
      <slot name="panelBody" />
    </div>
  </section>
</template>
