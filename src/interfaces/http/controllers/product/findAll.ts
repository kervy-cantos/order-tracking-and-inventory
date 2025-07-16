import { ControllerResponse } from "../../types/controller";
import { findAllProducts } from "../../../../usecases/product/findProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function findAllProductsController(
  page: number,
  limit: number
): Promise<ControllerResponse> {
  try {
    const data = await findAllProducts(page, limit, productRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Products fetched successfully",
        data: data.data,
        total: data.total,
        totalPages: data.totalPages,
        resultCount: data.resultCount,
        limit,
        page,
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
