import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { FaUsers, FaBriefcase, FaChartLine, FaMapMarkerAlt } from "react-icons/fa";

export function Dashboard() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border-1 rounded-4xl transition-all ease-in-out duration-500 
        ${
          darkMode
            ? // Dark mode gradient
              "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
            : // Light mode gradient
              "bg-gradient-to-br from-white to-gray-100 text-black"
        }`}
    >
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Dashboard</h1>
      <p className="mb-2">
        Welcome, Here’s where you’ll manage users, posts, and more.
      </p>

      {/* Inner card container*/}
      <div
        className={`p-6 rounded-xl ring-1 transition-all ease-in-out duration-500 shadow-lg 
          ${darkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-gray-200"}
        `}
      >
        <h2 className="text-2xl font-bold mb-2">Placeholder Stats</h2>

        {/* Icons + text rows, like your job cards */}
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Admin Location (Example)</span>
          </li>
          <li className="flex items-center gap-2">
            <FaUsers className="text-purple-500" />
            <span>Total Users</span>
          </li>
          <li className="flex items-center gap-2">
            <FaBriefcase className="text-blue-500" />
            <span>Total Job Posts</span>
          </li>
          <li className="flex items-center gap-2">
            <FaChartLine className="text-green-500" />
            <span>Other Admin Info</span>
          </li>
        </ul>

        {/* Description line, matching your job card style */}
        <p className="mt-4">
          <strong>Description:</strong>{" "}
          This is where you can see or manage all the admin stats.
        </p>
      </div>
    </div>
  );
}
