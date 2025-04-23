import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";
import LightDarkToggle from "../components/LightDarkToggle";

export function Settings() {
  const { darkMode } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      className={`my-10 border-1 rounded-4xl main-content min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">{t("settingsTitle")}</h1>
          
          {/* Dark Mode Toggle Section */}
          <div className="card mb-6">
            <h2 className="text-xl mb-4">{t("darkModeToggle")}</h2>
            <div className="flex justify-between items-center">
              <span>{t("darkMode")}</span>
              <LightDarkToggle />
            </div>
          </div>
          
          {/* Language Section */}
          <div className="card">
            <h2 className="text-xl mb-4">{t("language")}</h2>
            <div className="flex justify-between items-center">
              <span>{t("selectLanguage")}</span>
              <select
                onChange={handleLanguageChange}
                value={i18n.language}
                className={`border rounded p-1 ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text- border-gray-300"
                }`}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
