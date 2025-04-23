import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";

export default function HelpAndSupportIcon() {
  const navigate = useNavigate();
  const [bottomOffset, setBottomOffset] = useState(20);

  const goToHelpSupport = () => {
    navigate("/HelpAndSupport"); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        setBottomOffset(overlap + 20);
      } else {
        setBottomOffset(20);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={goToHelpSupport}
      style={{
        position: "fixed",
        bottom: `${bottomOffset}px`,
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
