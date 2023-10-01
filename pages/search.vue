<template>
	<MainSection title="Home" :loading="loading">
		<TweetListFeed :tweets="searchTweets" />
	</MainSection>
</template>
<script setup lang="ts">

useHead({
	title: "Twitter / Search"
})

const loading = ref(false);
const { twitterBorderColor } = useTailwindiConfig()
const { getTweets } = useTweets()
const searchTweets = ref<unknown[]>([])


const searchQuery = useRoute().query.q

onBeforeMount(() => {
	getSearchTweets()

})

const getSearchTweets = async () => {
	loading.value = true
	try {
		const { tweets } = await getTweets({
			query: searchQuery
		}) as { tweets: unknown[] }
		searchTweets.value = tweets
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}

watch(() => useRoute().fullPath, () => {
	getSearchTweets()
})


</script>
