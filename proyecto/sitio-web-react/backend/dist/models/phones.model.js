"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/phones.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const phoneSchema = new mongoose_1.default.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    releaseYear: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    memory: { type: String },
    cameras: { type: String },
    imageUrl: { type: String, required: true }
});
const Phone = mongoose_1.default.model("Phone", phoneSchema);
exports.default = Phone;
