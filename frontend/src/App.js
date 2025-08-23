import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlatformPage from "./pages/PlatformPage";
import ServicesPage from "./pages/ServicesPage";
import AISolverPage from "./pages/AISolverPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./components/AdminDashboard";
import Navigation from "./components/Navigation";
import MatrixChatSystem from "./components/MatrixChatSystem";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
    fetch(`${backendUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/ai-solver" element={<AISolverPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        
        {/* Global Chat System */}
        <MatrixChatSystem />
        
        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div style={{ position: "fixed", bottom: "10px", right: "10px", background: "#000", color: "#00ff00", padding: "10px", fontSize: "12px", fontFamily: "monospace", zIndex: 9999 }}>
            <div>Backend: {process.env.REACT_APP_BACKEND_URL}</div>
            <div>Status: {message || "Loading..."}</div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;