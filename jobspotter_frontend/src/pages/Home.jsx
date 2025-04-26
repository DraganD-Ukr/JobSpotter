import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaRoute,
  FaFire,
  FaBriefcase,
  FaSearch,
  FaClock,
  FaDollarSign,
  FaList,
  FaTh,
  FaCircle,
  FaEye, // Added FaEye icon for view count
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { ThemeContext } from "../components/ThemeContext";

export function Home() {
  const { darkMode } = useContext(ThemeContext);

  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("card");
  const [tagMapping, setTagMapping] = useState(new Map());
  const [tagColors, setTagColors] = useState({});

  const messages = [
    "Welcome to JobSpotter",
    "Looking for a job?",
    "We got you covered!",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setSlideIn(true);
      }, 500);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [messages.length]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/v1/job-posts/tags", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch tags");
        const tagsData = await res.json();

        const newTagMap = new Map();
        Object.keys(tagsData).forEach((enumValue) => {
          const friendlyName = tagsData[enumValue];
          if (friendlyName) {
            newTagMap.set(friendlyName, enumValue);
          }
        });
        setTagMapping(newTagMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  function processJobs(jobs) {
    return jobs.map((job) => {
      let friendlyTags = [];
      if (Array.isArray(job.tags)) {
        friendlyTags = job.tags.map((tagObj) => {
          const enumVal = tagObj.tagName || tagObj.name || tagObj.value;
          return tagMapping.get(enumVal) || enumVal;
        });
      }
      return { ...job, tags: friendlyTags };
    });
  }

  useEffect(() => {
    setLoading(true);
    fetch("/api/v1/job-posts/top-10", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top 10 jobs");
        return res.json();
      })
      .then((data) => {
        const jobs = Array.isArray(data) ? data : data.content || [];
        const processedJobs = processJobs(jobs);
        setJobPostsData(processedJobs.slice(0, 10)); // Ensure only top 10 jobs are displayed
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, [tagMapping]);

  const getRandomColor = () => {
    const colors = [
      "bg-emerald-500",
      "bg-sky-500",
      "bg-rose-500",
      "bg-amber-500",
      "bg-violet-500",
      "bg-teal-500",
      "bg-fuchsia-500",
      "bg-orange-500",
      "bg-lime-500",
      "bg-cyan-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getTagColor = (tag) => {
    if (tagColors[tag]) {
      return tagColors[tag];
    } else {
      const newColor = getRandomColor();
      setTagColors((prev) => ({
        ...prev,
        [tag]: newColor,
      }));
      return newColor;
    }
  };

  function getJobStatusInfo(job) {
    // Since JobPostTop10 doesn't include a status field, we'll assume a default "OPEN" status for display purposes
    let statusColor = darkMode ? "text-emerald-400" : "text-emerald-500";
    let statusText = "Open";
    let StatusIcon = FaCircle;

    return { statusColor, statusText, StatusIcon };
  }

  // Function to calculate distance using Haversine formula (approximation for UI display)
  function calculateDistance(lat1, lon1, lat2 = 0, lon2 = 0) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Return distance in km, rounded to 2 decimal places
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className={`flex flex-col items-center gap-3 text-xl font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"} xs:text-lg sm:text-xl`}>
          <FaSearch className={`${darkMode ? "text-emerald-400" : "text-emerald-500"} text-3xl xs:text-4xl animate-magnifier`} />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 xs:p-6 sm:p-8 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"} font-sans`}>
      <style>
        {`
          .lava-lamp-background {
            background-image: linear-gradient(135deg, #34d399 0%, #3b82f6 100%);
            background-size: 200% 200%;
            animation: gradientFlow 15s ease infinite;
          }
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* HERO SECTION */}
      <header className="relative w-full h-[80vh] xs:h-[70vh] sm:h-[60vh] flex items-center justify-center lava-lamp-background rounded-2xl mb-12 xs:mb-16 overflow-hidden">
        <div className="relative z-10 text-center px-4 xs:px-6 sm:px-8 max-w-5xl xs:max-w-6xl mx-auto">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 xs:mb-6 tracking-tight">
            JOBSPOTTER
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-6 xs:mb-8 max-w-3xl xs:max-w-4xl mx-auto leading-relaxed text-gray-100">
            JobSpotter is a simple yet powerful platform for professionals, startups, and businesses. Connect with local talent or discover new opportunities today!
          </p>
          <p
            className={`
              text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 xs:mb-10
              transition-all duration-700 ease-in-out
              ${slideIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
            `}
          >
            {messages[currentMessageIndex]}
          </p>
          <div className="flex flex-col gap-3 xs:flex-row xs:justify-center xs:gap-3 sm:gap-4">
            <a
              href="#featured-jobs"
              className="px-6 py-2 xs:px-8 xs:py-3 text-base xs:text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Discover Jobs
            </a>
            <Link
              to="/register"
              className="px-6 py-2 xs:px-8 xs:py-3 text-base xs:text-lg bg-sky-500 text-white rounded-full font-semibold shadow-md hover:bg-sky-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="@container max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-10 py-10 xs:py-12 sm:py-16">
        {/* FEATURED JOBS */}
        <section id="featured-jobs" className="mb-12 xs:mb-16">
          <div className="flex justify-between items-center mb-6 xs:mb-8">
            <h2 className={`text-2xl xs:text-3xl sm:text-4xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="darkFireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="flex items-center">
                <FaFire
                  style={{ fill: `url(#${darkMode ? "darkFireGradient" : "fireGradient"})` }}
                  className="mr-2 xs:mr-3 text-2xl xs:text-3xl"
                />
                Top 10 Jobs
              </span>
            </h2>
            <button
              onClick={() => setViewType(viewType === "card" ? "list" : "card")}
              className={`px-3 py-1 xs:px-4 xs:py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-gray-200 hover:bg-gray-300 text-gray-900"} flex items-center text-sm xs:text-base font-medium transition-colors duration-300`}
            >
              {viewType === "card" ? (
                <>
                  <FaList className="mr-1 xs:mr-2" />
                  List View
                </>
              ) : (
                <>
                  <FaTh className="mr-1 xs:mr-2" />
                  Card View
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <div className={`${darkMode ? "text-rose-400" : "text-rose-500"} mb-6 text-center text-base xs:text-lg font-medium`}>{errorMessage}</div>
          )}

          {jobPostsData.length === 0 ? (
            <p className={`text-center text-base xs:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>No jobs found.</p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "@container grid gap-4 xs:gap-5 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 @lg:gap-6"
                  : "space-y-3 xs:space-y-4"
              }
            >
              {jobPostsData.map((job) => {
                const { statusColor, statusText, StatusIcon } = getJobStatusInfo(job);
                const distance = calculateDistance(job.latitude, job.longitude);

                return (
                  <Link
                    to={`/job/${job.jobPostId}`}
                    key={job.jobPostId}
                    className="block card-animation"
                  >
                    <div
                      className={`border rounded-md transition-all duration-300 ${
                        viewType === "card"
                          ? "hover:shadow-2xl transform hover:-translate-y-0.5 @md:p-5 @lg:p-6"
                          : "shadow-sm flex flex-col xs:flex-row"
                      } ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}
                    >
                      <div className={viewType === "list" ? "p-3 xs:p-4 flex-1" : "p-3 xs:p-4"}>
                        <h3 className={`text-base xs:text-lg font-semibold mb-1 xs:mb-2 line-clamp-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {job.title}
                        </h3>
                        <div className={`space-y-1 text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <p className="flex items-center gap-1 xs:gap-1.5">
                            <FaMapMarkerAlt className={`${darkMode ? "text-rose-400" : "text-rose-500"}`} /> {job.address}
                          </p>
                          <p className="flex items-center gap-1 xs:gap-1.5">
                            <MdDateRange className={`${darkMode ? "text-sky-400" : "text-sky-500"}`} /> Posted:{" "}
                            {new Date(job.datePosted).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-1 xs:gap-1.5">
                            <FaUsers className={`${darkMode ? "text-violet-400" : "text-violet-500"}`} /> Applicants: {job.applicantsCount}/{job.maxApplicants}
                          </p>
                          <p className="flex items-center gap-1 xs:gap-1.5">
                            <FaRoute className={`${darkMode ? "text-emerald-400" : "text-emerald-500"}`} /> Distance: {distance} km
                          </p>
                          <p className="flex items-center gap-1 xs:gap-1.5">
                            <FaEye className={`${darkMode ? "text-amber-400" : "text-amber-500"}`} /> Views: {job.viewCount}
                          </p>
                        </div>
                        <p className={`mt-2 line-clamp-2 text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <strong className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}>Description:</strong> {job.description}
                        </p>
                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 xs:gap-1.5 mt-2">
                            {job.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2 py-0.5 rounded-full text-xs xs:text-sm font-medium ${getTagColor(tag)} text-white`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        className={
                          viewType === "list"
                            ? "p-3 xs:p-4 border-t xs:border-t-0 xs:border-l border-gray-200 dark:border-gray-600"
                            : "p-3 xs:p-4 border-t border-gray-200 dark:border-gray-600 mt-auto"
                        }
                      >
                        <p className={`flex items-center gap-1 xs:gap-1.5 text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <StatusIcon className={`${statusColor} text-base`} />
                          <strong className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}>Job Status:</strong>{" "}
                          <span className={`${statusColor}`}>{statusText}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* FEATURES SECTION */}
        <section className={`@container py-10 xs:py-12 rounded-2xl mb-12 xs:mb-16 px-4 xs:px-6 sm:px-10 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 xs:mb-8 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            Why Choose JobSpotter?
          </h2>
          <div className="grid gap-4 xs:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 @lg:gap-8">
            <div className={`border rounded-md transition-all duration-300 p-4 xs:p-6 hover:shadow-2xl transform hover:-translate-y-0.5 @md:p-8 ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaBriefcase className={`text-3xl xs:text-4xl ${darkMode ? "text-emerald-400" : "text-emerald-500"} mb-2 xs:mb-3 mx-auto`} />
              <h3 className={`text-base xs:text-lg font-semibold mb-1 xs:mb-2 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Local Jobs
              </h3>
              <p className={`text-center text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Find positions in your neighborhood or city with our location-based search.
              </p>
            </div>
            <div className={`border rounded-md transition-all duration-300 p-4 xs:p-6 hover:shadow-2xl transform hover:-translate-y-0.5 @md:p-8 ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaSearch className={`text-3xl xs:text-4xl ${darkMode ? "text-sky-400" : "text-sky-500"} mb-2 xs:mb-3 mx-auto`} />
              <h3 className={`text-base xs:text-lg font-semibold mb-1 xs:mb-2 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Smart Search
              </h3>
              <p className={`text-center text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Quickly discover relevant jobs with advanced filters and tags.
              </p>
            </div>
            <div className={`border rounded-md transition-all duration-300 p-4 xs:p-6 hover:shadow-2xl transform hover:-translate-y-0.5 @md:p-8 ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaClock className={`text-3xl xs:text-4xl ${darkMode ? "text-amber-400" : "text-amber-500"} mb-2 xs:mb-3 mx-auto`} />
              <h3 className={`text-base xs:text-lg font-semibold mb-1 xs:mb-2 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Fast Hiring
              </h3>
              <p className={`text-center text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Employers can connect with top applicants instantly.
              </p>
            </div>
            <div className={`border rounded-md transition-all duration-300 p-4 xs:p-6 hover:shadow-2xl transform hover:-translate-y-0.5 @md:p-8 ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaDollarSign className={`text-3xl xs:text-4xl ${darkMode ? "text-rose-400" : "text-rose-500"} mb-2 xs:mb-3 mx-auto`} />
              <h3 className={`text-base xs:text-lg font-semibold mb-1 xs:mb-2 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Earn More
              </h3>
              <p className={`text-center text-sm xs:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Discover side gigs or high-paying full-time roles in your area.
              </p>
            </div>
          </div>
        </section>
        
        {/* CALL TO ACTION */}
        <section className="py-12 xs:py-16 lava-lamp-background rounded-2xl relative">
          <div className="relative z-10 max-w-5xl xs:max-w-6xl mx-auto text-center px-4 xs:px-6 sm:px-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 xs:mb-6 text-white">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-base xs:text-lg sm:text-xl mb-6 xs:mb-8 max-w-3xl xs:max-w-4xl mx-auto text-gray-100">
              Join thousands of professionals who found their dream jobs through JobSpotter.
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:justify-center xs:gap-3 sm:gap-4">
              <Link
                to="/register"
                className="px-6 py-2 xs:px-8 xs:py-3 text-base xs:text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Sign Up Now It's Free!
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 xs:px-8 xs:py-3 text-base xs:text-lg bg-sky-500 text-white rounded-full font-semibold shadow-md hover:bg-sky-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse All Jobs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}