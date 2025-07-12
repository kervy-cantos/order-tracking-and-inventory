import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares";
import { findAllController } from "../controllers/category/findAll";
import { findByIdController } from "../controllers/category/findById";
import { createCategoryController } from "../controllers/category/create";
import { updateCategoryController } from "../controllers/category/update";
import { deleteCategoryController } from "../controllers/category/delete";

export default function categoryRouter() {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    const response = await findAllController();
    res.status(response.status).json(response.body);
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const response = await findByIdController(req.params.id);
    res.status(response.status).json(response.body);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await updateCategoryController(id, req.body);
    res.status(response.status).json(response.body);
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await deleteCategoryController(id);
    res.status(response.status).json(response.body);
  });
  router.post(
    "/add",
    authMiddleware.requireAuth,
    async (req: Request, res: Response) => {
      const response = await createCategoryController(req.body);
      res.status(response.status).json(response.body);
    }
  );
  return router;
}
