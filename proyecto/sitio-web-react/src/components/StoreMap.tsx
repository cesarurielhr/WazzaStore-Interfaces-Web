// src/components/StoreMap.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import axios from "axios";

interface StoreLocation {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}

const DefaultIcon = (L as any).Icon.Default;
delete DefaultIcon.prototype._getIconUrl;
DefaultIcon.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const StoreMap: React.FC = () => {
  const [location, setLocation] = useState<StoreLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get<StoreLocation>("http://localhost:5000/store-location");
        setLocation(response.data);
      } catch (err) {
        console.error("Error fetching store location:", err);
        setError("Error al cargar la ubicación");
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  if (loading) return <p>Cargando mapa...</p>;
  if (error) return <p>{error}</p>;
  if (!location) return <p>No se encontró la ubicación de la tienda.</p>;

  const position: [number, number] = [location.latitude, location.longitude];

  const handleOpenMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div style={{ height: "400px", width: "100%", margin: "0 auto" }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            {location.address}
            <br />
            <button onClick={handleOpenMaps}>Abrir en Google Maps</button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StoreMap;
