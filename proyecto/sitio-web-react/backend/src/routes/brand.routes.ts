// src/routes/brand.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Brand from "../models/brand.model";

const router = Router();

// Wrapper para funciones async
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET: obtener la información del brand (logo)
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    let brand = await Brand.findOne({});
    if (!brand) {
      // Si no existe, creamos un registro con valores por defecto
      brand = new Brand({ logoUrl: "https://via.placeholder.com/150", brandName: "MiTienda" });
      await brand.save();
    }
    res.json(brand);
  })
);

// PUT: actualizar el logo (y opcionalmente el nombre)
router.put(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { logoUrl, brandName } = req.body;
    let brand = await Brand.findOne({});
    if (!brand) {
      // Crear si no existe
      brand = new Brand({ logoUrl, brandName });
      await brand.save();
      res.status(201).json(brand);
    } else {
      brand.logoUrl = logoUrl;
      if (brandName) brand.brandName = brandName;
      await brand.save();
      res.json(brand);
    }
  })
);

export default router;
