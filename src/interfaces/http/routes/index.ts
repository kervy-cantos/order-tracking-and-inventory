import { Express } from "express";
import { rootRouter } from "./root";
import { authRouter } from "./auth";
import categoryRouter from "./category";
import productRouter from "./product";
import { authMiddleware } from "../middlewares";

export function registerRoutes(app: Express) {
  app.use("/api", rootRouter());
  app.use("/api/auth", authRouter());
  app.use("/api/categories", authMiddleware.requireAuth, categoryRouter());
  app.use("/api/product", authMiddleware.requireAuth, productRouter());
}
