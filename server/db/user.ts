import prisma from ".";
import { type UserCreateInput } from "#/user";
import { userTransformerSelect } from "../transformers/user";
import { hashSync } from "bcrypt";

export const createUser = (userDate: UserCreateInput) => {
  const finalUserData: UserCreateInput = {
    ...userDate,
    password: hashSync(userDate.password, 10),
  };
  return prisma.user.create({
    data: finalUserData,
    select: userTransformerSelect,
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
