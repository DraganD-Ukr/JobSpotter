import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

export function Settings() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkMode");
      document.body.classList.remove("lightMode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("lightMode");
      document.body.classList.remove("darkMode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Right: Main Content */}
      <div style={{ flex: 1, padding: "1.5rem" }}>

        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Settings
        </h1>


        {/* Settings Card */}
        <div
          style={{
            backgroundColor: darkMode ? "#333" : "#fff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Dark Mode Toggle</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Dark Mode</span>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
