"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/phones.routes.ts
const express_1 = require("express");
const phones_model_1 = __importDefault(require("../models/phones.model")); // Asegúrate de que la ruta y el nombre coincidan
const router = (0, express_1.Router)();
// Wrapper para manejar funciones async y capturar errores
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Obtener todos los celulares
router.get("/", asyncHandler(async (req, res) => {
    const phones = await phones_model_1.default.find();
    res.json(phones);
}));
// Obtener un celular por ID
router.get("/:id", asyncHandler(async (req, res) => {
    const phone = await phones_model_1.default.findById(req.params.id);
    if (!phone) {
        res.status(404).json({ error: "Phone not found" });
        return;
    }
    res.json(phone);
}));
// Crear un nuevo celular
router.post("/", asyncHandler(async (req, res) => {
    const newPhone = new phones_model_1.default(req.body);
    const savedPhone = await newPhone.save();
    res.status(201).json(savedPhone);
}));
// Actualizar un celular
router.put("/:id", asyncHandler(async (req, res) => {
    const updatedPhone = await phones_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPhone) {
        res.status(404).json({ error: "Phone not found" });
        return;
    }
    res.json(updatedPhone);
}));
// Eliminar un celular
router.delete("/:id", asyncHandler(async (req, res) => {
    const deletedPhone = await phones_model_1.default.findByIdAndDelete(req.params.id);
    if (!deletedPhone) {
        res.status(404).json({ error: "Phone not found" });
        return;
    }
    res.json({ message: "Phone deleted successfully" });
}));
exports.default = router;
