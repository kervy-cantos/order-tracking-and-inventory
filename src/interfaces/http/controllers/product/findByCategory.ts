import { ControllerResponse } from "../../types/controller";
import { findProductsByCategory } from "../../../../usecases/product/findProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function findProductsByCategoryController(
  id: string
): Promise<ControllerResponse> {
  try {
    const data = await findProductsByCategory(id, productRepositoryImpl);
    if (!data) {
      return {
        status: 400,
        body: {
          message: "Category not found",
          error: true,
        },
      };
    }
    return {
      status: 200,
      body: {
        message: "Fetched successfully",
        data,
      },
    };
  } catch (error) {
    return {
      status: 400,
      body: {
        message: error instanceof Error ? error.message : "Unknown error",
        error: true,
      },
    };
  }
}
