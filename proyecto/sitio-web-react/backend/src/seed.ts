// src/seed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Phone from "./models/phones.model"; // Asegúrate de que la ruta y nombre sean correctos

dotenv.config();


const seedPhones = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Conectado a MongoDB");

    // Opcional: Limpia la colección existente
    await Phone.deleteMany({});
    console.log("Eliminados registros existentes");

    // Datos de ejemplo para insertar
    const phonesData = [
      {
        brand: "Apple",
        model: "iPhone 14",
        price: 999,
        releaseYear: 2022,
        color: "Negro",
        size: "6.1 pulgadas",
        memory: "128GB",
        cameras: "12MP dual cámara",
        imageUrl: "https://drive.google.com/file/d/1ZosiA9GUEODolh5Rqo2r35CchcA7DE78/view?usp=drive_link"
      },
      {
        brand: "Samsung",
        model: "Galaxy S22",
        price: 899,
        releaseYear: 2022,
        color: "Phantom Black",
        size: "6.2 pulgadas",
        memory: "128GB",
        cameras: "50MP principal, 12MP ultra-ancho, 10MP telefoto",
        imageUrl: "https://drive.google.com/file/d/1ByWlmyZ7BXm0ywcBg8DLT2xuuYGj7c3s/view?usp=drive_link"
      },
      {
        brand: "Google",
        model: "Pixel 7",
        price: 799,
        releaseYear: 2022,
        color: "Obsidian",
        size: "6.3 pulgadas",
        memory: "128GB",
        cameras: "50MP principal, 12MP ultra-ancho",
        imageUrl: "https://drive.google.com/file/d/1ZosiA9GUEODolh5Rqo2r35CchcA7DE78/view?usp=drive_link"
      }
      // Agrega más registros según lo desees
    ];

    const insertedPhones = await Phone.insertMany(phonesData);
    console.log("Celulares sembrados:", insertedPhones);

    mongoose.connection.close();
    console.log("Conexión cerrada");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
    mongoose.connection.close();
  }
};

seedPhones();
