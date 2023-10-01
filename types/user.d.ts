import { Prisma } from "@prisma/client";

export type UserCreateInput = Prisma.UserCreateInput;
export type UserSelect = Prisma.UserSelect;
export interface RegisterDto extends Prisma.UserCreateInput {
  repeatPassword: string;
}

export type UserTransformer = Pick<
  UserSelect,
  "username" | "email" | "profileImage" | "name" | "id"
>;

export type UserLoginDto = Pick<UserCreateInput, "username" | "password">;
export type UserPayload = Prisma.UserGetPayload<Prisma.UserSelect>;
