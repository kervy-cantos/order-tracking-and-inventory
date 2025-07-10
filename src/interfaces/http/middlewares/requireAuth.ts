import { NextFunction, Request, Response } from "express";
import { TokenService } from "../../../usecases/auth/tokenService";

export function requireAuth(tokenService: TokenService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = tokenService.verifyToken(token);

      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}
