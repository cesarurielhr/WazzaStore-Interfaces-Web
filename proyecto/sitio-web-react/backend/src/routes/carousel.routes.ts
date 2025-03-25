// src/routes/carousel.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Carousel from "../models/carousel.model";

const router = Router();

// Helper para async/await
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /carousel
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const images = await Carousel.find();
    res.json(images);
  })
);

export default router;
