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
      "bg-red-400",
      "bg-red-500",
      "bg-yellow-400",
      "bg-yellow-500",
      "bg-green-400",
      "bg-green-500",
      "bg-blue-400",
      "bg-blue-500",
      "bg-purple-400",
      "bg-purple-500",
      "bg-pink-400",
      "bg-pink-500",
      "bg-indigo-400",
      "bg-indigo-500",
      "bg-teal-400",
      "bg-teal-500",
      "bg-cyan-400",
      "bg-cyan-500",
      "bg-orange-400",
      "bg-orange-500",
      "bg-lime-400",
      "bg-lime-500",
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
        statusColor = "text-green-500";
        statusText = "Open";
        break;
      case "ASSIGNED":
        statusColor = "text-blue-500";
        statusText = "Assigned";
        break;
      case "IN_PROGRESS":
        statusColor = "text-yellow-500";
        statusText = "In Progress";
        break;
      case "COMPLETED":
        statusColor = "text-gray-500";
        statusText = "Completed";
        break;
      case "CANCELLED":
        statusColor = "text-red-500";
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
        applicantStatusColor = "text-yellow-500";
        break;
      case "ACCEPTED":
        applicantStatusColor = "text-green-500";
        break;
      case "REJECTED":
        applicantStatusColor = "text-red-500";
        break;
      default:
        applicantStatusColor = "text-gray-400";
    }
    return { applicantStatusColor, applicantStatusText };
  }

  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen bg-white text-black">
      {/* HERO SECTION - Full width */}
      <header className="relative w-full h-screen flex items-center justify-center bg-cover bg-center lava-lamp-background">
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">JOBSPOTTER</h1>
          <p className="text-xl md:text-2xl mb-8 text-white max-w-4xl mx-auto">
            JobSpotter is an incredibly simple, yet powerful platform
            for professionals, startups, and established businesses.
            Connect with local talent or discover new opportunities today!
          </p>
          <p
            className={`
              text-3xl md:text-4xl font-semibold mb-10
              transition-all duration-700
              ${slideIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
          >
            {messages[currentMessageIndex]}
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* When not logged in, both Discover Jobs and Get Started go to /login */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-8 py-4 text-xl bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                  Discover Jobs
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-4 text-xl border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition transform hover:scale-105"
                >
                  Register Now
                </Link>
              </>
            ) : (
              // When logged in, Discover Jobs scrolls to the featured jobs section.
              <a
                href="#featured-jobs"
                className="px-8 py-4 text-xl bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition transform hover:scale-105"
              >
                Discover Jobs
              </a>
            )}
            <Link
              to={user ? "/searchjobpost" : "/login"}
              className="px-8 py-4 text-xl bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - Wider container */}
      <div className="w-full max-w-8xl mx-auto px-6 py-16">
        {/* FEATURED JOBS */}
        <section id="featured-jobs" className="mb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">
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
              className="px-6 py-3 rounded-lg bg-gray-200 text-black hover:bg-gray-300 flex items-center text-lg"
            >
              {viewType === "card" ? (
                <>
                  <FaList className="mr-3" />
                  List View
                </>
              ) : (
                <>
                  <FaTh className="mr-3" />
                  Card View
                </>
              )}
            </button>
          </div>

          {errorMessage && <div className="text-red-500 mb-6 text-center text-xl">{errorMessage}</div>}

          {jobPostsData.length === 0 ? (
            <p className="text-center text-xl">No jobs found.</p>
          ) : (
            <div className={viewType === "card" ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5" : "space-y-6"}>
              {jobPostsData.slice(0, 10).map((job) => {
                const { statusColor, statusText, StatusIcon } = getJobStatusInfo(job);
                const { applicantStatusColor, applicantStatusText } = getApplicantStatusInfo(job);

                return (
                  <Link
                    to={user ? `/job/${job.jobPostId}` : "/login"}
                    key={job.jobPostId}
                  >
                    <div
                      className={`card border-2 border-gray-200 ${
                        viewType === "card"
                          ? "hover:shadow-xl hover:border-green-500 transition-all duration-300"
                          : "rounded-xl shadow-lg"
                      } w-full h-full flex flex-col p-6 rounded-xl bg-white`}
                    >
                      <h3 className="text-2xl font-bold mb-3">{job.title}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="flex items-center gap-2 text-lg">
                          <FaMapMarkerAlt className="text-red-500" /> {job.address}
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                          <MdDateRange className="text-blue-500" /> Posted:{" "}
                          {new Date(job.datePosted).toLocaleDateString()}
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                          <FaUsers className="text-purple-500" /> Max Applicants: {job.maxApplicants}
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                          <FaRoute className="text-green-500" /> Distance:{" "}
                          {parseFloat(job.relevantDistance).toFixed(2)} km
                        </p>
                      </div>
                      <p className="mt-2 mb-4 text-lg">
                        <strong>Description:</strong>{" "}
                        {job.description.length > 120
                          ? job.description.slice(0, 120) + "..."
                          : job.description}
                      </p>
                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-3">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-3 py-1.5 rounded-full text-white text-sm ${getTagColor(tag)}`}
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

                      {/* Status Indicators */}
                      <div className="mt-auto pt-4 space-y-2">
                        <p className="flex items-center gap-2 text-lg">
                          <StatusIcon className={`${statusColor} text-xl`} />
                          <strong>Job Status:</strong>{" "}
                          <span className={`${statusColor}`}>{statusText}</span>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                          {job.applicantStatus === "PENDING" && (
                            <FaClock className={`${applicantStatusColor} text-xl`} />
                          )}
                          {job.applicantStatus === "ACCEPTED" && (
                            <FaCheckCircle className={`${applicantStatusColor} text-xl`} />
                          )}
                          {job.applicantStatus === "REJECTED" && (
                            <FaTimesCircle className={`${applicantStatusColor} text-xl`} />
                          )}
                          {job.applicantStatus !== "PENDING" &&
                            job.applicantStatus !== "ACCEPTED" &&
                            job.applicantStatus !== "REJECTED" && (
                              <FaCircle className={`${applicantStatusColor} text-xl`} />
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
        <section className="py-16 bg-gray-50 rounded-3xl mb-20 px-10">
          <h2 className="text-4xl font-bold mb-16 text-center">Why Choose JobSpotter?</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center">
            {/* 1. Local Jobs */}
            <div className="card border-2 border-gray-200 hover:shadow-xl hover:border-green-500 transition-all duration-300 w-full flex flex-col p-8 rounded-xl bg-white h-full">
              <FaBriefcase className="text-5xl text-green-500 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-center">Local Jobs</h3>
              <p className="text-center text-gray-600 text-lg">
                Find positions in your neighborhood or city with our location-based search.
              </p>
            </div>

            {/* 2. Smart Search */}
            <div className="card border-2 border-gray-200 hover:shadow-xl hover:border-green-500 transition-all duration-300 w-full flex flex-col p-8 rounded-xl bg-white h-full">
              <FaSearch className="text-5xl text-blue-500 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-center">Smart Search</h3>
              <p className="text-center text-gray-600 text-lg">
                Quickly discover relevant jobs with advanced filters and tags.
              </p>
            </div>

            {/* 3. Fast Hiring */}
            <div className="card border-2 border-gray-200 hover:shadow-xl hover:border-green-500 transition-all duration-300 w-full flex flex-col p-8 rounded-xl bg-white h-full">
              <FaClock className="text-5xl text-yellow-500 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-center">Fast Hiring</h3>
              <p className="text-center text-gray-600 text-lg">
                Employers can connect with top applicants instantly.
              </p>
            </div>

            {/* 4. Earn More */}
            <div className="card border-2 border-gray-200 hover:shadow-xl hover:border-green-500 transition-all duration-300 w-full flex flex-col p-8 rounded-xl bg-white h-full">
              <FaDollarSign className="text-5xl text-red-500 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-center">Earn More</h3>
              <p className="text-center text-gray-600 text-lg">
                Discover side gigs or high-paying full-time roles in your area.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION - Full width */}
        <section className="w-full py-20 bg-green-600 text-white rounded-3xl">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-8">Ready to find your next opportunity?</h2>
            <p className="text-2xl mb-10 max-w-4xl mx-auto">
              Join thousands of professionals who found their dream jobs through JobSpotter.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="px-10 py-5 text-xl bg-white text-green-600 rounded-lg shadow-xl hover:bg-gray-100 transition transform hover:scale-105 font-bold"
              >
                Sign Up Now - It's Free!
              </Link>
              <Link
                to={user ? "/searchjobpost" : "/login"}
                className="px-10 py-5 text-xl border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition transform hover:scale-105 font-bold"
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
