import { ProductRepository } from "../../domain/repositories/product";
import { Product } from "../../domain/entities/product";

export async function findProductById(
  id: string,
  repo: ProductRepository
): Promise<Product | null> {
  return await repo.findById(id);
}

export async function findAllProducts(
  repo: ProductRepository
): Promise<Product[]> {
  return await repo.findAll();
}
export async function findProductsByCategory(
  categoryId: string,
  repo: ProductRepository
): Promise<Product[]> {
  return await repo.findProductsByCategory(categoryId);
}
