// src/seedStoreLocation.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import StoreLocation from "./models/storeLocation.model";

dotenv.config();

const seedStoreLocation = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Conectado a MongoDB");

    // Limpia la colección (opcional)
    await StoreLocation.deleteMany({});
    console.log("Colección StoreLocation limpia");

    const data = {
      address: "C. Puebla 178, entre Hidalgo Y Lerdo Enfrente De Cuidado Con El Perro, Norte, 63000 Tepic, Nay.",
      latitude: 21.512090954191585,  // Ejemplo: coordenadas de Madrid
      longitude:  -104.89347764746158
    };

    const inserted = await StoreLocation.create(data);
    console.log("Store location sembrado:", inserted);

    mongoose.connection.close();
    console.log("Conexión cerrada");
  } catch (err) {
    console.error("Error al sembrar la base de datos:", err);
    mongoose.connection.close();
  }
};

seedStoreLocation();
