// src/routes/company.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Company from "../models/company.model";

const router = Router();

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET: Obtener la imagen de "Nosotros". Si no existe, se crea con un placeholder.
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    let company = await Company.findOne({});
    if (!company) {
      company = new Company({ imageUrl: "https://via.placeholder.com/600x400" });
      await company.save();
    }
    res.json(company);
  })
);

// PUT: Actualizar la imagen de "Nosotros"
router.put(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { imageUrl } = req.body;
    let company = await Company.findOne({});
    if (!company) {
      company = new Company({ imageUrl });
      await company.save();
      res.status(201).json(company);
    } else {
      company.imageUrl = imageUrl;
      await company.save();
      res.json(company);
    }
  })
);

export default router;
