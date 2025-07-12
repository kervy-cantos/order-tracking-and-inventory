import { ControllerResponse } from "../../types/controller";
import { UpdateProductRequestDto } from "../../dto/product/productDto";
import { updateProduct } from "../../../../usecases/product/updateProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function updateProductsController(
  id: string,
  body: UpdateProductRequestDto
): Promise<ControllerResponse> {
  try {
    const data = await updateProduct(id, body, productRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Product updated successfully",
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
