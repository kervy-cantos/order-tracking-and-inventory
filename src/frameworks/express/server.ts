import express, { Express } from "express";
import { registerRoutes } from "../../interfaces/http/routes";

export function createServer(dependencies: any): Express {
  const app = express();

  app.use(express.json());

  registerRoutes(app, dependencies);
  return app;
}
