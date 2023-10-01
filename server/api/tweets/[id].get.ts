import { getTweetById } from "~/server/db/tweets"
import { tweetResultTransformer } from "~/server/transformers/tweet"

export default defineEventHandler(async (event) => {

	const { id } = getRouterParams(event) as { id: string }
	const tweet = await getTweetById(id, {
		include: {
			author: true,
			mediaFiles: true,
			replyTo: {
				include: {
					author: true
				}
			},
			replies: {
				include: {
					mediaFiles:true,
					author: true,
					replyTo: {
						include: {
							author: true,
						}
					}
				}
			}
		},
	})
	return {
		tweet: tweetResultTransformer(tweet)
	}
})