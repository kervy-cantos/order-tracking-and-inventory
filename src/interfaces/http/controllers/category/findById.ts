import { ControllerResponse } from "../../types/controller";
import { findCategoryById } from "../../../../usecases/category/findCategory";
import { categoryRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/category";

export async function findByIdController(
  id: string
): Promise<ControllerResponse> {
  try {
    const data = await findCategoryById(id, categoryRepositoryImpl);
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
        data: {
          data,
        },
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
