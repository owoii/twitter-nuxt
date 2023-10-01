import { createUser } from "~/server/db/user";
import { RegisterDto, UserCreateInput } from "~/types/user";

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterDto>(event);
  const { username, email, password, repeatPassword, name } = body;
  if (!username || !email || !password || !repeatPassword || !name) {
    const error = createError({
      statusCode: 400,
      statusMessage: "请检查参数是否正确",
    });
    sendError(event, error);
  }

  if (password !== repeatPassword) {
    const error = createError({
      statusCode: 400,
      statusMessage: "请检查密码和确认密码是否一致!",
    });
    sendError(event, error);
  }

  const userDate: UserCreateInput = {
    username,
    email,
    password,
    name,
    profileImage: "https://picsum.photos/200/200",
  };

  const user = await createUser(userDate);

  return {
    body: user,
  };
});
