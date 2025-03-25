// src/routes/email.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import * as nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post(
  "/send-email",
  upload.single("pdf"),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      // Valores fijos: usamos el correo predefinido y otros datos fijos
      const fixedEmail = process.env.FIXED_EMAIL || "admin@example.com";
      const subject = "Información de dispositivo y PDF adjunto";
      let text = "Se adjunta el archivo PDF.\n\n";

      // Agregar información del dispositivo, si existe
      if (req.body.deviceInfo) {
        try {
          const device = JSON.parse(req.body.deviceInfo);
          text += `Información del dispositivo:\n`;
          text += `Marca: ${device.brand}\n`;
          text += `Modelo: ${device.model}\n`;
          text += `Precio: ${device.price}\n`;
          text += `Año de lanzamiento: ${device.releaseYear}\n`;
          if (device.color) text += `Color: ${device.color}\n`;
          if (device.size) text += `Tamaño: ${device.size}\n`;
          if (device.memory) text += `Memoria: ${device.memory}\n`;
          if (device.cameras) text += `Cámaras: ${device.cameras}\n`;
        } catch (e) {
          console.error("Error al parsear deviceInfo:", e);
        }
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_USER,
        to: fixedEmail,
        subject,
        text
      };

      if (req.file) {
        mailOptions.attachments = [
          {
            filename: req.file.originalname,
            content: req.file.buffer
          }
        ];
      }

      await transporter.sendMail(mailOptions);

      res.json({ message: "Correo enviado correctamente" });
    } catch (error) {
      console.error("Error al enviar correo:", error);
      res.status(500).json({ error: "Error al enviar el correo" });
    }
  })
);

export default router;
