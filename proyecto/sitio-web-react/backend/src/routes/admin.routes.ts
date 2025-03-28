// src/routes/admin.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Admin, { IAdmin } from "../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Ruta para login del administrador usando "userId"
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId, password } = req.body;
    const admin: IAdmin | null = await Admin.findOne({ userId });
    if (!admin) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
    res.json({ token });
  })
);

// Ruta opcional para listar administradores
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const admins = await Admin.find();
    res.json(admins);
  })
);

export default router;
