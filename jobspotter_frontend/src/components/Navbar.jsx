import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import trollImage from "../assets/troll.jpg";
import { ThemeContext } from "./ThemeContext";
import Notification from "./Notification";
import ProfilePicture from "../components/ProfilePicture";

/* helpers */
function getJobStatusInfo(job) {
  switch (job.status) {
    case "OPEN":
      return { statusColor: "text-green-500", statusText: "OPEN" };
    case "ASSIGNED":
      return { statusColor: "text-blue-500", statusText: "ASSIGNED" };
    case "IN_PROGRESS":
      return { statusColor: "text-yellow-500", statusText: "IN_PROGRESS" };
    case "COMPLETED":
      return { statusColor: "text-gray-500", statusText: "COMPLETED" };
    case "CANCELLED":
      return { statusColor: "text-red-500", statusText: "CANCELLED" };
    default:
      return { statusColor: "text-gray-400", statusText: "N/A" };
  }
}

function calculateCompleteness(user, addresses) {
  if (!user) return { completion: 0, missing: [] };

  const checks = [
    ["First Name", user.firstName],
    ["Last Name", user.lastName],
    ["Email", user.email],
    ["Phone Number", user.phoneNumber],
    ["About", user.about],
    ["Address", addresses?.length > 0 ? "✓" : ""],
  ];

  const filled = checks.filter(([, v]) => v?.toString().trim()).length;
  const missing = checks
    .filter(([, v]) => !v?.toString().trim())
    .map(([label]) => label);

  return { completion: Math.round((filled / checks.length) * 100), missing };
}

