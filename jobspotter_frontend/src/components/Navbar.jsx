import { useState, useEffect, useRef } from "react";
import { Search, Bell } from "lucide-react";
import trollImage from "../assets/troll.jpg";
import gigachadImage from "../assets/gigachad.png";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Refs for closing search and notifications when clicking outside
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    // Close search/notifications if clicked outside
    function handleClickOutside(event) {
      // Close search
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
      // Close notifications
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Check if user is logged in
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

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/users/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");

      // Reset to light mode on logout (optional)
      document.body.classList.add("lightMode");
      document.body.classList.remove("darkMode");
      localStorage.setItem("theme", "light");

      window.location.href = "/Login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 lava-lamp-background p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between nav-container">
        {/* Left: Logo */}
        <a href="/">
          <img
            src="/jb.png"
            alt="JobSpotter Logo"
            className="h-10 w-auto object-contain scale-500 mb-2"
          />
        </a>

        {/* Center: Two main links: "Search JobPost" and "Job Posts" (dropdown) */}
        <div className="flex-1 flex justify-center items-center gap-8">
    

          {/* 2) "Job Posts" dropdown */}
          <div className="relative group inline-block">
            {/* The top-level link or label for the dropdown */}
            <a
              href="JobPost"
              className="inline-block px-3 py-2 text-white font-medium hover:underline"
            >
              Job Posts
            </a>
            {/* The dropdown menu */}
            <div className="absolute hidden group-hover:block top-full right-0 bg-white border border-gray-200 rounded shadow-lg">
              <a
                href="/AllJobs"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                View All Jobs
              </a>

              <a
                href="/JobPostHistory"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                View Job Post History
              </a>

              <div className="h-px w-full bg-gray-300" />
              <a
                href="/MyJobs"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                View My Jobs
              </a>
              <div className="h-px w-full bg-gray-300" />
              <a
                href="/CreateJobPost"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Create Job Post
              </a>
            </div>
          </div>

          
          { <a href="/data" className="text-white font-medium hover:underline">
            Data
          </a>}
        </div>

        {/* Right: Search */}
        <div className="relative flex items-center ml-auto mr-2" ref={searchRef}>
          {!isExpanded ? (
            <button
              className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
              onClick={() => setIsExpanded(true)}
            >
              <Search className="text-white" size={24} />
            </button>
          ) : (
            <div className="flex items-center bg-gray-100 rounded-full shadow-md overflow-hidden w-[400px]">
              <div className="flex items-center px-3 w-2/3">
                <Search className="text-gray-500" size={20} />
                <input
                  type="text"
                  className="w-full bg-gray-100 px-3 py-2 rounded-l-full focus:outline-none"
                  placeholder="Search"
                />
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="flex items-center px-3 w-1/3">
                <img
                  src={trollImage}
                  alt="Location"
                  className="w-6 h-6 rounded-full"
                />
                <input
                  type="text"
                  className="w-full bg-gray-100 px-3 py-2 rounded-r-full focus:outline-none"
                  placeholder="Location"
                />
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative group inline-block mr-4" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
          >
            <Bell size={24} className="text-white" />
          </button>
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50">
              <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                No notifications
              </div>
            </div>
          )}
        </div>

        {/* Profile/Login Items */}
        <ul className="flex gap-4 items-center">
          {isCheckingAuth ? (
            <li className="text-white">Loading...</li>
          ) : !isLoggedIn ? (
            <>
              <li>
                <a
                  href="/login"
                  className="bg-green-700 px-4 py-2 text-white rounded-md hover:bg-green-800"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="bg-lime-700 px-4 py-2 text-white rounded-md hover:bg-lime-800"
                >
                  Register
                </a>
              </li>
            </>
          ) : (
            <li className="flex items-center gap-2">
              <div className="relative group inline-block">
                <img
                  src={gigachadImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                {/* Hover menu */}
                <div className="absolute hidden group-hover:block top-full right-0 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Job Activity
                  </a>
                  <a
                    href="/Settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
              <span className="nav-username font-bold">{username}</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
