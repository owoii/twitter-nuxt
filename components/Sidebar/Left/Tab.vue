<template>
  <NuxtLink
    to="#"
    class="flex w-min xl:w-full text-black items-center p-3 hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="w-6 h-6 text-dark" :class="defaultTransition">
      <slot name="icon" />
    </div>

    <div class="lg:ml-4 text-xl hidden xl:block" :class="testClasses">
      <slot name="name"></slot>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
const { defaultTransition } = useTailwindiConfig()
type Props = {
  active?: boolean
}
const props = defineProps<Props>()
const testClasses = computed(() =>
  props.active ? 'font-semibold' : 'font-normal'
)
</script>
