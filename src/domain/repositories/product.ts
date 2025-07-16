import { Product } from "../entities/product";

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findProductsByCategory(
    categoryId: string,
    page: number,
    limit: number
  ): Promise<{
    data: Product[];
    total: number;
    totalPages: number;
    resultCount: number;
    page: number;
  }>;
  findAll(
    page: number,
    limit: number
  ): Promise<{
    data: Product[];
    total: number;
    totalPages: number;
    resultCount: number;
    page: number;
  }>;
  create(
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product>;
  findAll(
    page: number,
    limit: number
  ): Promise<{
    data: Product[];
    total: number;
    totalPages: number;
    resultCount: number;
    page: number;
  }>;
  update(id: string, data: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<boolean>;
}
