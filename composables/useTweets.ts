interface TwitterInputData {
	text: string
	mediaFiles: Array<File | null>
	replyTo: string
}

export default () => {

	const usePostTweetModal = () => useState('post_tweet_modal', () => false)
	const useReplyTweet = () => useState<any>('reply_tweet', () => null)
	const closePostTweetModal = () => {
		const postTweetModal = usePostTweetModal()
		postTweetModal.value = false
	}

	const setReplyTweet = (tweet: any) => {
		const replyTweet = useReplyTweet()
		replyTweet.value = tweet
	}

	const openPostTweetModal = (tweet: any = null) => {
		const postTweetModal = usePostTweetModal()
		postTweetModal.value = true
		setReplyTweet(tweet)
	}

	const postTweet = (formData: TwitterInputData) => {
		const form = new FormData()
		form.append('text', formData.text)	
		form.append('replyTo', formData.replyTo)
		formData.mediaFiles.forEach((mediaFile, index) => {
			if (mediaFile == null) return
			form.append('media_file_' + index, mediaFile)
		})
		return useFetchApi("/api/user/tweets", {
			method: "POST",
			body: form
		})
	} 


	const getTweets = (params: { query?: string } = {}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi('/api/tweets', {
					method: 'GET',
					params
				})
				resolve(response)
			} catch (error) {
				reject(error)
			}
		})
	}

	const getTweetById = (tweetId: string) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi(`/api/tweets/${tweetId}`, {
					method: 'GET',

				})
				resolve(response)
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		postTweet,
		getTweets,
		getTweetById,
		closePostTweetModal,
		usePostTweetModal,
		openPostTweetModal,
		useReplyTweet
	}
}