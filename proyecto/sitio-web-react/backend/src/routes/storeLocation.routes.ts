// src/routes/storeLocation.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import StoreLocation from "../models/storeLocation.model";

const router = Router();

// Wrapper para manejar funciones async y capturar errores
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Ruta para obtener la ubicación de la tienda
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const location = await StoreLocation.findOne({});
    if (!location) {
      res.status(404).json({ error: "Store location not found" });
      return;
    }
    res.json(location);
  })
);

export default router;
