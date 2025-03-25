// src/routes/company.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Company from "../models/company.model";

const router = Router();

// Wrapper para manejar funciones async
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Ruta para obtener la información de la empresa (imagen y descripción)
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const company = await Company.findOne({});
    if (!company) {
      res.status(404).json({ error: "Company image not found" });
      return;
    }
    res.json(company);
  })
);

export default router;
