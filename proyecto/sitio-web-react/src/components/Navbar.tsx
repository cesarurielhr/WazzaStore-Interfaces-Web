// src/components/Navbar.tsx (o donde tengas tu Navbar)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

interface BrandData {
  _id: string;
  logoUrl: string;
  brandName?: string;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brand, setBrand] = useState<BrandData | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get<BrandData>("http://localhost:5000/brand");
        setBrand(response.data);
      } catch (error) {
        console.error("Error al cargar el logo:", error);
      }
    };
    fetchBrand();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        {/* Si ya cargó brand, mostramos el logo */}
        {brand && (
          <img src={brand.logoUrl} alt={brand.brandName || "MiTienda"} className="logo-img" />
        )}
      </Link>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Ofertas</Link>
        </li>
        <li>
          <Link to="/celulares" onClick={() => setMenuOpen(false)}>Celulares</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
