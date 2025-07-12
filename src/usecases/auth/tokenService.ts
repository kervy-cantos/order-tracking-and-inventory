import { AuthTokenPayload } from "../../types/tokenPayload";

export interface TokenService {
  generateToken(payload: AuthTokenPayload): string;
  generateRefreshToken(payload: AuthTokenPayload): string;
  verifyToken(token: string): AuthTokenPayload;
  verifyRefreshToken(refreshToken: string): AuthTokenPayload;
}
