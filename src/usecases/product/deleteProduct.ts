import { ProductRepository } from "../../domain/repositories/product";

export async function deleteProduct(
  id: string,
  repo: ProductRepository
): Promise<boolean> {
  return await repo.delete(id);
}
