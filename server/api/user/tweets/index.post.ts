
import formidable, { type Fields, Files } from "formidable";
import { log } from "util";
import { createMediaFile } from "~/server/db/mediaFiles";
import { createTweets } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const form = formidable({});
  const response = (await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  })) as { fields: Fields<string>; files: Files<string> } | any;

  if (!("fields" in response) || !("files" in response)) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "出错了,请填入内容!",
      })
    );
  }
 
  const { fields, files } = response;

  const userId = event.context?.auth?.user.id;

  const tweetData = {
    text: fields.text.toString(),
    authorId: userId,
    replyToId: null
  };

  const replyTo = fields.replyTo
  if (replyTo.length > 0 && replyTo && replyTo != null && replyTo[0] != 'undefined') {
    tweetData.replyToId = replyTo.toString()
  }

  const tweet = await createTweets(tweetData);
  
  //TODO 为推文附加上媒体文件
  const filePromises = Object.keys(files).map(async key => {
    const file = files[key][0]
    const cloudinaryResource = await uploadToCloudinary(file.filepath) as { secure_url: string, public_id: string }

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id
    })
  })

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet),
  };
});
