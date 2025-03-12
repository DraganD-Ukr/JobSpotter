import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { FaUsers, FaBriefcase, FaChartLine, FaMapMarkerAlt } from "react-icons/fa";

export function Dashboard() {
  const { darkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username || "");
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }, []);

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border-1 rounded-4xl transition-all ease-in-out duration-500 
        ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-white to-gray-100 text-black"
        }`}
    >
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Dashboard</h1>
      <p className="mb-2">
        Welcome, {username ? username : "User"}, Here’s where you’ll manage users, posts, and more.
      </p>

      {/* Inner card container */}
      <div
        className={`p-6 rounded-xl ring-1 transition-all ease-in-out duration-500 shadow-lg 
          ${darkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-gray-200"}
        `}
      >
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>

        {/* Stats container */}
        <ul className="stats-container space-y-3">
          <li
            className="stat-item flex items-center gap-2 px-3 py-2 rounded-md 
                       bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors"
          >
            <FaMapMarkerAlt className="text-red-500" />
            <span>Admin Location</span>
          </li>
          <li
            className="stat-item flex items-center gap-2 px-3 py-2 rounded-md 
                       bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors"
          >
            <FaUsers className="text-purple-500" />
            <span>Total Users</span>
          </li>
          <li
            className="stat-item flex items-center gap-2 px-3 py-2 rounded-md 
                       bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors"
          >
            <FaBriefcase className="text-blue-500" />
            <span>Total Job Posts</span>
          </li>
          <li
            className="stat-item flex items-center gap-2 px-3 py-2 rounded-md 
                       bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors"
          >
            <FaChartLine className="text-green-500" />
            <span>Other Admin Info</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
