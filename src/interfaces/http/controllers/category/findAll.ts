import { ControllerResponse } from "../../types/controller";
import { findAllCategories } from "../../../../usecases/category/findCategory";
import { categoryRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/category";

export async function findAllController(): Promise<ControllerResponse> {
  try {
    const data = await findAllCategories(categoryRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Categories fetched successfully",
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
