import { getRefreshTokenByToken } from "~/server/db/refreshTokens";
import { getUserById } from "~/server/db/user";
import { decodeRefreshToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token");
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Token 已失效",
      })
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Token 已失效",
      })
    );
  }

  // 验证 token 是否可用
  const token = decodeRefreshToken(refreshToken);
  if (!token) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Token 已过期",
      })
    );
  }

  try {
    const user = await getUserById(token.userId);

    if (!user) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "用户不存在!",
        })
      );
    }
    const { accessToken } = generateTokens(user);
    return {
      access_token: accessToken,
    };
  } catch (err) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "服务器出现错误,请联系系统管理员",
      })
    );
  }
});