/* component */
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const languageRef = useRef(null);

  /* authentication / profile */
  const [isExpanded, setIsExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [missingItems, setMissingItems] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  /* search */
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [myJobPosts, setMyJobPosts] = useState([]);
  const [myJobResults, setMyJobResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  /* language switcher */
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  /* initial data load */
  useEffect(() => {
    (async () => {
      try {
        /* user info */
        const resUser = await fetch("/api/v1/users/me", {
          method: "GET",
          credentials: "include",
        });
        if (!resUser.ok) throw new Error("user fetch failed");
        const dataUser = await resUser.json();

        /* addresses */
        const resAddr = await fetch("/api/v1/users/addresses", {
          method: "GET",
          credentials: "include",
        });
        const dataAddr = resAddr.ok ? await resAddr.json() : [];

        /* my job posts */
        const resMy = await fetch("/api/v1/job-posts/my-job-posts", {
          method: "GET",
          credentials: "include",
        });
        const rawMyJobs = resMy.ok ? await resMy.json() : [];
        const normMyJobs = Array.isArray(rawMyJobs.content)
          ? rawMyJobs.content
          : rawMyJobs;

        /* set state */
        setUser(dataUser);
        setAddresses(dataAddr);
        setMyJobPosts(normMyJobs);
        setUsername(dataUser.username || "");
        setUserId(dataUser.userId || "");
        setIsLoggedIn(true);
        setIsAdmin(dataUser.userType === "ADMIN");

        const { completion, missing } = calculateCompleteness(dataUser, dataAddr);
        setProfileCompletion(completion);
        setMissingItems(missing);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    })();
  }, []);

  /* recompute profile completeness */
  useEffect(() => {
    const { completion, missing } = calculateCompleteness(user, addresses);
    setProfileCompletion(completion);
    setMissingItems(missing);
  }, [user, addresses]);

  /* sync darkMode */
  useEffect(() => {
    const listener = (e) => e.key === "theme" && setDarkMode(e.newValue === "dark");
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, [setDarkMode]);

  /* public search + suggestions + debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      const q = searchTerm.trim();
      if (!q) {
        setSearchResults([]);
        setSuggestions([]);
        return;
      }

      Promise.all([
        fetch(`/api/v1/job-posts/search?title=${encodeURIComponent(q)}`, {
          credentials: "include",
        })
          .then((r) => r.json())
          .then((d) => d.content ?? d),
        fetch(
          `/api/v1/job-posts/title-suggestions?title=${encodeURIComponent(q)}`,
          {
            credentials: "include",
          }
        )
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d : [])),
      ])
        .then(([searchData, suggestionsData]) => {
          setSearchResults(searchData);
          setSuggestions(suggestionsData);
          setMyJobResults(
            q
              ? myJobPosts.filter((j) =>
                  j.title?.toLowerCase().includes(q.toLowerCase())
                )
              : []
          );
          setShowResults(
            Boolean(
              q &&
                (searchData.length ||
                  myJobPosts.filter((j) =>
                    j.title?.toLowerCase().includes(q.toLowerCase())
                  ).length)
            )
          );
        })
        .catch(console.error);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, myJobPosts]);

  /* close on outside click for search */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsExpanded(false);
        setShowResults(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close on outside click for language menu */
  useEffect(() => {
    const handler = (e) => {
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* actions */
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const logout = async () => {
    try {
      // First clear notification data
      sessionStorage.removeItem('unreadNotifications');
      
      // Then send logout request to server
      await fetch("/api/v1/users/auth/logout", {
        method: "POST",
        credentials: "include",
      });
  
      // Clear all user state
      setUsername("");
      setUserId("");
      setIsLoggedIn(false);
      setUser(null);
      setAddresses([]);
      setProfileCompletion(0);
      setMissingItems([]);
      setIsAdmin(false);
  
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      
      // Redirect with cache busting
      navigate("/Login?logout=true&t=" + Date.now());
      
      // Force full reload to ensure clean state
      window.location.reload();
    } catch (e) {
      console.error("Logout error:", e);
      // Fallback cleanup if logout fails
      setIsLoggedIn(false);
      navigate("/Login");
    }
  };

  /* render */
  return (
    <nav className="sticky top-0 z-50 lava-lamp-background py-3 px-4 md:px-6 shadow-lg relative flex justify-between items-center nav-container">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center overflow-visible"
      >
        <img
          src="/jb.png"
          alt="JobSpotter Logo"
          className="
            h-10 md:h-12         
            w-auto
            object-contain
            transform
            scale-375       
            origin-left       
            filter drop-shadow-md
          "
        />
      </Link>

      {/* Middle Section */}
      {isAdmin ? (
        <div className="flex-1 flex justify-center items-center gap-3 md:gap-6 mx-2">
          <Link
            to="/dashboard"
            className="text-white font-medium hover:underline hover:text-green-300 transition-all duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/searchreport"
            className="text-white font-medium hover:underline hover:text-green-300 transition-all duration-300"
          >
            Search Reports
          </Link>
        </div>
      ) : isLoggedIn ? (
        <div className="flex-1 flex justify-center items-center gap-3 md:gap-6 mx-2">
          {/* Profile Completeness */}
          <div className="relative group inline-block">
            <video src="/fox.mp4" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-green-400 shadow-lg transform transition-all duration-300 hover:scale-110" autoPlay loop muted />
            <div
              className={`absolute top-[calc(100%+1rem)] right-0 w-64 rounded-lg shadow-lg z-50 p-4 border
              ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
              transform origin-top scale-0 opacity-0 transition-all duration-300
              group-hover:scale-100 group-hover:opacity-100`}
            >
              <div className="text-sm font-semibold mb-2">
                {profileCompletion}% Profile Complete
              </div>
              {missingItems.length > 0 && (
                <div
                  className={`text-xs mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Missing: {missingItems.join(", ")}
                </div>
              )}
              {profileCompletion === 100 && (
                <>
                  <button
                    className="w-full bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition-colors duration-300 mt-1"
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                  >
                    Let's Get You Started
                  </button>
                  {startMenuOpen && (
                    <div
                      className={`w-full rounded-lg shadow-lg mt-2 flex flex-col overflow-hidden
                      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                    >
                      <Link
                        to="/SearchJobPost"
                        className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                          darkMode
                            ? "hover:bg-gray-700 text-white"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        Search for Jobs
                      </Link>
                      <Link
                        to="/MyJobs"
                        className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                          darkMode
                            ? "hover:bg-gray-700 text-white"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        My Job Posts
                      </Link>
                      <Link
                        to="/JobPostHistory"
                        className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                          darkMode
                            ? "hover:bg-gray-700 text-white"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        Job Post History
                      </Link>
                      <Link
                        to="/profile"
                        className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                          darkMode
                            ? "hover:bg-gray-700 text-white"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/data"
                        className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                          darkMode
                            ? "hover:bg-gray-700 text-white"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        Data
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Jobs Available */}
          <div className="relative group inline-block">
            <span className="px-3 md:px-4 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 hover:text-green-300 hover:shadow-md">
              Jobs Available
            </span>
            <div
              className={`absolute top-[calc(100%+1rem)] right-0 rounded-lg shadow-lg z-50
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}
              transform origin-top scale-0 opacity-0 transition-all duration-300
              group-hover:scale-100 group-hover:opacity-100`}
            >
              <Link
                to="/SearchJobPost"
                className={`block px-4 py-2 transition-colors duration-200 ${
                  darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                View All Jobs
              </Link>
              <Link
                to="/JobPostHistory"
                className={`block px-4 py-2 transition-colors duration-200 ${
                  darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                View Job History
              </Link>
            </div>
          </div>

          {/* My Job Posts */}
          <div className="relative group inline-block">
            <span className="px-3 md:px-4 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 hover:text-green-300 hover:shadow-md">
              My Job Posts
            </span>
            <div
              className={`absolute top-[calc(100%+1rem)] right-0 rounded-lg shadow-lg z-50
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}
              transform origin-top scale-0 opacity-0 transition-all duration-300
              group-hover:scale-100 group-hover:opacity-100`}
            >
              <Link
                to="/MyJobs"
                className={`block px-4 py-2 transition-colors duration-200 ${
                  darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                View My Jobs
              </Link>
              <Link
                to="/SearchReviews"
                className={`block px-4 py-2 transition-colors duration-200 ${
                  darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                View Rating Reviews
              </Link>
              <Link
                to="/CreateJobPost"
                className={`block px-4 py-2 transition-colors duration-200 ${
                  darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                Create Job Post
              </Link>
            </div>
          </div>

          <Link to="/data" className="text-white font-medium relative px-3 md:px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:text-green-300 hover:shadow-md">
            Data
          </Link>
        </div>
      ) : null}

      {/* Right Side */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search */}
        <div className="relative flex items-center" ref={searchRef}>
          {isExpanded ? (
            <form
              onSubmit={(e) => e.preventDefault()}
              className={`flex items-center rounded-full shadow-md overflow-hidden w-[300px] md:w-[400px] relative border transition-all duration-300
              ${darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
              }`}
            >
              <div className="flex flex-col w-2/3 relative">
                <div className="flex items-center px-3">
                  <Search
                    className={`text-gray-500 ${darkMode ? "text-gray-300" : ""}`}
                    size={18}
                  />
                  <input
                    type="text"
                    className={`w-full bg-transparent px-3 py-2 focus:outline-none placeholder-gray-500 ${darkMode ? "placeholder-gray-300" : ""}`}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() =>
                      (searchResults.length || myJobResults.length) &&
                      setShowResults(true)
                    }
                  />
                </div>
                {suggestions.length > 0 && (
                  <ul
                    className={`absolute top-[calc(100%+1rem)] left-0 w-full border rounded-md shadow-md z-50
                    ${darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                    }`}
                  >
                    {suggestions.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          setSearchTerm(item);
                          setSuggestions([]);
                        }}
                        className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                className={`w-px h-8 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              />

              <div className="flex items-center px-3 w-1/3 gap-2">
                <img
                  src={trollImage}
                  alt="Location"
                  className="w-6 h-6 rounded-full"
                />
                <input
                  type="text"
                  className={`w-full bg-transparent px-3 py-2 focus:outline-none placeholder-gray-500 ${
                    darkMode ? "placeholder-gray-300" : ""
                  }`}
                  placeholder="Location"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-lime-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-sm"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          ) : (
            <button
              className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsExpanded(true)}
            >
              <Search className="text-white" size={24} />
            </button>
          )}

          {isExpanded && showResults && (searchResults.length || myJobResults.length) && (
            <div
              className={`absolute top-[calc(100%+1rem)] left-0 rounded-lg shadow-lg z-50 w-[300px] md:w-[400px] p-2 border
              ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              style={{ minHeight: "150px" }}
            >
              <div className="flex justify-between items-center mb-2">
                <p
                  className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                >
                  {searchResults.length + myJobResults.length} job(s) found
                </p>
                <button
                  onClick={() => setShowResults(false)}
                  className={`${darkMode
                    ? "text-gray-300 hover:text-gray-100"
                    : "text-gray-500 hover:text-gray-800"
                  } transition-colors duration-200`}
                >
                  Close
                </button>
              </div>
              <div
                className={`flex flex-col divide-y ${darkMode ? "divide-gray-700" : "divide-gray-300"}`}
              >
                {[...myJobResults, ...searchResults].map((job) => {
                  const isMyJob = myJobPosts.some(
                    (j) => j.jobPostId === job.jobPostId
                  );
                  return (
                    <Link
                      key={job.jobPostId}
                      to={`/job/${job.jobPostId}`}
                      className={`p-2 hover:bg-opacity-10 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded transition-colors duration-200`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm truncate max-w-[200px] md:max-w-[250px]">
                            {job.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getJobStatusInfo(job).statusColor} bg-opacity-20`}
                          >
                            {getJobStatusInfo(job).statusText}
                          </span>
                          <span className={`text-xs mt-1 ${isMyJob ? "text-green-400" : "text-blue-400"}`}>
                            {isMyJob ? "My Jobs" : "Search JobPost"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300" />
          ) : (
            <Moon className="text-white hover:text-gray-200 transition-colors duration-300" />
          )}
        </button>

        {/* Notification */}
        {isLoggedIn && <Notification />}

        {/* Language Switch */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle language menu"
          >
            <Globe className="text-white" size={24} />
          </button>
          {isLanguageMenuOpen && (
            <div
              className={`absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg z-50 overflow-hidden
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <button
                onClick={() => handleLanguageChange("en")}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                {t("English")}
              </button>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                {t("French")}
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        {isLoggedIn ? (
          <div className="relative group">
            <div className="cursor-pointer">
              <ProfilePicture userId={userId} size="sm" />
            </div>
            <div
              className={`absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg z-50 overflow-hidden transform origin-top scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`px-4 py-3 text-sm border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <p className="font-medium truncate">{username}</p>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  className={`block px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className={`block px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="text-white hover:text-green-300 transition-colors duration-300"
            >
              Login
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/register"
              className="text-white hover:text-green-300 transition-colors duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}