import { getUserByUsername } from "~/server/db/user";
import { compare } from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { Prisma } from "@prisma/client";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {

  const body = await readBody<Prisma.UserCreateInput>(event);
  const { username, password } = body;

  if (!username || !password) {
    const error = createError({
      statusCode: 400,
      statusMessage: "请检查账户和密码填写是否完整",
    });

    return sendError(event, error);

  }

  // 检查用户是否已经注册
  const user = await getUserByUsername(username);

  if (!user) {
    const error = createError({
      statusCode: 400,
      statusMessage: "用户不存在,请去注册用户",
    });

    return sendError(event, error);
  }

  //检查用户密码是否和数据库中一致
  const doesThePasswordMatch = await compare(password, user.password);

  if (!doesThePasswordMatch) {
    const error = createError({
      statusCode: 400, 
      statusMessage: "用户名或密码错误,请检查输入",
    });
    return sendError(event, error);
  }
  //生成 Token
  const { accessToken, refreshToken } = generateTokens(user);
  // 保存token
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // 为用户添加刷新token
  sendRefreshToken(event, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: userTransformer(user),
  };
});
