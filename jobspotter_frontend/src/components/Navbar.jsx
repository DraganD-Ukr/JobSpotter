import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import trollImage from "../assets/troll.jpg";
import { ThemeContext } from "./ThemeContext";
import Notification from "./Notification";
import ProfilePicture from "../components/ProfilePicture";

/*  helpers  */
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

/*  component  */
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);

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

  /*  initial data load  */
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
    })  
  ();
  },   
[]);

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

  /* close on outside click */
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

  /* actions */
  const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);

  const logout = async () => {
    try {
      await fetch("/api/v1/users/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      navigate("/Login");
    } catch (e) {
      console.error("logout error:", e);
    }
  };

  /* render */
  return (
    <nav className="sticky top-0 z-50 lava-lamp-background p-4 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between nav-container">
        {/* Logo */}
        <Link to="/">
          <img
            src="/jb.png"
            alt="JobSpotter Logo"
            className="h-10 w-auto object-contain mb-2 scale-500"
          />
        </Link>

        {/* Middle Nav */}
        {isLoggedIn && isAdmin ? (
          <div className="flex-1 flex justify-center items-center gap-8">
            <Link
              to="/dashboard"
              className="text-white font-medium hover:underline"
            >
              Dashboard
            </Link>
            <Link
              to="/searchreport"
              className="text-white font-medium hover:underline"
            >
              Search Reports
            </Link>
          </div>
        ) : isLoggedIn ? (
          <div className="flex-1 flex justify-center items-center gap-8">
            {/* Profile Completeness */}
            <div className="relative group inline-block">
              <video src="/fox.mp4" className="w-12 h-12" autoPlay loop muted />
              <div
                className={`absolute top-[calc(100%+1rem)] right-0 w-48 rounded-lg shadow-lg z-50 p-3
                  ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
                  transform origin-top scale-0 opacity-0 transition-all duration-300
                  group-hover:scale-100 group-hover:opacity-100`}
              >
                <div className="text-sm font-semibold">
                  {profileCompletion}% Complete
                </div>
                {missingItems.length > 0 && (
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Missing: {missingItems.join(", ")}
                  </div>
                )}
                {profileCompletion === 100 && (
                  <>
                    <button
                      className="w-full bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 mt-1"
                      onClick={() => setStartMenuOpen(!startMenuOpen)}
                    >
                      Let's Get You Started
                    </button>
                    {startMenuOpen && (
                      <div
                        className={`w-full rounded-lg shadow-lg mt-2 flex flex-col
                        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      >
                        <Link
                          to="/SearchJobPost"
                          className={`block px-3 py-1 text-sm ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          Search for Jobs
                        </Link>
                        <Link
                          to="/MyJobs"
                          className={`block px-3 py-1 text-sm ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          My Job Posts
                        </Link>
                        <Link
                          to="/JobPostHistory"
                          className={`block px-3 py-1 text-sm ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          Job Post History
                        </Link>
                        <Link
                          to="/profile"
                          className={`block px-3 py-1 text-sm ${
                            darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-black"
                          }`}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/data"
                          className={`block px-3 py-1 text-sm ${
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
              <span className="px-3 py-2 text-white font-medium hover:underline">
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
                  className={`block px-4 py-2 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View All Jobs
                </Link>
                <Link
                  to="/JobPostHistory"
                  className={`block px-4 py-2 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View Job Post History
                </Link>
              </div>
            </div>

            {/* My Job Posts */}
            <div className="relative group inline-block">
              <span className="px-3 py-2 text-white font-medium hover:underline">
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
                  className={`block px-4 py-2 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View My Jobs
                </Link>
                <Link
                  to="/SearchReviews"
                  className={`block px-4 py-2 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  View Rating Review History
                </Link>
                <Link
                  to="/CreateJobPost"
                  className={`block px-4 py-2 ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  Create Job Post
                </Link>
              </div>
            </div>

            <Link to="/data" className="text-white font-medium hover:underline">
              Data
            </Link>
          </div>
        ) : null}

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative flex items-center" ref={searchRef}>
            {isExpanded ? (
              <form
                onSubmit={(e) => e.preventDefault()}
                className={`flex items-center rounded-full shadow-md overflow-hidden w-[400px] relative border
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <div className="flex flex-col w-2/3 relative">
                  <div className="flex items-center px-3">
                    <Search
                      className={`text-gray-500 ${
                        darkMode ? "dark:text-gray-300" : ""
                      }`}
                      size={20}
                    />
                    <input
                      type="text"
                      className={`w-full bg-transparent px-3 py-2 focus:outline-none placeholder-gray-500 ${
                        darkMode ? "dark:placeholder-gray-300" : ""
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
                      className={`absolute top-[calc(100%+1rem)] left-0 w-full border rounded-md shadow-md z-50
                      ${
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
                          className={`px-4 py-2 cursor-pointer ${
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
                      darkMode ? "dark:placeholder-gray-300" : ""
                    }`}
                    placeholder="Location"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition"
                onClick={() => setIsExpanded(true)}
              >
                <Search className="text-white" size={24} />
              </button>
            )}

            {isExpanded && showResults && (searchResults.length || myJobResults.length) && (
              <div
                className={`absolute top-[calc(100%+1rem)] left-0 rounded-lg shadow-lg z-50 w-[400px] p-2 border
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                style={{ minHeight: "150px" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p
                    className={`text-sm font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {searchResults.length + myJobResults.length} job(s) found
                  </p>
                  <button
                    onClick={() => setShowResults(false)}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Close
                  </button>
                </div>
                <div
                  className={`flex flex-col divide-y ${
                    darkMode ? "divide-gray-700" : "divide-gray-300"
                  }`}
                >
                  {[...searchResults, ...myJobResults].map((job) => {
                    const isMine = myJobPosts.some(
                      (j) => j.jobPostId === job.jobPostId
                    );
                    return (
                      <div
                        key={job.jobPostId}
                        onClick={() =>
                          (window.location.href = `/SearchJobPost?jobId=${job.jobPostId}`)
                        }
                        className={`py-2 cursor-pointer ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <h2
                          className={`text-sm font-bold ${
                            darkMode ? "text-gray-50" : "text-gray-800"
                          }`}
                        >
                          {job.title} – {isMine ? "My Jobs" : "Search JobPost"}
                        </h2>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-200" : "text-gray-600"
                          }`}
                        >
                          {job.description
                            ? `${job.description.slice(0, 60)}…`
                            : "No description."}
                        </p>
                      </div>
                    );
                  })}
                </div>
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
                  className={`absolute top-[calc(100%+1rem)] right-0 rounded-lg shadow-lg z-50
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  }
                  transform origin-top scale-0 opacity-0 transition-all duration-300
                  group-hover:scale-100 group-hover:opacity-100`}
                >
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 ${
                      darkMode
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="#"
                    className={`block px-4 py-2 ${
                      darkMode
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    Job Activity
                  </Link>
                  <Link
                    to="/Settings"
                    className={`block px-4 py-2 ${
                      darkMode
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    Settings
                  </Link>
                  <div className={`h-px ${darkMode ? "bg-gray-700" : "bg-gray-300"}`} />
                  <div
                    onClick={logout}
                    className={`block px-4 py-2 cursor-pointer ${
                      darkMode
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    Sign Out
                  </div>
                </div>
              </div>
              <span className="nav-username font-bold text-white">{username}</span>
            </div>
          )}

          {/* Dark Mode Toggle */}
          {isLoggedIn && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition
                ${
                  darkMode
                    ? "border border-gray-500"
                    : "border border-gray-300"
                }`}
            >
              {darkMode ? (
                <Moon className="text-white" size={18} />
              ) : (
                <Sun className="text-white" size={18} />
              )}
            </button>
          )}

          {/* Language Switcher */}
          {isLoggedIn && (
            <select
              onChange={handleLanguageChange}
              value={i18n.language}
              className={`px-2 py-1 rounded-md border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          )}
        </div>
      </div>
    </nav>
  );
}
