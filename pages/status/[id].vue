<template>
	<MainSection title="Tweet" :loading="loading">
		<TweetDetails :tweet="tweet" :user="user" />
	</MainSection>
</template>
<script setup lang="ts">
useHead({
	title: "Twitter / Tweet"
})

const loading = ref(false);
const getTweetIdFromRoute = (): string => {
	const tweetId = useRoute().params.id
	if (!tweetId) {
		return ''
	}
	return tweetId as string
}
const { getTweetById } = useTweets()

const { useAuthUser } = useAuth()
const tweet = ref<unknown>(null)
const user = useAuthUser()

const getTweets = async () => {
	loading.value = true
	try {
		const response = await getTweetById(getTweetIdFromRoute()) as { tweet: unknown }
		tweet.value = response.tweet
	} catch (error) {
		console.log(error)

	} finally {
		loading.value = false
	}
}
watch(() => useRoute().fullPath, () => {
	getTweets()
})
onBeforeMount(() => {
	getTweets()
})
</script>