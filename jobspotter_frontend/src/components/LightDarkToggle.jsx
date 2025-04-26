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
        relative w-10 xs:w-12 sm:w-14 h-6 xs:h-7 sm:h-8
        flex-shrink-0
        rounded-full
        cursor-pointer
        transition-colors
      "
    >
      <div
        className={`
          absolute top-0.5 xs:top-0.5 sm:top-1 left-0.5 xs:left-0.5 sm:left-1 
          h-5 xs:h-6 sm:h-6 w-5 xs:w-6 sm:w-6
          flex items-center justify-center
          rounded-full
          text-gray-700 dark:text-white
          shadow-md
          transform transition-transform
          ${darkMode ? "translate-x-4 xs:translate-x-5 sm:translate-x-6" : "translate-x-0"}
          ${darkMode ? "bg-gray-900" : "bg-white"}
        `}
      >
        {darkMode ? <Moon className="h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4" /> : <Sun className="h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4" />}
      </div>
    </div>
  );
}