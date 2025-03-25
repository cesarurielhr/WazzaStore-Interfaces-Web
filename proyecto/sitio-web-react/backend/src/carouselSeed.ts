// src/carouselSeed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Carousel from "./models/carousel.model";

dotenv.config();

const seedCarousel = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await Carousel.deleteMany({});
    console.log("Colección carousel limpia");

    const data = [
      {
        imageUrl: "https://i.imgur.com/Ng2eQYJ.jpeg",
        caption: "Primera imagen"
      },
      {
        imageUrl: "https://i.imgur.com/zbqBqkT.jpeg",
        caption: "Segunda imagen"
      },
      {
        imageUrl: "https://i.imgur.com/67tgXEB.jpeg",
        caption: "tercera imagen"
      }
    ];
    const inserted = await Carousel.insertMany(data);
    console.log("Carousel sembrado:", inserted);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedCarousel();
