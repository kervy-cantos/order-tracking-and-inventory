import { ControllerResponse } from "../../types/controller";
import { deleteProduct } from "../../../../usecases/product/deleteProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function deleteProductController(
  id: string
): Promise<ControllerResponse> {
  try {
    const data = await deleteProduct(id, productRepositoryImpl);
    if (!data) {
      return {
        status: 400,
        body: {
          message: "Cannot delete product",
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
