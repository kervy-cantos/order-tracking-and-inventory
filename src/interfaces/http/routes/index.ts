import { Express } from "express";
import { rootRouter } from "./root";
import { authRouter } from "./auth";
import testRoute from "./testLog";
import categoryRouter from "./category";
import { authMiddleware } from "../middlewares";

export function registerRoutes(app: Express, dependencies: any) {
  app.use("/", rootRouter());
  app.use("/auth", authRouter());
  app.use("/", testRoute());
  app.use("/category", authMiddleware.requireAuth, categoryRouter());
}
