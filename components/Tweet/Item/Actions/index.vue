<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue" :size="size" @on-click="emits('onCommentClick')">
			<template #icon="{ classes }">
				<ChatIcon :class="classes" />
			</template>
			<template #default v-if="showStats">
				{{ props.tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="green" :size="size">
			<template #icon="{ classes }">
				<RefreshIcon :class="classes" />
			</template>
			<template #default v-if="showStats">
				{{ generateRandomNumbers() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="red" :size="size">
			<template #icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>
			<template #default v-if="showStats">
				{{ generateRandomNumbers() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue" :size="size">
			<template #icon="{ classes }">
				<UploadIcon :class="classes" />
			</template>
			<template #default v-if="showStats">
				{{ generateRandomNumbers() }}
			</template>
		</TweetItemActionsIcon>
	</div>
</template>
<script setup lang="ts">
import { ChatIcon, UploadIcon, HeartIcon, RefreshIcon } from '@heroicons/vue/outline'
interface Props {
	tweet: any
	compact?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	compact: false
})

const generateRandomNumbers = () => {
	return Math.floor(Math.random() * 1000)
}
const size = computed(() => props.compact ? 5 : 8)
const showStats = computed(() => props.compact)
const emits = defineEmits(['onCommentClick'])
</script>