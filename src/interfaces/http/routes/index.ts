import { Express } from "express";
import { rootRouter } from "./root";
import { authRouter } from "./auth";
import testRoute from "./testLog";
import categoryRouter from "./category";

export function registerRoutes(app: Express, dependencies: any) {
  app.use("/", rootRouter());
  app.use("/auth", authRouter());
  app.use("/", testRoute());
  app.use("/category", categoryRouter());
}
