// src/models/brand.model.ts
import { Schema, model, Document } from "mongoose";

export interface IBrand extends Document {
  logoUrl: string;
  brandName?: string;
}

const BrandSchema = new Schema<IBrand>({
  logoUrl: { type: String, required: true },
  brandName: { type: String },
});

const Brand = model<IBrand>("Brand", BrandSchema);
export default Brand;
