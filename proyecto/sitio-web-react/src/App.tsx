// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Celulares from "./pages/Celulares";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admimlog";
import "./App.css"; // Asegúrate de importar el CSS donde definimos la altura.

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/celulares" element={<Celulares />} />
            <Route path="/admin" element={<AdminLogin />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
