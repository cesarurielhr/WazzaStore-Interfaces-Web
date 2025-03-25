// src/seedCompany.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "./models/company.model";

dotenv.config();

const seedCompany = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Conectado a MongoDB");

    // Limpia los registros existentes (opcional)
    await Company.deleteMany({});
    console.log("Colección Company limpia");

    const data = {
      imageUrl: "https://i.imgur.com/fIgkQzt.jpeg", // Reemplaza TU_ID_DEL_ARCHIVO por el ID correcto
      description: ""
    };

    const inserted = await Company.create(data);
    console.log("Company sembrado:", inserted);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error al sembrar la base de datos:", err);
    mongoose.connection.close();
  }
};

seedCompany();
