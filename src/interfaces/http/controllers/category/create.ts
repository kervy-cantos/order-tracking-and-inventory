import { ControllerResponse } from "../../types/controller";
import { categoryRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/category";
import { createCategory } from "../../../../usecases/category/createCategory";
import { CreateRequestDto } from "../../dto/category/categoryDto";

export async function createCategoryController(
  body: CreateRequestDto
): Promise<ControllerResponse> {
  try {
    const data = await createCategory(body, categoryRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Category added successfully",
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
