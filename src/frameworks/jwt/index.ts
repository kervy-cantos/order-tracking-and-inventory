import jwt from "jsonwebtoken";
import { jwtSecret } from "./config";
import { AuthTokenPayload } from "../../types/tokenPayload";
import { TokenService } from "../../usecases/auth/tokenService";

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 24; // 1 day
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7; // 7 days

export const JwtTokenService: TokenService = {
  generateToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });
  },

  generateRefreshToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: REFRESH_TOKEN_EXPIRY });
  },

  verifyToken(token: string): AuthTokenPayload {
    try {
      return jwt.verify(token, jwtSecret) as AuthTokenPayload;
    } catch {
      throw new Error("Invalid or expired token");
    }
  },
  verifyRefreshToken(token: string): AuthTokenPayload {
    try {
      return jwt.verify(token, jwtSecret) as AuthTokenPayload;
    } catch {
      throw new Error("Invalid or expired refresh token");
    }
  },
};
