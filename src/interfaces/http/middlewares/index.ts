import { JwtTokenService } from "../../../frameworks/jwt";
import { requireAuth } from "./requireAuth";

export const authMiddleware = {
  requireAuth: requireAuth(JwtTokenService),
};
