import { ProductRepository } from "../../domain/repositories/product";
import { Product } from "../../domain/entities/product";

export async function findProductById(
  id: string,
  repo: ProductRepository
): Promise<Product | null> {
  return await repo.findById(id);
}

export async function findAllProducts(
  page: number,
  limit: number,
  repo: ProductRepository
): Promise<{
  data: Product[];
  total: number;
  totalPages: number;
  resultCount: number;
  page: number;
}> {
  return await repo.findAll(page, limit);
}
export async function findProductsByCategory(
  categoryId: string,
  page: number,
  limit: number,
  repo: ProductRepository
): Promise<{
  data: Product[] | [];
  total: number;
  totalPages: number;
  resultCount: number;
  page: number;
}> {
  return await repo.findProductsByCategory(categoryId, page, limit);
}
