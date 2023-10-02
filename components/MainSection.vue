<template>
  <div :class="twitterBorderColor" class="border-x min-h-screen">
    <div class="sticky flex items-center top-0 px-4 bg-white/80 backdrop-blur-md p-3 dark:bg-dim-900/80">
      <div v-if="isShowBack"
      @click="handlerBack"
        class="w-10 h-10  hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-800  bg-opacity-20 p-1 flex items-center justify-center dark:text-white mr-4 rounded-full"
        :class="defaultTransition">
        <ChevronLeftIcon />
      </div>
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
const { twitterBorderColor, defaultTransition } = useTailwindiConfig();
import { ChevronLeftIcon } from '@heroicons/vue/outline'
type Props = {
  title: string;
  loading: boolean;
};
const props = defineProps<Props>();

const isShowBack = computed(() => {
  return useRoute().path != '/'
})
const handlerBack = () => {
  useRouter().back()
}
</script>
