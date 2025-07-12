export interface CreateProductInput {
  name: string;
  brand?: string;
  description?: string;
  packaging?: string;
  quantityPerPkg?: number;
  pricePerPkg?: number;
  stock?: number;
  categoryId: string;
  expirationDate?: NativeDate;
}

export interface UpdateProductInput {
  name?: string;
  brand?: string;
  description?: string;
  packaging?: string;
  quantityPerPkg?: number;
  pricePerPkg?: number;
  stock?: number;
  categoryId?: string;
  expirationDate?: NativeDate;
}
