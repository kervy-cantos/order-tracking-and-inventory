import { CategoryRepository } from "../../domain/repositories/category";
import { Category } from "../../domain/entities/category";

export async function findCategoryById(
  id: string,
  repo: CategoryRepository
): Promise<Category | null> {
  return await repo.findById(id);
}

export async function findAllCategories(
  repo: CategoryRepository
): Promise<Category[]> {
  return await repo.findAll();
}
