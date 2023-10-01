<template>
	<div>
		<TweetItem :tweet="props.tweet" />
		<TweetForm :user="props.user" placeholder="输入你的回复" :reply-to="props.tweet" @on-success="handleFormSuccess" />
		<TweetListFeed :tweets="replies" />
	</div>
</template>

<script setup lang="ts">
import { UserPayload } from "~/types/user";

interface Prop {
	tweet: unknown
	user: Required<UserPayload>
}

const replies = computed(() => props.tweet?.replies || [])
const props = defineProps<Prop>()

const handleFormSuccess = (tweet) => {
	console.log(tweet)
	navigateTo({
		path: `/status/${tweet.id}`
	})
}
</script>