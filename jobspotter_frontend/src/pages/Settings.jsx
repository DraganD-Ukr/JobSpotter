import { useState, useEffect } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-gray-700 dark:text-white"
          >
            {darkMode ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
}
