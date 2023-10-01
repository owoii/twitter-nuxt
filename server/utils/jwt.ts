import jwt from "jsonwebtoken";
import { type UserPayload } from "~/types/user";
import type { EventHandlerRequest, H3Event } from "h3";
import { RefreshTokenJWTPayload } from "~/types/refreshToken";

const generateAccessToken = (user: UserPayload) => {
  const config = useRuntimeConfig();
  const payload: Partial<RefreshTokenJWTPayload> = {
    userId: user.id,
  };
  return jwt.sign(payload, config.jwtAccessSecret, {
    expiresIn: config.tokenRefreshTime,
  });
};

const generateRefreshToken = (user: UserPayload) => {
  const config = useRuntimeConfig();

  const payload: Partial<RefreshTokenJWTPayload> = {
    userId: user.id,
  };

  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.tokenRefreshTime,
  });
};

export const generateTokens = (user: UserPayload) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const decodeRefreshToken = (token: string) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as RefreshTokenJWTPayload;
  } catch (error) {
    return null;
  }
};

export const decodeAccessToken = (token: string) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtAccessSecret) as RefreshTokenJWTPayload;
  } catch (error) {
    return null;
  }
};

export const sendRefreshToken = (
  event: H3Event<EventHandlerRequest>,
  token: string | null
) => {
  setCookie(event, "refresh_token", token, {
    httpOnly: true,
    sameSite: true,
  });
};
