import { createProduct } from "../../../../src/usecases/product/createProduct";
import {
  findAllProducts,
  findProductById,
  findProductsByCategory,
} from "../../../../src/usecases/product/findProduct";
import { deleteProduct } from "../../../../src/usecases/product/deleteProduct";
import { updateProduct } from "../../../../src/usecases/product/updateProduct";
import { ProductRepository } from "../../../../src/domain/repositories/product";
import { Product } from "../../../../src/domain/entities/product";

describe("productCrud", () => {
  const mockRepo: jest.Mocked<ProductRepository> = {
    findById: jest.fn(),
    findProductsByCategory: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const newProduct: Product = {
    id: "prod123",
    name: "Amoxicillin",
    brand: "BioPharma",
    packaging: "Box",
    description: "Antibiotic for infection",
    quantityPerPkg: 10,
    pricePerPkg: 200,
    stock: 50,
    categoryId: "cat123",
    expirationDate: new Date("2026-01-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const updated: Product = {
    id: "prod123",
    name: "Ibuprofen",
    brand: "MediCorp",
    packaging: "Blister",
    description: "Pain reliever",
    quantityPerPkg: 20,
    pricePerPkg: 150,
    stock: 40,
    categoryId: "cat123",
    expirationDate: new Date("2027-01-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new product", async () => {
    mockRepo.create.mockResolvedValue(newProduct);

    const result = await createProduct(
      {
        name: "Amoxicillin",
        brand: "BioPharma",
        packaging: "Box",
        description: "Antibiotic for infection",
        quantityPerPkg: 10,
        pricePerPkg: 200,
        stock: 50,
        categoryId: "cat123",
        expirationDate: new Date("2026-01-01"),
      },
      mockRepo
    );

    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Amoxicillin",
        categoryId: "cat123",
      })
    );
    expect(result).toEqual(newProduct);
  });
  it("should return all products", async () => {
    const testPage = 2;
    const testLimit = 10;

    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Paracetamol",
        brand: "BrandX",
        packaging: "Bottle",
        description: "Fever reducer",
        quantityPerPkg: 30,
        pricePerPkg: 120,
        stock: 100,
        categoryId: "cat1",
        expirationDate: new Date("2026-12-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const testPaginatedResponse = {
      data: mockProducts,
      total: 50,
      totalPages: Math.ceil(50 / testLimit),
      resultCount: mockProducts.length,
      limit: testLimit,
      page: testPage,
    };

    mockRepo.findAll.mockResolvedValue(testPaginatedResponse);

    const result = await findAllProducts(testPage, testLimit, mockRepo);
    expect(result).toEqual(testPaginatedResponse);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
  it("should return product when found", async () => {
    mockRepo.findById.mockResolvedValue(newProduct);

    const result = await findProductById("1", mockRepo);
    expect(result).toEqual(newProduct);
  });

  it("should return null when product is not found", async () => {
    mockRepo.findById.mockResolvedValue(null);

    const result = await findProductById("missing-id", mockRepo);
    expect(result).toBeNull();
  });
  it("should return products for a given category", async () => {
    const testPage = 2;
    const testLimit = 10;
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Amoxicillin",
        brand: "BioPharma",
        packaging: "Box",
        description: "Antibiotic",
        quantityPerPkg: 10,
        pricePerPkg: 300,
        stock: 20,
        categoryId: "cat123",
        expirationDate: new Date("2026-12-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const testPaginatedResponse = {
      data: mockProducts,
      total: 50,
      totalPages: Math.ceil(50 / testLimit),
      resultCount: mockProducts.length,
      limit: testLimit,
      page: testPage,
    };

    mockRepo.findProductsByCategory.mockResolvedValue(testPaginatedResponse);

    const result = await findProductsByCategory(
      "cat123",
      testPage,
      testLimit,
      mockRepo
    );

    expect(mockRepo.findProductsByCategory).toHaveBeenCalledWith(
      "cat123",
      testPage,
      testLimit
    );
    expect(result).toEqual(testPaginatedResponse);
  });
  it("should update a product and return it", async () => {
    mockRepo.update.mockResolvedValue(updated);

    const result = await updateProduct(
      "prod123",
      { name: "Ibuprofen" },
      mockRepo
    );

    expect(mockRepo.update).toHaveBeenCalledWith("prod123", {
      name: "Ibuprofen",
    });
    expect(result).toEqual(updated);
  });

  it("should delete a product and return true", async () => {
    mockRepo.delete.mockResolvedValue(true);

    const result = await deleteProduct("prod123", mockRepo);

    expect(mockRepo.delete).toHaveBeenCalledWith("prod123");
    expect(result).toBe(true);
  });

  it("should return false if product was not deleted", async () => {
    mockRepo.delete.mockResolvedValue(false);

    const result = await deleteProduct("nonexistent", mockRepo);

    expect(mockRepo.delete).toHaveBeenCalledWith("nonexistent");
    expect(result).toBe(false);
  });
});
