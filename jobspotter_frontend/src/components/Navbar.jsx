import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon } from "lucide-react";
import trollImage from "../assets/troll.jpg";
import { ThemeContext } from "./ThemeContext";
import Notification from "./Notification";
import ProfilePicture from "../components/ProfilePicture";

function calculateCompleteness(user, addresses) {
  if (!user) return { completion: 0, missing: [] };

  // 6 items used in Profile.jsx:
  // 1. firstName
  // 2. lastName
  // 3. email
  // 4. phoneNumber
  // 5. about
  // 6. at least one address
  const total = 6;
  let filled = 0;
  let missing = [];

  if (user.firstName?.trim()) filled++;
  else missing.push("First Name");
  if (user.lastName?.trim()) filled++;
  else missing.push("Last Name");
  if (user.email?.trim()) filled++;
  else missing.push("Email");
  if (user.phoneNumber?.trim()) filled++;
  else missing.push("Phone Number");
  if (user.about?.trim()) filled++;
  else missing.push("About");
  if (addresses && addresses.length > 0) filled++;
  else missing.push("Address");

  const completion = Math.round((filled / total) * 100);
  return { completion, missing };
}

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // user + addresses data
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);

  // completeness
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [missingItems, setMissingItems] = useState([]);

  // local state to control the "Let's Get You Started" sub-menu
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Listen for localStorage theme changes
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "theme") {
        setDarkMode(e.newValue === "dark");
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setDarkMode]);

  // Fetch user + addresses once on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await fetch("/api/v1/users/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!resUser.ok) throw new Error("Failed to fetch user info");
        const dataUser = await resUser.json();

        const resAddr = await fetch("/api/v1/users/addresses", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        let dataAddr = [];
        if (resAddr.ok) {
          dataAddr = await resAddr.json();
        }

        setUser(dataUser);
        setAddresses(dataAddr);
        setUsername(dataUser.username || "");
        setUserId(dataUser.userId || "");
        setIsLoggedIn(true);
        setIsAdmin(dataUser.userType === "ADMIN");

        // compute completeness
        const { completion, missing } = calculateCompleteness(dataUser, dataAddr);
        setProfileCompletion(completion);
        setMissingItems(missing);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    fetchData();
  }, [setDarkMode]);

  // Poll addresses every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchAddresses() {
        try {
          const resAddr = await fetch("/api/v1/users/addresses", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (resAddr.ok) {
            const dataAddr = await resAddr.json();
            setAddresses(dataAddr);
          }
        } catch (err) {
          console.error("Polling addresses error:", err);
        }
      }
      fetchAddresses();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Recompute completeness whenever user or addresses change
  useEffect(() => {
    const { completion, missing } = calculateCompleteness(user, addresses);
    setProfileCompletion(completion);
    setMissingItems(missing);
  }, [user, addresses]);

  // search submission
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
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  function handleResultClick(job) {
    window.location.href = `/SearchJobPost?jobId=${job.jobPostId}`;
  }

  // close search if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout
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
      navigate("/Login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 lava-lamp-background p-4 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between nav-container">
        
        {/* Left: Logo */}
        <Link to="/">
          <img
            src="/jb.png"
            alt="JobSpotter Logo"
            className="h-10 w-auto object-contain scale-500 mb-2"
          />
        </Link>

        {/* Middle Nav */}
        {isAdmin ? (
          <div className="flex-1 flex justify-center items-center gap-8">
            <Link to="/dashboard" className="text-white font-medium hover:underline">
              Dashboard
            </Link>
            <Link to="/searchreport" className="text-white font-medium hover:underline">
              Search Reports
            </Link>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center gap-8">
            {/* Single dropdown under the video */}
            <div className="relative group inline-block">
              <video
                src="/fox.mp4"
                className="w-12 h-12"
                autoPlay
                loop
                muted
              />
              {/* Main dropdown (on hover) */}
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800
                           border border-gray-200 dark:border-gray-600 rounded shadow-lg
                           transform origin-top scale-0 opacity-0 transition-all
                           ease-in-out duration-300 group-hover:scale-100
                           group-hover:opacity-100 p-3 z-50
                           flex flex-col items-start text-left space-y-2"
              >
                <div className="text-sm font-semibold text-black dark:text-white">
                  {profileCompletion}% Complete
                </div>
                {missingItems.length > 0 && (
                  <div className="text-xs text-gray-700 dark:text-gray-200">
                    Missing: {missingItems.join(", ")}
                  </div>
                )}

                {/* If 100% complete, show "Let's Get You Started" button */}
                {profileCompletion === 100 && (
                  <>
                    {/* The user must click to open the sub-menu */}
                    <button
                      className="w-full bg-green-500 text-white text-xs py-1 px-2 rounded text-center
                                 hover:bg-green-600"
                      onClick={() => setStartMenuOpen(!startMenuOpen)}
                    >
                      Let's Get You Started
                    </button>

                    {/* Sub-menu that appears ONLY if startMenuOpen is true */}
                    {startMenuOpen && (
                      <div className="w-full bg-white dark:bg-gray-800
                                      border border-gray-200 dark:border-gray-600
                                      rounded shadow-lg mt-2 flex flex-col">
                        <Link
                          to="/SearchJobPost"
                          className="block px-3 py-1 text-gray-700 dark:text-gray-100
                                     hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          Search for Jobs
                        </Link>
                        <Link
                          to="/MyJobs"
                          className="block px-3 py-1 text-gray-700 dark:text-gray-100
                                     hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          My Job Posts
                        </Link>
                        <Link
                          to="/JobPostHistory"
                          className="block px-3 py-1 text-gray-700 dark:text-gray-100
                                     hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          Job Post History
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-3 py-1 text-gray-700 dark:text-gray-100
                                     hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/data"
                          className="block px-3 py-1 text-gray-700 dark:text-gray-100
                                     hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          Data
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* "Jobs Available" */}
            <div className="relative group inline-block">
              <span className="inline-block px-3 py-2 text-white font-medium hover:underline">
                Jobs Available
              </span>
              <div
                className="absolute top-full mt-6 right-0 bg-white dark:bg-gray-800 
                           border border-gray-200 dark:border-gray-600 rounded shadow-lg 
                           transform origin-bottom scale-0 opacity-0 transition-all 
                           ease-in-out duration-300 group-hover:scale-100 
                           group-hover:opacity-100"
              >
                <Link
                  to="/SearchJobPost"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View All Jobs
                </Link>
                <Link
                  to="/JobPostHistory"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Job Post History
                </Link>
                <div className="h-px w-full bg-gray-300 dark:bg-gray-600" />
              </div>
            </div>

            {/* My Job Posts */}
            <div className="relative group inline-block">
              <span className="inline-block px-3 py-2 text-white font-medium hover:underline">
                My Job Posts
              </span>
              <div
                className="absolute top-full mt-6 right-0 bg-white dark:bg-gray-800 
                           border border-gray-200 dark:border-gray-600 rounded shadow-lg 
                           transform origin-bottom scale-0 opacity-0 transition-all 
                           ease-in-out duration-300 group-hover:scale-100 group-hover:opacity-100"
              >
                <Link
                  to="/MyJobs"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View My Jobs
                </Link>
                <Link
                  to="/SearchReviews"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Rating Review History
                </Link>
                <Link
                  to="/CreateJobPost"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Create Job Post
                </Link>
              </div>
            </div>

            <Link to="/data" className="text-white font-medium hover:underline">
              Data
            </Link>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex items-center" ref={searchRef}>
            {isExpanded ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-gray-100 dark:bg-gray-800 text-black dark:text-white 
                           rounded-full shadow-md overflow-hidden w-[400px]"
              >
                <div className="flex items-center px-3 w-2/3">
                  <Search className="text-gray-500 dark:text-gray-300" size={20} />
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2 focus:outline-none 
                               placeholder-gray-500 dark:placeholder-gray-400"
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
                    className="w-full bg-transparent px-3 py-2 focus:outline-none 
                               placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Location"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-500 
                               text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                  >
                    <Search className="text-white" size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow 
                           hover:opacity-80 transition duration-300"
                onClick={() => setIsExpanded(true)}
              >
                <Search className="text-white" size={24} />
              </button>
            )}

            {isExpanded && showResults && searchResults.length > 0 && (
              <div
                className="absolute top-full mt-6 left-0 bg-white dark:bg-gray-800 
                           border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50 
                           w-full transition-all ease-in-out duration-300"
              >
                {searchResults.map((job) => (
                  <div
                    key={job.jobPostId}
                    onClick={() => handleResultClick(job)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-100 
                               hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {job.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification */}
          <Notification />

          {/* Profile/Login */}
          {isCheckingAuth ? (
            <div className="text-white">Loading...</div>
          ) : !isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-green-700 px-4 py-2 text-white rounded-md hover:bg-green-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-lime-700 px-4 py-2 text-white rounded-md hover:bg-lime-800"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative group inline-block">
                <ProfilePicture userId={userId} darkMode={darkMode} />
                <div
                  className="absolute top-full mt-6 right-0 bg-white dark:bg-gray-800 
                             border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50 
                             transform origin-bottom scale-0 opacity-0 transition-all 
                             ease-in-out duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                               text-gray-700 dark:text-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                               text-gray-700 dark:text-gray-100"
                  >
                    Job Activity
                  </Link>
                  <Link
                    to="/Settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                               text-gray-700 dark:text-gray-100"
                  >
                    Settings
                  </Link>
                  <div className="h-px bg-gray-300 dark:bg-gray-600" />
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                               text-gray-700 dark:text-gray-100 cursor-pointer"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
              <span className="nav-username font-bold">{username}</span>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4 z-50">
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-7 flex-shrink-0 rounded-full cursor-pointer 
                         transition-colors bg-white dark:bg-gray-900"
            >
              <div
                className={`absolute top-1 left-1 h-5 w-5 flex items-center justify-center 
                           rounded-full bg-white dark:bg-gray-900 text-gray-700 dark:text-white 
                           shadow-md transform transition-transform ease-in-out duration-300 ${
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
