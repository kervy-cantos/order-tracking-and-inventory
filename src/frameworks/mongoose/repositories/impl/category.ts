import mongoose from "mongoose";
import { CategoryRepository } from "../../../../domain/repositories/category";
import { CategoryModel } from "../../models/category";

export const categoryRepositoryImpl: CategoryRepository = {
  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const categoryDoc = await CategoryModel.findById(id);
    return categoryDoc
      ? {
          id: categoryDoc._id.toString(),
          name: categoryDoc.name,
          description: categoryDoc.description ?? undefined,
          createdAt: categoryDoc.createdAt,
          updatedAt: categoryDoc.updatedAt,
        }
      : null;
  },
  async create(category) {
    const created = await CategoryModel.create(category);
    return {
      id: created._id.toString(),
      name: created.name,
      description: created.description ?? undefined,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Category not found");
    const updated = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new Error("Category not found");

    return {
      id: updated._id.toString(),
      name: updated.name,
      description: updated.description ?? undefined,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  },

  async findAll() {
    const docs = await CategoryModel.find();

    return docs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description ?? undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Category not found");
    const result = await CategoryModel.findByIdAndDelete(id);
    return !!result;
  },
};
