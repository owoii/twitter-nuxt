<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Separator, type SeparatorProps } from 'radix-vue'
import { cn } from '~/utils'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'], label?: string }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator v-bind="delegatedProps" :class="cn(
    'shrink-0 relative inline-flex items-center gap-2',
    props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
    props.class,
  )
    ">
    <div class="w-full bg-border h-px" />
    <span v-if="props.label" :class="cn('text-sm text-muted-foreground')">{{ props.label }}</span>
    <div class="w-full bg-border h-px" />
  </Separator>
</template>
