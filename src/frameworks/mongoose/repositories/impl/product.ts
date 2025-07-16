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

  async findAll(page, limit) {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      ProductModel.find().skip(skip).limit(limit).populate("category"),
      ProductModel.countDocuments(),
    ]);
    const data = docs.map((doc) => mapToProduct(doc));
    if (page > Math.ceil(total / limit)) {
      throw new Error("Page does not exist");
    }
    return {
      data,
      page: page,
      total: total,
      totalPages: limit <= 0 ? 1 : Math.ceil(total / limit),
      resultCount: data.length,
    };
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Product not found");
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  },

  async findProductsByCategory(categoryId, page, limit) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return {
        data: [],
        page: 0,
        total: 0,
        totalPages: 0,
        resultCount: 0,
      };
    }
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      ProductModel.find({ category: categoryId })
        .skip(skip)
        .limit(limit)
        .populate("category"),
      ProductModel.countDocuments({ category: categoryId }),
    ]);
    const data = docs.map((doc) => mapToProduct(doc));
    if (page > Math.ceil(total / limit)) {
      throw new Error("Page does not exist");
    }
    return {
      data,
      page: page,
      total: total,
      totalPages: limit <= 0 ? 1 : Math.ceil(total / limit),
      resultCount: data.length,
    };
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
