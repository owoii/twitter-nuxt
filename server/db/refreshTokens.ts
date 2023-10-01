import { RefreshTokenUncheckedCreateInput } from "~/types/refreshToken";
import prisma from ".";

export const createRefreshToken = (
  refreshToken: RefreshTokenUncheckedCreateInput
) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  });
};

export const getRefreshTokenByToken = (refreshToken: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });
};

export const removeRefreshToken = (refreshToken: string) => {
  return prisma.refreshToken.delete({
    where: {
      token: refreshToken
    }
  })
}
