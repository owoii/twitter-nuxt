<template>
  <div>
    <label v-if="props.label" class="block pl-3 ml-px text-sm font-medium text-gray-700 dark:text-white">{{ props.label }}</label>
    <div class="mt-1">
      <input @input="change" :value="props.modelValue"
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="props.placeholder" :type="props.type" />
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
});

const emit = defineEmits(["update:modelValue"]);
const change = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
