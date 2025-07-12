import { Express } from "express";
import { rootRouter } from "./root";
import { authRouter } from "./auth";
import testRoute from "./testLog";
import categoryRouter from "./category";
import productRouter from "./product";
import { authMiddleware } from "../middlewares";

export function registerRoutes(app: Express) {
  app.use("/", rootRouter());
  app.use("/auth", authRouter());
  app.use("/", testRoute());
  app.use("/categories", authMiddleware.requireAuth, categoryRouter());
  app.use("/product", authMiddleware.requireAuth, productRouter());
}
