import { Category } from "../entities/category";

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  create(
    data: Omit<Category, "id" | "createdAt" | "updatedAt">
  ): Promise<Category>;
  findAll(
    page: number,
    limit: number
  ): Promise<{
    data: Category[];
    total: number;
    totalPages: number;
    resultCount: number;
    page: number;
  }>;
  update(id: string, data: Partial<Category>): Promise<Category>;
  delete(id: string): Promise<boolean>;
}
