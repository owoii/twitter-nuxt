import { Prisma } from "@prisma/client";
import prisma from ".";
interface CreateTweetsInput {
  text: string;
  authorId: string;
}
export const createTweets = (tweetData: CreateTweetsInput) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};


export const getTweets = (param: Prisma.TweetFindManyArgs = {}) => {  
  return prisma.tweet.findMany({
    ...param
  })
}

export const getTweetById = (tweetId: string, params: Omit<Prisma.TweetFindUniqueArgs, "where">) => { 
  return prisma.tweet.findUnique({
    ...params,
    where: {
      ...params.where,
      id: tweetId
    },
  })
}