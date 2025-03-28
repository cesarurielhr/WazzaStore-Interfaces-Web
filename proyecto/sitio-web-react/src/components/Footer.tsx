// src/components/Footer.tsx
import React from "react";
import facebook from "../assets/img/facebook.png"; 
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>RomaShop</h2>
          <p>Calidad y servicio en un solo lugar.</p>
        </div>
        <div className="footer-links">
          <h3>Enlaces útiles</h3>
          <ul>
            <li>
              <a  target="_blank" rel="noopener noreferrer">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a  target="_blank" rel="noopener noreferrer">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a  target="_blank" rel="noopener noreferrer">
                Soporte
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Síguenos</h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/people/RomaShop-MX/100014756282027/?locale=es_ES&_rdr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-admin">
          <a href="/admin/login" className="admin-link">Admin</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 RomaShop - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
