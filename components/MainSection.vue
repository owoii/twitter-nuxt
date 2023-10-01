<template>
  <div :class="twitterBorderColor" class="border-x min-h-screen">
    <div class="sticky top-0 px-4 bg-white/80 backdrop-blur-md p-3 dark:bg-dim-900/80">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        {{ props.title }}
      </h2>
    </div>
    <div v-if="props.loading" class="flex items-center justify-center p-5 border-b" :class="twitterBorderColor">
      <UISpinner />
    </div>
    <div v-else class="dark:text-gray-200">
      <slot> </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const { twitterBorderColor } = useTailwindiConfig();
type Props = {
  title: string;
  loading: boolean;
};
const props = defineProps<Props>();
</script>
