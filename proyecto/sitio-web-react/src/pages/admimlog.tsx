import React, { useState } from "react";
import "../styles/adminlog.css";

const AdminLogin: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de validación de credenciales
    if (userId === "12345" && password === "123") {
      alert("Login exitoso (simulado)");
      // Limpiar campos y error
      setUserId("");
      setPassword("");
      setError("");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="admin-login-background">
      <div className="admin-login-container">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                placeholder="ID usuario"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn-gradient">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
