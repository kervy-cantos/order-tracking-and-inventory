import { ControllerResponse } from "../../types/controller";
import { CreateProductRequestDto } from "../../dto/product/productDto";
import { createProduct } from "../../../../usecases/product/createProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function createProductController(
  body: CreateProductRequestDto
): Promise<ControllerResponse> {
  try {
    const data = await createProduct(body, productRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Product added successfully",
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
