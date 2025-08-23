import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NowhereDigitalWebsite from "./components/NowhereDigitalWebsite";

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
        <Routes>
          <Route path="/" element={<NowhereDigitalWebsite />} />
        </Routes>
      </BrowserRouter>
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div style={{ position: "fixed", bottom: "10px", right: "10px", background: "#000", color: "#00ff00", padding: "10px", fontSize: "12px", fontFamily: "monospace" }}>
          <div>Backend: {process.env.REACT_APP_BACKEND_URL}</div>
          <div>Status: {message || "Loading..."}</div>
        </div>
      )}
    </div>
  );
}

export default App;