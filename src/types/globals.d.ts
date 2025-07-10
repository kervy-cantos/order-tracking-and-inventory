import { JwtPayload } from "../frameworks/jwt/types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
