import { CategoryRepository } from "../../domain/repositories/category";
import { Category } from "../../domain/entities/category";
import { CreateCategoryInput } from "./types";

export async function createCategory(
  input: CreateCategoryInput,
  repo: CategoryRepository
): Promise<Category> {
  return await repo.create(input);
}
