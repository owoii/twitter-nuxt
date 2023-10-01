import { Prisma } from "@prisma/client"

import { getTweets } from "~/server/db/tweets"
import { tweetResultTransformer } from "~/server/transformers/tweet"

export default defineEventHandler(async (event) => {
	const { query } = getQuery(event) as { query: string }

	let prismaQuery: Prisma.TweetFindManyArgs = {
		include: {
			author: true,
			mediaFiles: true,
			replies: {
				include: {
					author: true,
				}
			},
			replyTo: {
				include: {
					author: true
				}
			}
		},
		orderBy: [{
			createdAt: 'desc'
		}]
	}

	if (!!query) {
		prismaQuery.where = {
			text: {
				contains: query
			}
		}
	} 

	const tweets = await getTweets(prismaQuery)
	return {
		tweets: tweets.map(tweetResultTransformer)
	}
})