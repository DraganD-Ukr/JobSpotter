import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function LightDarkToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  function handleToggle() {
    setDarkMode(!darkMode);
  }

  return (
    <div
      onClick={handleToggle}
      className="
        toggle-switch
        relative w-12 h-7
        flex-shrink-0
        rounded-full
        cursor-pointer
        transition-colors
      "
    >
      <div
        className={`
          absolute top-1 left-1 h-5 w-5
          flex items-center justify-center
          rounded-full
          text-gray-700 dark:text-white
          shadow-md
          transform transition-transform
          ${darkMode ? "translate-x-5 bg-gray-900" : "translate-x-0 bg-white"}
        `}
      >
        {darkMode ? <Moon size={14} /> : <Sun size={14} />}
      </div>
    </div>
  );
}
