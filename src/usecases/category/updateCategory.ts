import { CategoryRepository } from "../../domain/repositories/category";
import { Category } from "../../domain/entities/category";
import { UpdateCategoryInput } from "./types";

export async function updateCategory(
  id: string,
  input: UpdateCategoryInput,
  repo: CategoryRepository
): Promise<Category> {
  return await repo.update(id, input);
}
