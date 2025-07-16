import { Category } from "../../../../src/domain/entities/category";
import { CategoryRepository } from "../../../../src/domain/repositories/category";
import { createCategory } from "../../../../src/usecases/category/createCategory";
import { deleteCategory } from "../../../../src/usecases/category/deleteCategory";
import { updateCategory } from "../../../../src/usecases/category/updateCategory";
import {
  findAllCategories,
  findCategoryById,
} from "../../../../src/usecases/category/findCategory";

describe("Category Usecases", () => {
  const categoryRepo: jest.Mocked<CategoryRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockCategory: Category = {
    id: "cat123",
    name: "Electronics",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a category", async () => {
    categoryRepo.create.mockResolvedValue(mockCategory);

    const result = await createCategory({ name: "Electronics" }, categoryRepo);

    expect(categoryRepo.create).toHaveBeenCalledWith({ name: "Electronics" });
    expect(result).toEqual(mockCategory);
  });

  it("should return category by id", async () => {
    categoryRepo.findById.mockResolvedValue(mockCategory);

    const result = await findCategoryById("cat123", categoryRepo);

    expect(categoryRepo.findById).toHaveBeenCalledWith("cat123");
    expect(result).toEqual(mockCategory);
  });

  it("should return null if category is not found", async () => {
    categoryRepo.findById.mockResolvedValue(null);

    const result = await findCategoryById("unknown-id", categoryRepo);

    expect(result).toBeNull();
  });
  it("should update a category", async () => {
    const id = "cat123";
    const updateData = { name: "Updated Name" };
    const updatedCategory: Category = { id, ...updateData };

    categoryRepo.update.mockResolvedValue(updatedCategory);

    const result = await updateCategory(id, updateData, categoryRepo);

    expect(categoryRepo.update).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual(updatedCategory);
  });

  it("should delete a category", async () => {
    categoryRepo.delete.mockResolvedValue(true);

    const result = await deleteCategory("cat123", categoryRepo);

    expect(categoryRepo.delete).toHaveBeenCalledWith("cat123");
    expect(result).toBe(true);
  });

  it("should return false if category delete fails", async () => {
    categoryRepo.delete.mockResolvedValue(false);

    const result = await deleteCategory("cat123", categoryRepo);

    expect(result).toBe(false);
  });
  it("should return a paginated list of categories (0 or more)", async () => {
    const testPage = 2;
    const testLimit = 10;
    const mockCategories = [
      {
        id: "cat1",
        name: "Books",
        description: "All kinds of books",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cat2",
        name: "Groceries",
        description: "Daily essentials",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockPaginatedResponse = {
      data: mockCategories,
      total: 25,
      totalPages: 3,
      resultCount: mockCategories.length,
      limit: testLimit,
      page: testPage,
    };

    categoryRepo.findAll.mockResolvedValue(mockPaginatedResponse);

    const result = await findAllCategories(testPage, testLimit, categoryRepo);

    expect(categoryRepo.findAll).toHaveBeenCalledWith(testPage, testLimit);
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toEqual(mockCategories);
    expect(result.resultCount).toBeGreaterThanOrEqual(0);
    expect(result.total).toBe(mockPaginatedResponse.total);
    expect(result.totalPages).toBe(mockPaginatedResponse.totalPages);
  });
  it("should return an empty list if no categories exist", async () => {
    const testPage = 1;
    const testLimit = 10;

    const mockEmptyResponse = {
      data: [],
      page: 0,
      total: 0,
      totalPages: 0,
      resultCount: 0,
    };

    categoryRepo.findAll.mockResolvedValue(mockEmptyResponse);

    const result = await findAllCategories(testPage, testLimit, categoryRepo);

    expect(categoryRepo.findAll).toHaveBeenCalledWith(testPage, testLimit);
    expect(result.data).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(0);
    expect(result.resultCount).toBe(0);
  });
});
