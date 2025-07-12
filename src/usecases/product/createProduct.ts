import { CreateProductInput } from "./types";
import { ProductRepository } from "../../domain/repositories/product";
import { Product } from "../../domain/entities/product";

export async function createProduct(
  input: CreateProductInput,
  repo: ProductRepository
): Promise<Product> {
  return await repo.create(input);
}
