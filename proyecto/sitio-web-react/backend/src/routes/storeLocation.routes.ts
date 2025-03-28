// src/routes/storeLocation.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import StoreLocation from "../models/storeLocation.model"; // Asegúrate de que la ruta y el modelo sean correctos

const router = Router();

// Wrapper para funciones async
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Obtener la ubicación actual
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const location = await StoreLocation.findOne();
    if (!location) {
      res.status(404).json({ error: "No se encontró la ubicación" });
      return;
    }
    res.json(location);
  })
);

// Actualizar la ubicación de la tienda
router.put(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { address, latitude, longitude } = req.body;

    if (!address || latitude === undefined || longitude === undefined) {
      res.status(400).json({ error: "Faltan datos requeridos" });
      return;
    }

    // Intentar actualizar la ubicación; si no existe, se crea una nueva
    let updatedLocation = await StoreLocation.findOneAndUpdate(
      {},
      { address, latitude, longitude },
      { new: true, runValidators: true }
    );
    if (!updatedLocation) {
      updatedLocation = await StoreLocation.create({ address, latitude, longitude });
    }
    res.json(updatedLocation);
  })
);

export default router;
