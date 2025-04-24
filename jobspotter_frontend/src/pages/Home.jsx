import { useEffect, useState } from "react";
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
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export function Home() {
  const [user, setUser] = useState(null);
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("card");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [tagMapping, setTagMapping] = useState(new Map());
  const [tagColors, setTagColors] = useState({});

  // Rotating messages
  const messages = [
    "Welcome to JobSpotter",
    "Looking for a job?",
    "We got you covered!",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  // Rotate messages every 4 seconds
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

  // Fetch user data
  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/v1/job-posts/tags", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
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

  // Process jobs with tags
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

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    fetch("/api/v1/job-posts/search?title=", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        const jobs = data.content || data;
        const processedJobs = tagMapping.size > 0 ? processJobs(jobs) : jobs;
        setJobPostsData(processedJobs);
        if (data.totalElements) setTotalElements(data.totalElements);
        if (data.totalPages) setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, [tagMapping]);

  // Get random color for tags
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
    let statusColor = "text-gray-400";
    let statusText = "N/A";
    let StatusIcon = FaCircle;

    switch (job.status) {
      case "OPEN":
        statusColor = "text-emerald-500";
        statusText = "Open";
        break;
      case "ASSIGNED":
        statusColor = "text-sky-500";
        statusText = "Assigned";
        break;
      case "IN_PROGRESS":
        statusColor = "text-amber-500";
        statusText = "In Progress";
        break;
      case "COMPLETED":
        statusColor = "text-gray-500";
        statusText = "Completed";
        break;
      case "CANCELLED":
        statusColor = "text-rose-500";
        statusText = "Cancelled";
        break;
      default:
        statusColor = "text-gray-400";
        statusText = "N/A";
    }

    return { statusColor, statusText, StatusIcon };
  }

  function getApplicantStatusInfo(job) {
    let applicantStatusColor = "text-gray-400";
    let applicantStatusText = job.applicantStatus || "N/A";

    switch (job.applicantStatus) {
      case "PENDING":
        applicantStatusColor = "text-amber-500";
        break;
      case "ACCEPTED":
        applicantStatusColor = "text-emerald-500";
        break;
      case "REJECTED":
        applicantStatusColor = "text-rose-500";
        break;
      default:
        applicantStatusColor = "text-gray-400";
    }
    return { applicantStatusColor, applicantStatusText };
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-xl font-semibold text-gray-600">
          <FaSearch className="text-emerald-500 text-4xl animate-magnifier" />
          <span>Loading...</span>
        </div>
        <style>
          {`
            @keyframes magnifierMove {
              0% { transform: translateX(-20px); }
              50% { transform: translateX(20px); }
              100% { transform: translateX(-20px); }
            }
            .animate-magnifier {
              animation: magnifierMove 2s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans scaled-container">
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
          .scaled-container {
            transform: scale(0.77);
            transform-origin: top center;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>

      {/* HERO SECTION */}
      <header className="relative w-full h-screen flex items-center justify-center bg-cover bg-center lava-lamp-background">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">JOBSPOTTER</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            JobSpotter is a simple yet powerful platform for professionals, startups, and businesses. Connect with local talent or discover new opportunities today!
          </p>
          <p
            className={`
              text-2xl md:text-4xl font-semibold text-white mb-10
              transition-all duration-700 ease-in-out
              ${slideIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
            `}
          >
            {messages[currentMessageIndex]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-8 py-3 text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Discover Jobs
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 text-lg border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-emerald-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Register Now
                </Link>
              </>
            ) : (
              <a
                href="#featured-jobs"
                className="px-8 py-3 text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Discover Jobs
              </a>
            )}
            <Link
              to={user ? "/searchjobpost" : "/login"}
              className="px-8 py-3 text-lg bg-sky-500 text-white rounded-full font-semibold shadow-lg hover:bg-sky-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* FEATURED JOBS */}
        <section id="featured-jobs" className="mb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="flex items-center">
                <FaFire style={{ fill: "url(#fireGradient)" }} className="mr-3 text-3xl" />
                Featured Jobs
              </span>
            </h2>
            <button
              onClick={() => setViewType(viewType === "card" ? "list" : "card")}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 flex items-center text-base font-medium transition-colors duration-200"
            >
              {viewType === "card" ? (
                <>
                  <FaList className="mr-2" />
                  List View
                </>
              ) : (
                <>
                  <FaTh className="mr-2" />
                  Card View
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="text-rose-500 mb-6 text-center text-lg font-medium">{errorMessage}</div>
          )}

          {jobPostsData.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No jobs found.</p>
          ) : (
            <div className={viewType === "card" ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-6"}>
              {jobPostsData.slice(0, 10).map((job) => {
                const { statusColor, statusText, StatusIcon } = getJobStatusInfo(job);
                const { applicantStatusColor, applicantStatusText } = getApplicantStatusInfo(job);

                return (
                  <Link
                    to={user ? `/job/${job.jobPostId}` : "/login"}
                    key={job.jobPostId}
                    className="block"
                  >
                    <div
                      className={`border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-300 ${
                        viewType === "card"
                          ? "hover:shadow-2xl hover:border-emerald-500 transform hover:-translate-y-1"
                          : "shadow-md"
                      } ${viewType === "list" ? "flex flex-col sm:flex-row" : ""}`}
                    >
                      <div className={viewType === "list" ? "p-6 flex-1" : "p-6"}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{job.title}</h3>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-rose-500" /> {job.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <MdDateRange className="text-sky-500" /> Posted:{" "}
                            {new Date(job.datePosted).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-2">
                            <FaUsers className="text-violet-500" /> Max Applicants: {job.maxApplicants}
                          </p>
                          <p className="flex items-center gap-2">
                            <FaRoute className="text-emerald-500" /> Distance:{" "}
                            {parseFloat(job.relevantDistance).toFixed(2)} km
                          </p>
                        </div>
                        <p className="mt-3 text-gray-600 line-clamp-3">
                          <strong>Description:</strong> {job.description}
                        </p>
                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {job.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTagColor(tag)}`}
                              >
                                {
                                  Array.from(tagMapping.entries()).find(
                                    ([key, value]) => value === tag
                                  )?.[0]
                                }
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className={viewType === "list" ? "p-6 border-t sm:border-t-0 sm:border-l border-gray-200" : "p-6 border-t border-gray-200 mt-auto"}>
                        <p className="flex items-center gap-2 text-gray-600">
                          <StatusIcon className={`${statusColor} text-lg`} />
                          <strong>Job Status:</strong>{" "}
                          <span className={`${statusColor}`}>{statusText}</span>
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 mt-2">
                          {job.applicantStatus === "PENDING" && (
                            <FaClock className={`${applicantStatusColor} text-lg`} />
                          )}
                          {job.applicantStatus === "ACCEPTED" && (
                            <FaCheckCircle className={`${applicantStatusColor} text-lg`} />
                          )}
                          {job.applicantStatus === "REJECTED" && (
                            <FaTimesCircle className={`${applicantStatusColor} text-lg`} />
                          )}
                          {job.applicantStatus !== "PENDING" &&
                            job.applicantStatus !== "ACCEPTED" &&
                            job.applicantStatus !== "REJECTED" && (
                              <FaCircle className={`${applicantStatusColor} text-lg`} />
                            )}
                          <strong>Applicant Status:</strong>{" "}
                          <span className={`${applicantStatusColor}`}>
                            {applicantStatusText}
                          </span>
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
        <section className="py-16 bg-white rounded-3xl mb-20 px-6 sm:px-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Why Choose JobSpotter?</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-gray-200 rounded-xl bg-white p-8 hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
              <FaBriefcase className="text-4xl text-emerald-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Local Jobs</h3>
              <p className="text-center text-gray-600">
                Find positions in your neighborhood or city with our location-based search.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl bg-white p-8 hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
              <FaSearch className="text-4xl text-sky-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Smart Search</h3>
              <p className="text-center text-gray-600">
                Quickly discover relevant jobs with advanced filters and tags.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl bg-white p-8 hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
              <FaClock className="text-4xl text-amber-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Fast Hiring</h3>
              <p className="text-center text-gray-600">
                Employers can connect with top applicants instantly.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl bg-white p-8 hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
              <FaDollarSign className="text-4xl text-rose-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Earn More</h3>
              <p className="text-center text-gray-600">
                Discover side gigs or high-paying full-time roles in your area.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-sky-600 text-white rounded-3xl">
          <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Find Your Next Opportunity?</h2>
            <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto">
              Join thousands of professionals who found their dream jobs through JobSpotter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 text-lg bg-white text-emerald-600 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Sign Up Now - It's Free!
              </Link>
              <Link
                to={user ? "/searchjobpost" : "/login"}
                className="px-8 py-3 text-lg border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-emerald-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Browse All Jobs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}