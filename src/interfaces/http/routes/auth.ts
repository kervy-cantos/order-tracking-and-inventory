import { Request, Response, Router } from "express";
import { registerController } from "../controllers/auth/register";
import { loginController } from "../controllers/auth/login";
import { ControllerResponse } from "../types/controller";
import { LoginResponseData, RefreshTokenResponse } from "./types";
import { refreshController } from "../controllers/auth/refreshToken";
import { meController } from "../controllers/auth/meController";
export function authRouter() {
  const router = Router();

  router.post("/register", async (req, res) => {
    const result = await registerController(req.body);
    res.status(result.status).json(result.body);
  });

  router.post("/login", async (req, res) => {
    try {
      const result = (await loginController(
        req.body
      )) as ControllerResponse<LoginResponseData>;

      if (result.status === 200 && result.body?.data) {
        const { token, refreshToken, user } = result.body.data;
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
          message: result.body.message,
          user,
        });
      }

      return res.status(result.status).json(result.body);
    } catch (err) {
      console.error("Login route error:", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  });

  router.post("/refresh", async (req: Request, res: Response) => {
    const refreshToken = await req.cookies?.refresh_token;

    const result = (await refreshController(
      refreshToken
    )) as ControllerResponse<RefreshTokenResponse>;
    if (result.status === 200 && result.body?.data) {
      const { token, refreshToken: newRefreshToken } = result.body.data;

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(result.status).json({ message: result.body.message });
    }

    return res.status(result.status).json({ message: result.body.message });
  });

  router.get("/me", async (req: Request, res: Response) => {
    const result = await meController(req.cookies?.access_token);
    return res.status(result.status).json(result.body);
  });

  router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  });

  return router;
}
