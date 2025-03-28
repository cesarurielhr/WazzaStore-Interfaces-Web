// src/models/company.model.ts
import { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  imageUrl: string;
}

const CompanySchema = new Schema<ICompany>(
  {
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Company = model<ICompany>("Company", CompanySchema);
export default Company;
