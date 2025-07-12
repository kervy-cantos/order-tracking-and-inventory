import mongoose, { InferSchemaType } from "mongoose";
import { CategoryDoc } from "./category";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    brand: { type: String },
    packaging: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantityPerPkg: { type: Number },
    pricePerPkg: { type: Number },
    expirationDate: { type: Date },
    stock: { type: Number },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);

export interface ProductDoc extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  brand?: string;
  packaging?: string;
  description?: string;
  quantityPerPkg: number;
  pricePerPkg: number;
  stock: number;
  expirationDate: Date;
  category: CategoryDoc;
  createdAt: Date;
  updatedAt: Date;
}
