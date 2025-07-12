export interface CreateProductRequestDto {
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
export interface UpdateProductRequestDto {
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

export interface ProductResponseDto {
  id: string;
  name: string;
  brand: string;
  packaging: string;
  description?: string;
  quantityPerPkg: number;
  pricePerPkg: number;
  stock: number;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
  };
}
