import { Router } from "express";
import { registerController } from "../controllers/auth/register";
import { loginController } from "../controllers/auth/login";
export function authRouter() {
  const router = Router();

  router.post("/register", async (req, res) => {
    const result = await registerController(req.body);
    res.status(result.status).json(result.body);
  });
  router.post("/login", async (req, res) => {
    const result = await loginController(req.body);
    res.status(result.status).json(result.body);
  });

  return router;
}
