import { Prisma } from '@prisma/client'
import { Transformer } from '../utils/transformer'
import { mediaFileTransformer } from './mediaFile'
import { userTransformer } from './user'
import human from 'human-time'
import humanToZh from './humanToZh'

type TweetPayload = Prisma.TweetCreateInput
type TweetSelect = Prisma.TweetSelect
type TweetTransformer = Pick<TweetSelect, 'id' | 'text'>
export const tweetTransformerSelect: TweetTransformer = {
  id: true,
  text: true,
}

export const tweetTransformer = (rawData: TweetPayload) =>
  Transformer<TweetTransformer>(rawData, tweetTransformerSelect)

export const tweetResultTransformer = (tweet: any) => {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: !!tweet.mediaFiles
      ? tweet.mediaFiles.map(mediaFileTransformer)
      : [],
    author: !!tweet.author ? userTransformer(tweet.author) : null,
    replies: !!tweet.replies ? tweet.replies.map(tweetResultTransformer) : [],
    replyTo: tweet.replyTo ? tweetResultTransformer(tweet.replyTo) : null,
    repliesCount: !!tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: humanToZh(human(tweet.createdAt)),
  }
}
