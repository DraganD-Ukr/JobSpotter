import React from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";

export default function HelpAndSupportIcon() {
  const navigate = useNavigate();

  // Navigate to HelpAndSupport.jsx route
  const goToHelpSupport = () => {
    navigate("/HelpAndSupport"); 
  };

  return (
    <button
      onClick={goToHelpSupport}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        cursor: "pointer",
        backgroundColor: "#f00000", 
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      title="Help and Support"
    >
      <FaComments size={20} color="#ffffff" />
    </button>
  );
}
