import { ControllerResponse } from "../../types/controller";
import { findAllProducts } from "../../../../usecases/product/findProduct";
import { productRepositoryImpl } from "../../../../frameworks/mongoose/repositories/impl/product";

export async function findAllProductsController(): Promise<ControllerResponse> {
  try {
    const data = await findAllProducts(productRepositoryImpl);
    return {
      status: 200,
      body: {
        message: "Products fetched successfully",
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
