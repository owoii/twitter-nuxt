<template>
	<div>
		<div v-if="isEmptyArray" class="p-4">
			<p class="text-center text-gray-500">
				还没有人分享书籍📚
			</p>
		</div>
		<div v-else class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
			:class="twitterBorderColor, defaultTransition" v-for="tweet in props.tweets" :key="tweet.id"
			@click.native="redirect(tweet)">
			<TweetItem :tweet="tweet" compact />
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	tweets: any[]
}
const props = defineProps<Props>()
const { twitterBorderColor, defaultTransition } = useTailwindiConfig()
const isEmptyArray = computed(() => props.tweets.length === 0)

const redirect = (tweet) => {
	navigateTo(`/status/${tweet.id}`)
}
</script>