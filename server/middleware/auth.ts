import UrlPattern from "url-pattern";
import { getUserById } from "~/server/db/user";
import { decodeAccessToken } from "~/server/utils/jwt";

// 为用户在 content 添加 auth
export default defineEventHandler(async (event) => {
  // 需要添加中间件的路径
  const endpoints = ["/api/auth/user", "/api/user/tweets", "/api/tweets", "/api/tweets/:id"];


  // 匹配当前用户访问的路径是否在给定的规则里
  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(getRequestURL(event).pathname);
  });
  // 如果用户访问的路径在规则中不存在,直接返回
  if (!isHandledByThisMiddleware) {
    return;
  }
  

  const token = getRequestHeader(event, "authorization")?.split(" ")[1];

  if (!token) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Token 无效",
      })
    );
  }
  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Token 无效",
      })
    );
  }

  try {
    const { userId } = decoded;
    const user = await getUserById(userId);
    event.context.auth = { user };
  } catch (err) {}
});
