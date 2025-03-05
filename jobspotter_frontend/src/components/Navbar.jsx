import { useState, useEffect, useRef, useContext } from "react";
import { Search, Bell, Sun, Moon } from "lucide-react";
import trollImage from "../assets/troll.jpg";
import gigachadImage from "../assets/gigachad.png";
import { ThemeContext } from "./ThemeContext";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Use the global dark mode state from context
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Listen for localStorage theme changes from other tabs
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "theme") {
        setDarkMode(e.newValue === "dark");
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setDarkMode]);

  async function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(
        `/api/v1/job-posts/search?title=${encodeURIComponent(trimmed)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to search job posts");
      const data = await res.json();
      setSearchResults(data);
      setShowResults(true);
      console.log("Search results:", data);
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  // Clicking a search result → navigate to “Jobs Available”
  function handleResultClick(job) {
    window.location.href = `/SearchJobPost?jobId=${job.jobPostId}`;
  }

  // Close search or notifications when clicking outside
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if user is logged in
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
        setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsCheckingAuth(false));
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/users/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 lava-lamp-background p-4 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between nav-container">
        {/* Left: Logo */}
        <a href="/">
          <img
            src="/jb.png"
            alt="JobSpotter Logo"
            className="h-10 w-auto object-contain scale-500 mb-2"
          />
        </a>

        {/* Middle: "Jobs Available", "My Job Posts", and Data link */}
        <div className="flex-1 flex justify-center items-center gap-8">
          <div className="relative group inline-block">
            <span className="inline-block px-3 py-2 text-white font-medium hover:underline">
              Jobs Available
            </span>
            <div
              className="absolute top-full right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg 
              transition-all ease-in-out duration-500 overflow-hidden transform origin-bottom max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100"
            >
              <a
                href="/SearchJobPost"
                className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                View All Jobs
              </a>
              <a
                href="/JobPostHistory"
                className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                View Job Post History
              </a>
              <div className="h-px w-full bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>

          <div className="relative group inline-block">
            <span className="inline-block px-3 py-2 text-white font-medium hover:underline">
              My Job Posts
            </span>
            <div
              className="absolute top-full right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg 
              transition-all ease-in-out duration-500 overflow-hidden transform origin-bottom max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100"
            >
              <a
                href="/myJobs"
                className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                View My Jobs
              </a>
              <a
                href="/CreateJobPost"
                className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Create Job Post
              </a>
            </div>
          </div>

          <a href="/data" className="text-white font-medium hover:underline">
            Data
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex items-center" ref={searchRef}>
            {isExpanded ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full shadow-md overflow-hidden w-[400px]"
              >
                <div className="flex items-center px-3 w-2/3">
                  <Search className="text-gray-500 dark:text-gray-300" size={20} />
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) {
                        setShowResults(true);
                      }
                    }}
                  />
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center px-3 w-1/3 gap-2">
                  <img
                    src={trollImage}
                    alt="Location"
                    className="w-6 h-6 rounded-full"
                  />
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Location"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                  >
                    <Search className="text-white" size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
                onClick={() => setIsExpanded(true)}
              >
                <Search className="text-white" size={24} />
              </button>
            )}

            {isExpanded && showResults && searchResults.length > 0 && (
              <div
                className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50 w-full"
              >
                {searchResults.map((job) => (
                  <div
                    key={job.jobPostId}
                    onClick={() => handleResultClick(job)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {job.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative group inline-block" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
            >
              <Bell size={24} className="text-white" />
            </button>
            {showNotifications && (
              <div
                className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50"
              >
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  No notifications
                </div>
              </div>
            )}
          </div>

          {/* Profile/Login */}
          {isCheckingAuth ? (
            <div className="text-white">Loading...</div>
          ) : !isLoggedIn ? (
            <>
              <a
                href="/login"
                className="bg-green-700 px-4 py-2 text-white rounded-md hover:bg-green-800"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-lime-700 px-4 py-2 text-white rounded-md hover:bg-lime-800"
              >
                Register
              </a>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative group inline-block">
                <img
                  src={gigachadImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                {/* Profile dropdown now has the same slow bottom-up animation */}
                <div
                  className="absolute top-full right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50
                  transition-all ease-in-out duration-500 overflow-hidden transform origin-bottom max-h-0 opacity-0 group-hover:max-h-60 group-hover:opacity-100"
                >
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                  >
                    Job Activity
                  </a>
                  <a
                    href="/Settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                  >
                    Settings
                  </a>
                  <div className="h-px w-full bg-gray-300 dark:bg-gray-600" />
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 cursor-pointer"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
              <span className="nav-username font-bold">{username}</span>
            </div>
          )}
        </div>

        {/* Absolutely positioned container for dark mode toggle */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4 z-50">
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-7 flex-shrink-0 rounded-full cursor-pointer transition-colors bg-white dark:bg-gray-900"
            >
              <div
                className={`absolute top-1 left-1 h-5 w-5 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 text-gray-700 dark:text-white shadow-md transform transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              >
                {darkMode ? <Moon size={14} /> : <Sun size={14} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}