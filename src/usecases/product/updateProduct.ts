import { UpdateProductInput } from "./types";
import { ProductRepository } from "../../domain/repositories/product";
import { Product } from "../../domain/entities/product";

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
  repo: ProductRepository
): Promise<Product> {
  return await repo.update(id, input);
}
