import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Globe, Menu, X } from "lucide-react";
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

  /* mobile menu */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      sessionStorage.removeItem('unreadNotifications');
      await fetch("/api/v1/users/auth/logout", {
        method: "POST",
        credentials: "include",
      });
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
      navigate("/Login?logout=true&t=" + Date.now());
      window.location.reload();
    } catch (e) {
      console.error("Logout error:", e);
      setIsLoggedIn(false);
      navigate("/Login");
    }
  };

  /* render */
  return (
    <nav className="sticky top-0 z-50 lava-lamp-background py-2 xs:py-3 sm:py-3 px-4 xs:px-6 sm:px-8 shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
      {/* Logo */}
      <div className="flex justify-between items-center w-full sm:w-auto">
        <Link to="/" className="flex items-center">
          <img
            src="/jb.png"
            alt="JobSpotter Logo"
            className="h-8 xs:h-10 sm:h-12 w-auto object-contain transform scale-375 origin-left filter drop-shadow-md"
          />
        </Link>
        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} xs:size={24} /> : <Menu size={20} xs:size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row flex-1 justify-center items-center gap-2 xs:gap-3 sm:gap-6 mt-2 xs:mt-3 sm:mt-0`}
      >
        {isAdmin ? (
          <>
            <Link
              to="/dashboard"
              className="text-white font-medium hover:underline hover:text-green-300 transition-all duration-300 py-1 xs:py-2 sm:py-0 text-xs xs:text-sm sm:text-base"
            >
              Dashboard
            </Link>
            <Link
              to="/searchreport"
              className="text-white font-medium hover:underline hover:text-green-300 transition-all duration-300 py-1 xs:py-2 sm:py-0 text-xs xs:text-sm sm:text-base"
            >
              Search Reports
            </Link>
          </>
        ) : isLoggedIn ? (
          <>
            {/* Profile Completeness */}
            <div className="relative group inline-block">
              <video
                src="/fox.mp4"
                className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 rounded-full object-cover border-2 border-green-400 shadow-lg transform transition-all duration-300 hover:scale-110"
                autoPlay
                loop
                muted
              />
              <div
                className={`absolute top-full sm:top-[calc(100%+0.5rem)] right-0 w-56 xs:w-64 rounded-lg shadow-lg z-50 p-2 xs:p-3 sm:p-4 border mt-1 xs:mt-2 sm:mt-0 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                } transform origin-top scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100`}
              >
                <div className="text-xs xs:text-sm sm:text-sm font-semibold mb-1 xs:mb-2 sm:mb-2">
                  {profileCompletion}% Profile Complete
                </div>
                {missingItems.length > 0 && (
                  <div
                    className={`text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Missing: {missingItems.join(", ")}
                  </div>
                )}
                {profileCompletion === 100 && (
                  <>
                    <button
                      className="w-full bg-green-500 text-white text-xs xs:text-sm sm:text-sm py-1 xs:py-1.5 sm:py-1 px-2 xs:px-3 sm:px-3 rounded hover:bg-green-600 transition-colors duration-300 mt-1"
                      onClick={() => setStartMenuOpen(!startMenuOpen)}
                    >
                      Let's Get You Started
                    </button>
                    {startMenuOpen && (
                      <div
                        className={`w-full rounded-lg shadow-lg mt-1 xs:mt-2 sm:mt-2 flex flex-col overflow-hidden ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <Link
                          to="/SearchJobPost"
                          className={`block px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          Search for Jobs
                        </Link>
                        <Link
                          to="/MyJobs"
                          className={`block px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          My Job Posts
                        </Link>
                        <Link
                          to="/JobPostHistory"
                          className={`block px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          Job Post History
                        </Link>
                        <Link
                          to="/profile"
                          className={`block px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          My Profile
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Jobs Available */}
            <div className="relative group inline-block">
              <span className="px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-1 xs:gap-2 sm:gap-2 hover:text-green-300 hover:shadow-md text-xs xs:text-sm sm:text-base">
                Jobs Available
              </span>
              <div
                className={`absolute top-full sm:top-[calc(100%+0.5rem)] right-0 rounded-lg shadow-lg z-50 mt-1 xs:mt-2 sm:mt-0 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                } transform origin-top scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100`}
              >
                <Link
                  to="/SearchJobPost"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View All Jobs
                </Link>
                <Link
                  to="/JobPostHistory"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
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
              <span className="px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-1 xs:gap-2 sm:gap-2 hover:text-green-300 hover:shadow-md text-xs xs:text-sm sm:text-base">
                My Job Posts
              </span>
              <div
                className={`absolute top-full sm:top-[calc(100%+0.5rem)] right-0 rounded-lg shadow-lg z-50 mt-1 xs:mt-2 sm:mt-0 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                } transform origin-top scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100`}
              >
                <Link
                  to="/MyJobs"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View My Jobs
                </Link>
                <Link
                  to="/SearchReviews"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View Rating Reviews
                </Link>
                <Link
                  to="/CreateJobPost"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  Create Job Post
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 mt-2 xs:mt-3 sm:mt-0">
        {/* Search */}
        <div className="relative flex items-center" ref={searchRef}>
          {isExpanded ? (
            <div
              className={`flex items-center rounded-full shadow-md overflow-hidden w-[200px] xs:w-[250px] sm:w-[400px] border transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            >
              <div className="flex flex-col w-2/3 relative">
                <div className="flex items-center px-2 xs:px-3 sm:px-3">
                  <Search
                    className={`text-gray-500 ${darkMode ? "text-gray-300" : ""}`}
                    size={16} xs:size={18} sm:size={20}
                  />
                  <input
                    type="text"
                    className={`w-full bg-transparent px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 focus:outline-none placeholder-gray-500 text-xs xs:text-sm sm:text-base ${
                      darkMode ? "placeholder-gray-300" : ""
                    }`}
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
                    className={`absolute top-full sm:top-[calc(100%+0.5rem)] left-0 w-full border rounded-md shadow-md z-50 mt-1 xs:mt-2 sm:mt-0 ${
                      darkMode
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
                        className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 cursor-pointer text-xs xs:text-sm sm:text-sm transition-colors duration-200 ${
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
                className={`w-px h-6 xs:h-8 sm:h-8 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              />
              <div className="flex items-center px-2 xs:px-3 sm:px-3 w-1/3 gap-1 xs:gap-2 sm:gap-2">
                <img
                  src={trollImage}
                  alt="Location"
                  className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 rounded-full"
                />
                <input
                  type="text"
                  className={`w-full bg-transparent px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 focus:outline-none placeholder-gray-500 text-xs xs:text-sm sm:text-sm ${
                    darkMode ? "placeholder-gray-300" : ""
                  }`}
                  placeholder="Location"
                />
                <button
                  className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-sm"
                >
                  <Search size={14} xs:size={16} sm:size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-gradient-to-r from-green-500 to-lime-500 p-2 xs:p-2.5 sm:p-2 rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsExpanded(true)}
            >
              <Search className="text-white" size={16} xs:size={20} sm:size={24} />
            </button>
          )}
          {isExpanded && showResults && (searchResults.length || myJobResults.length) && (
            <div
              className={`absolute top-full sm:top-[calc(100%+0.5rem)] left-0 rounded-lg shadow-lg z-50 w-[200px] xs:w-[250px] sm:w-[400px] p-2 xs:p-3 sm:p-3 border mt-1 xs:mt-2 sm:mt-0 max-h-[50vh] xs:max-h-[60vh] sm:max-h-[70vh] overflow-y-auto ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            >
              <div className="flex justify-between items-center mb-1 xs:mb-2 sm:mb-2">
                <p
                  className={`text-xs xs:text-sm sm:text-sm font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {searchResults.length + myJobResults.length} job(s) found
                </p>
                <button
                  onClick={() => setShowResults(false)}
                  className={`text-xs xs:text-sm sm:text-sm ${
                    darkMode
                      ? "text-gray-300 hover:text-gray-100"
                      : "text-gray-500 hover:text-gray-800"
                  } transition-colors duration-200`}
                >
                  Close
                </button>
              </div>
              <div
                className={`flex flex-col divide-y ${
                  darkMode ? "divide-gray-700" : "divide-gray-300"
                }`}
              >
                {[...myJobResults, ...searchResults].map((job) => {
                  const isMyJob = myJobPosts.some(
                    (j) => j.jobPostId === job.jobPostId
                  );
                  return (
                    <Link
                      key={job.jobPostId}
                      to={`/job/${job.jobPostId}`}
                      className={`p-1 xs:p-2 sm:p-2 hover:bg-opacity-10 ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      } rounded transition-colors duration-200`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-xs xs:text-sm sm:text-sm">{job.title}</h3>
                          <p className="text-xs xs:text-xs sm:text-xs truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[250px]">
                            {job.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`text-xs xs:text-xs sm:text-xs px-1 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 rounded-full ${
                              getJobStatusInfo(job).statusColor
                            } bg-opacity-20`}
                          >
                            {getJobStatusInfo(job).statusText}
                          </span>
                          <span
                            className={`text-xs xs:text-xs sm:text-xs mt-0.5 xs:mt-1 sm:mt-1 ${
                              isMyJob ? "text-green-400" : "text-blue-400"
                            }`}
                          >
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
          className="p-1 xs:p-2 sm:p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300" size={16} xs:size={20} sm:size={24} />
          ) : (
            <Moon className="text-white hover:text-gray-200 transition-colors duration-300" size={16} xs:size={20} sm:size={24} />
          )}
        </button>

        {/* Notification */}
        {isLoggedIn && <Notification />}

        {/* Language Switch */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="bg-gradient-to-r from-green-500 to-lime-500 p-1 xs:p-2 sm:p-2 rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle language menu"
          >
            <Globe className="text-white" size={16} xs:size={20} sm:size={24} />
          </button>
          {isLanguageMenuOpen && (
            <div
              className={`absolute right-0 top-full mt-1 xs:mt-2 sm:mt-2 w-32 rounded-lg shadow-lg z-50 overflow-hidden ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
              }`}
            >
              <button
                onClick={() => handleLanguageChange("en")}
                className={`block w-full text-left px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                {t("English")}
              </button>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={`block w-full text-left px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm ${
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
              <ProfilePicture userId={userId} size="sm" darkMode={darkMode} />
            </div>
            <div
              className={`absolute right-0 top-full mt-1 xs:mt-2 sm:mt-2 w-48 rounded-md shadow-lg z-50 overflow-hidden transform origin-top scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 text-xs xs:text-sm sm:text-sm border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <p className="font-medium truncate">{username}</p>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className={`block px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className={`block w-full text-left px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm ${
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
          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-2">
            <Link
              to="/login"
              className="text-white hover:text-green-300 transition-colors duration-300 text-xs xs:text-sm sm:text-base"
            >
              Login
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/register"
              className="text-white hover:text-green-300 transition-colors duration-300 text-xs xs:text-sm sm:text-base"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}