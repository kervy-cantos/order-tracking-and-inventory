import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares";

export default function testRoute() {
  const router = Router();

  router.get(
    "/testlog",
    authMiddleware.requireAuth,
    (req: Request, res: Response) => {
      res.json({
        message: "You are authenticated",
      });
    }
  );
  return router;
}
