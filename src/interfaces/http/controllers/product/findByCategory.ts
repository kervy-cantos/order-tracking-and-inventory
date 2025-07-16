import { ControllerResponse } from "../../types/controller";
import { findProductsByCategory } from "../../../../usecases/product/findProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function findProductsByCategoryController(
  id: string,
  page: number,
  limit: number
): Promise<ControllerResponse> {
  try {
    const data = await findProductsByCategory(
      id,
      page,
      limit,
      productRepositoryImpl
    );
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
