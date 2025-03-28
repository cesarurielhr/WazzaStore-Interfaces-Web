// src/seedAdmin.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin, { IAdmin } from "./models/Admin";

dotenv.config();

const seedAdmin = async (): Promise<void> => {
  try {
    // Conectar a la base de datos usando la URI del archivo .env
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI no definida en el .env");
    await mongoose.connect(mongoURI);
    console.log("Conectado a MongoDB");

    // Datos para el admin a crear
    const adminData = {
      userId: "admin",      // Puedes cambiar este valor por el que prefieras
      password: "admin123", // La contraseña en texto plano; se hasheará al guardar
    };

    // Verificar si ya existe un admin con ese userId
    const existingAdmin: IAdmin | null = await Admin.findOne({ userId: adminData.userId });
    if (existingAdmin) {
      console.log("El admin ya existe en la base de datos.");
    } else {
      // Crear y guardar el nuevo admin
      const admin = new Admin(adminData);
      await admin.save();
      console.log("Admin creado exitosamente.");
    }

    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al sembrar el admin:", error);
    process.exit(1);
  }
};

seedAdmin();
