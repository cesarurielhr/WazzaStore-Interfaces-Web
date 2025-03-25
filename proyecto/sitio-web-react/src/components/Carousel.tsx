// src/components/Carousel.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Carousel.css";

interface CarouselImage {
  _id: string;
  imageUrl: string;
  caption?: string;
}

const Carousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cargar las imágenes del backend
    const fetchImages = async () => {
      try {
        const response = await axios.get<CarouselImage[]>("http://localhost:5000/carousel");
        setImages(response.data);
      } catch (error) {
        console.error("Error al cargar carousel:", error);
      }
    };
    fetchImages();
  }, []);

  // Efecto para cambiar de imagen cada 3 segundos
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  // Manejo de casos
  if (!images.length) {
    return <p>Cargando carousel o sin imágenes...</p>;
  }

  return (
    <div className="carousel">
      <img src={images[index].imageUrl} alt={images[index].caption || "Carousel"} />
      {/* Si quieres mostrar la caption */}
      {images[index].caption && <p>{images[index].caption}</p>}
    </div>
  );
};

export default Carousel;
