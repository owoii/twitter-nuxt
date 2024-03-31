import { userTransformer } from "~/server/transformers/user";
import { UserTransformer } from "#/user";

// 之类如何扩展 event 的类型,让我能够从event 中拿到 context.auth
export default defineEventHandler(async (event) => {
  return {
    user: userTransformer(event.context.auth?.user) as UserTransformer,
  };
});
