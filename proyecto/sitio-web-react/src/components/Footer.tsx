import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>MiTienda</h2>
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
              <a href="#">
                <img src="/img/facebook-icon.png" alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/img/instagram-icon.png" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/img/twitter-icon.png" alt="Twitter" />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-admin">
          <a href="/admin" className="admin-link">Admin de momento</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MiTienda - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
