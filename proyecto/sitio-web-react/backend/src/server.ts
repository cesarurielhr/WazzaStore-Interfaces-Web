import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import phonesRoutes from "./routes/phones.routes";
import carouselRoutes from "./routes/carousel.routes";
import brandRoutes from "./routes/brand.routes";
import companyRoutes from "./routes/company.routes";
import storeLocationRoutes from "./routes/storeLocation.routes";
import emailRoutes from "./routes/email.routes";
import adminRoutes from "./routes/admin.routes"; // Ajusta la ruta según tu estructura





dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Rutas para las todas las colecciones
app.use("/phones", phonesRoutes);
app.use("/carousel", carouselRoutes);
app.use("/brand", brandRoutes);
app.use("/company", companyRoutes);
app.use("/store-location", storeLocationRoutes);
app.use("/email", emailRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
