import express, { Express } from "express";
import cors from "cors";
import { registerRoutes } from "../../interfaces/http/routes";
import cookieParser from "cookie-parser";

export function createServer(dependencies: any): Express {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((o) =>
    o.trim()
  ) || [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ];

  const app = express();

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.warn(`Blocked CORS request from: ${origin}`);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  registerRoutes(app);

  return app;
}
