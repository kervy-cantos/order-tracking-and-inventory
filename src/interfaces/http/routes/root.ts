import { Router } from "express";

export function rootRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });
  return router;
}
