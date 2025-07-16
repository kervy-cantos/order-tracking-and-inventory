import { CategoryRepository } from "../../domain/repositories/category";
import { Category } from "../../domain/entities/category";

export async function findCategoryById(
  id: string,
  repo: CategoryRepository
): Promise<Category | null> {
  return await repo.findById(id);
}

export async function findAllCategories(
  page: number,
  limit: number,
  repo: CategoryRepository
): Promise<{
  data: Category[];
  total: number;
  totalPages: number;
  resultCount: number;
  page: number;
}> {
  return await repo.findAll(page, limit);
}
