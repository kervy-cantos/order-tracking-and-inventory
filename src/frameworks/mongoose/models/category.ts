import mongoose, { InferSchemaType } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model("Category", categorySchema);

export interface CategoryDoc extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
