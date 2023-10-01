<template>
	<li class="inline-block mx-2">
		<a :href="props.url" class="hover:underline">{{ props.label }}</a>
	</li>
</template>

<script lang="ts" setup>
interface Prop {
	url?: string
	label?: string
}
const props = withDefaults(defineProps<Prop>(), {
	url: "#",
})

</script>