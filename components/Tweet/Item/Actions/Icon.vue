<template>
	<div @click.stop.prevent="emits('onClick')" class="flex items-center justify-center text-gray-400 cursor-pointer group">
		<div
			:class="`p-2 rounded-full ${defaultTransition} group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20`">
			<slot name="icon" :classes="`w-${props.size} h-${props.size}`" />
		</div>
		<span :class="`ml-1 group-hover:text-${props.color}-400`">
			<slot />
		</span>
	</div>
</template>
<script lang="ts" setup>

const { defaultTransition } = useTailwindiConfig()
interface Prop {
	color?: "red" | "blue" | "green" | "yellow"
	size?: number
}
const props = withDefaults(defineProps<Prop>(), {
	color: 'blue',
	size: 5
})

const emits = defineEmits(['onClick'])
</script>