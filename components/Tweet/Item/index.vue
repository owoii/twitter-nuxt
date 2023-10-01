<template>
	<div>
		<TweetItemHeader :tweet="props.tweet" />
		<div :class="tweetBodyWrapper">
			<p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white" :class="textSize">
				{{ props.tweet.text }}
			</p>
			<div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 mr-2 border rounded-2xl"
				:class="twitterBorderColor">
				<img :src="image.url" alt="" class="w-full rounded-2xl" />
			</div>
			<div class="mt-2" v-if="!props.hiddenAction">
				<TweetItemActions :tweet="tweet" :compact="props.compact" @on-comment-click="handleCommentClick" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { twitterBorderColor } = useTailwindiConfig()

interface Props {
	tweet: any,
	compact?: boolean,
	hiddenAction?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	compact: false,
	hiddenAction: false
})
const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2 mt-4')
const textSize = computed(() => props.compact ? "text-base" : 'text-2xl')

const emitter = useEmitter()

const handleCommentClick = () => {
	emitter.$emit('replyTweet', props.tweet)
}
</script>