import { Product } from "../entities/product";

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findProductsByCategory(categoryId: string): Promise<Product[]>;
  create(
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(id: string, data: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<boolean>;
}
