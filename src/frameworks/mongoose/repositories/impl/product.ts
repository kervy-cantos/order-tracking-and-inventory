import mongoose from "mongoose";
import { ProductRepository } from "../../../../domain/repositories/product";
import { ProductDoc, ProductModel } from "../../models/product";
import { Product } from "../../../../domain/entities/product";
import { CategoryDoc } from "../../models/category";

export const productRepositoryImpl: ProductRepository = {
  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const productDoc = await ProductModel.findById(id).populate("category");
    if (!productDoc) return null;
    return mapToProduct(productDoc);
  },

  async create(product) {
    const { categoryId, ...rest } = product;

    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw new Error("No such category Exists");
    const created = await ProductModel.create({
      ...rest,
      category: categoryId,
    });
    await created.populate("category");
    return mapToProduct(created);
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Product not found");
    const updated = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("category");
    if (!updated) throw new Error("Category not found");

    return mapToProduct(updated);
  },

  async findAll() {
    const docs = await ProductModel.find().populate("category");
    return docs.map((doc) => mapToProduct(doc));
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Product not found");
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  },

  async findProductsByCategory(categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) return [];
    const products = await ProductModel.find({
      category: categoryId,
    }).populate("categories");
    return products.map((doc) => mapToProduct(doc));
  },
};
function mapToProduct(doc: any): Product {
  return {
    id: doc._id.toString(),
    name: doc.name ?? "",
    brand: doc.brand ?? "",
    packaging: doc.packaging ?? "",
    description: doc.description ?? "",
    quantityPerPkg: doc.quantityPerPkg ?? 0,
    pricePerPkg: doc.pricePerPkg ?? 0,
    stock: doc.stock ?? 0,
    categoryId: doc.category._id.toString(),
    categoryName: doc.category.name,
    expirationDate: doc.expirationDate!,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
