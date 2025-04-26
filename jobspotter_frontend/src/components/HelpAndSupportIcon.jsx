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
        right: "10px",
        zIndex: 9999,
      }}
      className="
        right-3 xs:right-4 sm:right-5 cursor-pointer bg-[#f00000] border-none rounded-full
        w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 shadow-[0_2px_8px_rgba(0,0,0,0.2)]
        flex items-center justify-center
      "
      title="Help and Support"
    >
      <FaComments className="h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6 text-[#ffffff]" />
    </button>
  );
}