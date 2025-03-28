// src/routes/carousel.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Carousel from "../models/carousel.model";

const router = Router();

// Wrapper para manejar funciones async y capturar errores
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Obtener todas las imágenes del carrusel
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const images = await Carousel.find();
    res.json(images);
  })
);

// Agregar una nueva imagen al carrusel
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { imageUrl, caption } = req.body;
    const newImage = new Carousel({ imageUrl, caption });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  })
);

// Eliminar una imagen del carrusel por ID
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedImage = await Carousel.findByIdAndDelete(id);
    if (!deletedImage) {
      res.status(404).json({ error: "Image not found" });
      return;
    }
    res.json({ message: "Image deleted successfully" });
  })
);

export default router;
