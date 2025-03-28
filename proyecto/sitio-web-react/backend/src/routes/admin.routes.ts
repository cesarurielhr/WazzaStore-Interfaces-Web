// src/routes/admin.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import Admin from "../models/Admin";

const router = Router();

/**
 * Wrapper para manejar funciones async y capturar errores,
 * de forma que Express los procese automáticamente.
 */
const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Ruta POST /login para verificar credenciales de admin
 */
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId, password } = req.body;

    // Buscar al admin en la base de datos
    const admin = await Admin.findOne({ userId });
    if (!admin) {
      res.status(400).json({ success: false, msg: "Usuario no encontrado" });
      return; // Aseguramos no continuar
    }

    // Comparar contraseña
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, msg: "Credenciales incorrectas" });
      return;
    }

    // Si todo OK, respondemos con success: true
    res.json({ success: true });
  })
);

export default router;
