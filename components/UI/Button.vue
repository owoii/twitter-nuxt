<template>
	<button
		class="flex justify-center items-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed"
		:disabled="props.disabled" :class="classes" @click="handleClick">
		<span :class="textFontSize">
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
interface Prop {
	disabled?: boolean
	size?: "sm" | "md" | "lg",
	liquid?: boolean
}
const props = withDefaults(defineProps<Prop>(), {
	disabled: false,
	size: "md",
	liquid: false
})

const paddingClasses = computed(() => {
	switch (props.size) {
		case "sm":
			return 'px-3 py-2'
		case "lg":
			return "px-4 py-3"
		default:
			return "py-3 px-3"
	}
})

const textFontSize = computed(() => {
	switch (props.size) {
		case "lg":
			return 'text-md'
		default:
			return "text-sm"
	}
})

const defaultWidth = computed(() => {
	switch (props.size) {
		default:
			return "w-min"
	}
})

const classes = computed(() => `${paddingClasses.value} ${props.liquid ? 'w-full' : defaultWidth}`)

const emits = defineEmits(["onClick"])

const handleClick = (event: MouseEvent) => {
	emits("onClick", event)
}
</script>