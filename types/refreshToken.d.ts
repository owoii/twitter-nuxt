import { Prisma } from "@prisma/client";
import { type JwtPayload } from "jsonwebtoken";
export type RefreshTokenCreateInput = Prisma.RefreshTokenCreateInput;
export type RefreshTokenUncheckedCreateInput =
  Prisma.RefreshTokenUncheckedCreateInput;

export type RefreshPayload =
  Prisma.RefreshTokenGetPayload<Prisma.RefreshTokenSelect>;

//TODO:hello
export interface RefreshTokenJWTPayload extends JwtPayload {
  userId:string;
}
