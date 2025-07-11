import { ControllerResponse } from "../../types/controller";
import { categoryRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/category";
import { deleteCategory } from "../../../../usecases/category/deleteCategory";

export async function deleteCategoryController(
  id: string
): Promise<ControllerResponse> {
  try {
    const data = await deleteCategory(id, categoryRepositoryImpl);
    if (!data) {
      return {
        status: 400,
        body: {
          message: "Cannot delete category",
          error: true,
        },
      };
    }
    return {
      status: 200,
      body: {
        message: "Deleted successfully",
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
