import { Request, Response, Router } from "express";
import { findAllProductsController } from "../controllers/product/findAll";
import { findProductsByIdController } from "../controllers/product/findById";
import { findProductsByCategoryController } from "../controllers/product/findByCategory";
import { createProductController } from "../controllers/product/create";
import { updateProductsController } from "../controllers/product/update";
import { deleteProductController } from "../controllers/product/delete";

export default function productRouter() {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const response = await findAllProductsController(page, limit);
    res.status(response.status).json(response.body);
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await findProductsByIdController(id);
    res.status(response.status).json(response.body);
  });

  router.get("/category/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const response = await findProductsByCategoryController(id, page, limit);
    res.status(response.status).json(response.body);
  });

  router.post("/", async (req: Request, res: Response) => {
    const response = await createProductController(req.body);
    res.status(response.status).json(response.body);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await updateProductsController(id, req.body);
    res.status(response.status).json(response.body);
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await deleteProductController(id);
    res.status(response.status).json(response.body);
  });
  return router;
}
