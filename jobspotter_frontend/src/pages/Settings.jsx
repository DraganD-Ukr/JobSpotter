import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";
import LightDarkToggle from "../components/LightDarkToggle";

export function Settings() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`main-content min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <div className="card">
            <h2 className="text-xl mb-4">Dark Mode Toggle</h2>
            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <LightDarkToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
