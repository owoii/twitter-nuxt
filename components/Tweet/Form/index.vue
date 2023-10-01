<template>
	<div>
		<div v-if="loading" class="flex items-center justify-center py-6">
			<UISpinner />
		</div>
		<div v-else>
			<TweetItem v-if="props.replyTo && props.showReply" :tweet="props.replyTo" hiddenAction />
			<TweetFormInput :user="props.user" @on-submit="handleFormSubmit" :placeholder='placeholder' />
		</div>

	</div>
</template>
<script setup lang="ts">

import { UserPayload } from "~/types/user";
import { TwitterInputData } from './Input.vue'
const { postTweet } = useTweets()
type Prop = {
	user: Required<UserPayload>
	placeholder?: string
	replyTo?: any
	showReply?: boolean
}
const props = withDefaults(defineProps<Prop>(), {
	showReply: false
})
const loading = ref(false)

const emits = defineEmits(['onSuccess'])

const handleFormSubmit = async (data: TwitterInputData) => {
	loading.value = true
	try {
		const response = await postTweet({
			text: data.text,
			mediaFiles: data.mediaFiles,
			replyTo: props.replyTo?.id as string
		}) as { tweet: any }
		emits('onSuccess', response.tweet)
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
</script>