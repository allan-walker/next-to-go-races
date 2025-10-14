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
</script>

<template>
  <section :class="panelClasses" role="region">
    <header v-if="title || $slots.actions" :class="headerClasses">
      <component
        :is="headingTag"
        v-if="title"
        class="text-xl font-semibold tracking-wide uppercase text-navy-600"
      >
        {{ title }}
      </component>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </header>

    <div>
      <slot name="panelBody" />
    </div>
  </section>
</template>
