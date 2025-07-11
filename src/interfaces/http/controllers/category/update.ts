import { ControllerResponse } from "../../types/controller";
import { categoryRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/category";
import { UpdateRequestDto } from "../../dto/category/categoryDto";
import { updateCategory } from "../../../../usecases/category/updateCategory";

export async function updateCategoryController(
  id: string,
  body: UpdateRequestDto
): Promise<ControllerResponse> {
  try {
    const data = await updateCategory(id, body, categoryRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Category updated successfully",
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
