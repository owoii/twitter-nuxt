<template>
	<div class="flex flex-row items-center justify-center p-2  mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
		:class="defaultTransition" @click="emits('onLogout')">
		<div class="flex flex-row">
			<img :src="props.user.profileImage" class="w-10 h-10 rounded-full">
			<div class="flex-col hidden ml-2 xl:flex">
				<h1 class="text-sm font-bold text-gray-800 dark:text-white">{{ props.user.name }}</h1>
				<p class="text-sm text-gray-400">{{ props.user.handle }}</p>
			</div>
		</div>
		<!-- ICON -->
		<div class="hidden ml-auto xl:block">
			<div class="w-6 h-6">
				<ChevronDownIcon />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { defaultTransition } = useTailwindiConfig()
import { ChevronDownIcon } from '@heroicons/vue/outline'
interface Props {
	user?: any
}
const props = withDefaults(defineProps<Props>(), {
	user: null
})

const emits = defineEmits(["onLogout"])
</script>