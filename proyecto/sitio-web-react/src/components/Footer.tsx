// src/components/Footer.tsx
import "../styles/Footer.css";
import facebook from "../assets/img/facebook.png"



const Footer = () => {
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
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Soporte</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Síguenos</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/people/RomaShop-MX/100014756282027/?locale=es_ES&_rdr">
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
