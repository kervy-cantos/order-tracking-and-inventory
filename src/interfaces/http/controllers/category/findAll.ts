import { ControllerResponse } from "../../types/controller";
import { findAllCategories } from "../../../../usecases/category/findCategory";
import { categoryRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/category";

export async function findAllController(
  page: number,
  limit: number
): Promise<ControllerResponse> {
  try {
    const result = await findAllCategories(page, limit, categoryRepositoryImpl);

    return {
      status: 200,
      body: {
        message: "Categories fetched successfully",
        data: result.data,
        total: result.total,
        totalPages: result.totalPages,
        resultCount: result.resultCount,
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
