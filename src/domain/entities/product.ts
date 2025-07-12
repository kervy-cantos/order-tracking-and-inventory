export interface Product {
  id: string;
  name: string;
  brand?: string;
  description?: string;
  packaging?: string;
  quantityPerPkg?: number;
  pricePerPkg?: number;
  stock?: number;
  categoryId: string;
  categoryName?: string;
  expirationDate?: NativeDate;
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
}
