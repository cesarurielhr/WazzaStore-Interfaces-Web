// src/models/carousel.model.ts
import { Schema, model, Document } from "mongoose";

export interface ICarouselImage extends Document {
  imageUrl: string;
  caption?: string;
}

const CarouselSchema = new Schema<ICarouselImage>(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String },
  },
  {
    timestamps: true, // Para saber cuándo se creó/actualizó la imagen
  }
);

const Carousel = model<ICarouselImage>("Carousel", CarouselSchema);
export default Carousel;
