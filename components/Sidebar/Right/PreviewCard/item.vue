<template>
  <div
    class="p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300 border-b dark:text-white"
    :class="[defaultTransition, twitterBorderColor]"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const { defaultTransition, twitterBorderColor } = useTailwindiConfig();
</script>
