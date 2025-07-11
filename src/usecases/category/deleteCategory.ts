import { CategoryRepository } from "../../domain/repositories/category";
import { Category } from "../../domain/entities/category";

export async function deleteCategory(
  id: string,
  repo: CategoryRepository
): Promise<boolean> {
  return await repo.delete(id);
}
