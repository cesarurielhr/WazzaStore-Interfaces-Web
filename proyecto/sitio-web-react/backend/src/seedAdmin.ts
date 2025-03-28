// src/seedAdmin.ts
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Conectado a la base de datos");

    // Elimina un admin existente con userId "admin" si existe
    await Admin.findOneAndDelete({ userId: "admin" });

    const hashedPassword = await bcrypt.hash("admin", 10);

    const newAdmin = new Admin({
      userId: "admin",
      password: hashedPassword
    });
    await newAdmin.save();

    console.log("Usuario admin creado correctamente");
  } catch (error) {
    console.error("Error al crear el usuario admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada");
  }
}

seedAdmin();
