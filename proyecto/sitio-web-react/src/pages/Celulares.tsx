// src/pages/Celulares.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/celulares.css";

interface Phone {
  _id: string;
  brand: string;
  model: string;
  price: number;
  releaseYear: number;
  color?: string;
  size?: string;
  memory?: string;
  cameras?: string;
  imageUrl: string;
}

const Celulares: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado para el modal de "Más información"
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Estado para el archivo PDF
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get<Phone[]>("http://localhost:5000/phones");
        setPhones(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los celulares");
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  const handleOpenModal = (phone: Phone) => {
    setSelectedPhone(phone);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPhone(null);
    setShowModal(false);
    setPdfFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmitPDF = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!pdfFile) {
        alert("Por favor, selecciona un archivo PDF.");
        return;
      }
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      // Agregar la información del dispositivo (si existe) como JSON
      if (selectedPhone) {
        formData.append("deviceInfo", JSON.stringify(selectedPhone));
      }

      await axios.post("http://localhost:5000/email/send-email", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Correo enviado con éxito, OJO EL TELEFONO SOLO SE LE PODRA APARTAR 2 DIAS");
      handleCloseModal();
    } catch (error) {
      console.error("Error al enviar correo:", error);
      alert("Error al enviar correo");
    }
  };

  if (loading) return <p>Cargando celulares...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="celulares-container">
      <h1>Página de Celulares</h1>
      <p>Aquí encontrarás todos los celulares en oferta.</p>

      <div className="phones-grid">
        {phones.map((phone) => (
          <div className="phone-card" key={phone._id}>
            <img src={phone.imageUrl} alt={phone.model} className="phone-image" />
            <div className="phone-info">
              <h2>
                {phone.brand} {phone.model}
              </h2>
              <p>
                Pantalla {phone.size}, {phone.memory}, {phone.cameras}
              </p>
              <button onClick={() => handleOpenModal(phone)}>
                Más información
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedPhone && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {selectedPhone.brand} {selectedPhone.model}
            </h2>
            <p>Precio: ${selectedPhone.price}</p>
            <p>Año de lanzamiento: {selectedPhone.releaseYear}</p>
            {selectedPhone.color && <p>Color: {selectedPhone.color}</p>}
            {selectedPhone.size && <p>Tamaño: {selectedPhone.size}</p>}
            {selectedPhone.memory && <p>Memoria: {selectedPhone.memory}</p>}
            {selectedPhone.cameras && <p>Cámaras: {selectedPhone.cameras}</p>}
            <img
              src={selectedPhone.imageUrl}
              alt={selectedPhone.model}
              style={{ width: "200px", height: "auto", borderRadius: "5px" }}
            />

            {/* Formulario para enviar el PDF y la información del dispositivo */}
            <form onSubmit={handleSubmitPDF} className="pdf-form">
              <label>Seleccionar archivo PDF:</label>
              <input type="file" accept=".pdf" onChange={handleFileChange} required />
              <button type="submit">Enviar</button>
            </form>

            <button className="close-btn" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Celulares;
