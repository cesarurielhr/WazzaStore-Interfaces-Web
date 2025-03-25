// src/brandSeed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "./models/brand.model";

dotenv.config();

const seedBrand = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await Brand.deleteMany({});
    console.log("Colección Brand limpia");

    const data = {
      logoUrl: "https://i.imgur.com/FPIeQbo.png",
      brandName: ""
    };

    const inserted = await Brand.create(data);
    console.log("Brand sembrado:", inserted);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedBrand();
