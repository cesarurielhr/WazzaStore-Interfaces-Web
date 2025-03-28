// src/pages/EditImages.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EditImages.css";

interface CarouselImage {
  _id: string;
  imageUrl: string;
  caption?: string;
}

interface Brand {
  _id: string;
  logoUrl: string;
  brandName?: string;
}

interface CompanyImage {
  _id: string;
  imageUrl: string;
}

interface StoreLocation {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}

const EditImages: React.FC = () => {
  // Sección: Carrusel
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Sección: Logo
  const [brand, setBrand] = useState<Brand | null>(null);
  const [newLogoUrl, setNewLogoUrl] = useState("");

  // Sección: Imagen "Nosotros"
  const [companyImage, setCompanyImage] = useState<CompanyImage | null>(null);
  const [newCompanyImageUrl, setNewCompanyImageUrl] = useState("");

  // Nueva sección: Ubicación de la Tienda
  const [location, setLocation] = useState<StoreLocation | null>(null);
  const [newAddress, setNewAddress] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Funciones para cargar datos
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get<CarouselImage[]>("http://localhost:5000/carousel");
      setImages(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al cargar las imágenes del carrusel");
    } finally {
      setLoading(false);
    }
  };

  const fetchBrand = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Brand>("http://localhost:5000/brand");
      setBrand(response.data);
      setNewLogoUrl(response.data.logoUrl);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al cargar el logo");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get<CompanyImage>("http://localhost:5000/company");
      setCompanyImage(response.data);
      setNewCompanyImageUrl(response.data.imageUrl);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al cargar la imagen de Nosotros");
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = async () => {
    try {
      setLoading(true);
      const response = await axios.get<StoreLocation>("http://localhost:5000/store-location");
      setLocation(response.data);
      setNewAddress(response.data.address);
      setNewLatitude(response.data.latitude.toString());
      setNewLongitude(response.data.longitude.toString());
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al cargar la ubicación de la tienda");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrand();
    fetchImages();
    fetchCompanyImage();
    fetchLocation();
  }, []);

  // Actualizar Logo
  const handleUpdateLogo = async () => {
    if (!window.confirm("¿Deseas actualizar el logo?")) return;
    try {
      setLoading(true);
      const response = await axios.put("http://localhost:5000/brand", { logoUrl: newLogoUrl });
      setBrand(response.data);
      setError("");
      window.alert("Logo actualizado correctamente");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el logo");
      window.alert("Error al actualizar el logo");
    } finally {
      setLoading(false);
    }
  };

  // Agregar imagen al Carrusel
  const handleAddImage = async () => {
    if (images.length >= 5) {
      window.alert("Solo se permite un máximo de 5 imágenes");
      return;
    }
    if (!newImageUrl.trim()) return;
    if (!window.confirm("¿Deseas agregar esta imagen al carrusel?")) return;
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/carousel", { imageUrl: newImageUrl });
      setImages((prev) => [...prev, response.data]);
      setNewImageUrl("");
      setError("");
      window.alert("Imagen agregada correctamente");
    } catch (err) {
      console.error(err);
      setError("Error al agregar la imagen");
      window.alert("Error al agregar la imagen");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar imagen del Carrusel
  const handleDeleteImage = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta imagen?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/carousel/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      setError("");
      window.alert("Imagen eliminada correctamente");
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la imagen");
      window.alert("Error al eliminar la imagen");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar imagen "Nosotros"
  const handleUpdateCompanyImage = async () => {
    if (!window.confirm("¿Deseas actualizar la imagen de Nosotros?")) return;
    try {
      setLoading(true);
      const response = await axios.put("http://localhost:5000/company", { imageUrl: newCompanyImageUrl });
      setCompanyImage(response.data);
      setError("");
      window.alert("Imagen de Nosotros actualizada correctamente");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la imagen de Nosotros");
      window.alert("Error al actualizar la imagen de Nosotros");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar Ubicación
  const handleUpdateLocation = async () => {
    if (!window.confirm("¿Deseas actualizar la ubicación de la tienda?")) return;
    try {
      setLoading(true);
      const response = await axios.put("http://localhost:5000/store-location", {
        address: newAddress,
        latitude: parseFloat(newLatitude),
        longitude: parseFloat(newLongitude)
      });
      setLocation(response.data);
      setError("");
      window.alert("Ubicación actualizada correctamente");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la ubicación");
      window.alert("Error al actualizar la ubicación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">Administración</h1>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Cargando...</p>}

      {/* Sección: Editar Logo */}
      <section className="edit-logo-section">
        <h2 className="section-title">Editar Logo del Navbar</h2>
        {brand && (
          <div className="logo-container">
            <img src={brand.logoUrl} alt={brand.brandName || "Logo"} className="logo-img" />
            <div className="logo-update-form">
              <input
                type="text"
                placeholder="Ingresa el nuevo link del logo"
                value={newLogoUrl}
                onChange={(e) => setNewLogoUrl(e.target.value)}
                className="logo-input"
              />
              <button onClick={handleUpdateLogo} className="update-logo-btn">
                Actualizar Logo
              </button>
            </div>
          </div>
        )}
      </section>
      <hr className="divider" />

      {/* Sección: Editar Carrusel */}
      <section className="edit-carousel-section">
        <h2 className="section-title">Editar Carrusel (Imágenes actuales: {images.length} de 5)</h2>
        <ul className="carousel-list">
          {images.map((image) => (
            <li key={image._id} className="carousel-item">
              <img src={image.imageUrl} alt={image.caption || "Imagen del carrusel"} className="carousel-img" />
              <span className="carousel-url">{image.imageUrl}</span>
              <button onClick={() => handleDeleteImage(image._id)} className="btn-delete">
  Eliminar
</button>

            </li>
          ))}
        </ul>
        {images.length < 5 && (
          <div className="carousel-add-form">
            <input
              type="text"
              placeholder="Ingresa el link de la imagen"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="carousel-input"
            />
            <button onClick={handleAddImage} className="add-btn">
              Agregar
            </button>
          </div>
        )}
      </section>
      <hr className="divider" />

      {/* Sección: Editar Imagen de Nosotros */}
      <section className="edit-company-section">
        <h2 className="section-title">Editar Imagen de Nosotros</h2>
        {companyImage && (
          <div className="company-container">
            <img src={companyImage.imageUrl} alt="Imagen de Nosotros" className="company-img" />
            <div className="company-update-form">
              <input
                type="text"
                placeholder="Ingresa el nuevo link de la imagen de Nosotros"
                value={newCompanyImageUrl}
                onChange={(e) => setNewCompanyImageUrl(e.target.value)}
                className="company-input"
              />
              <button onClick={handleUpdateCompanyImage} className="update-company-btn">
                Actualizar Imagen
              </button>
            </div>
          </div>
        )}
      </section>
      <hr className="divider" />

      {/* Sección: Editar Ubicación de la Tienda */}
      <section className="edit-location-section">
        <h2 className="section-title">Editar Ubicación de la Tienda</h2>
        {location && (
          <div className="location-container">
            <div className="form-group">
              <label>Dirección:</label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Latitud:</label>
              <input
                type="number"
                value={newLatitude}
                onChange={(e) => setNewLatitude(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Longitud:</label>
              <input
                type="number"
                value={newLongitude}
                onChange={(e) => setNewLongitude(e.target.value)}
              />
            </div>
            <button onClick={handleUpdateLocation} className="update-location-btn">
              Actualizar Ubicación
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default EditImages;
