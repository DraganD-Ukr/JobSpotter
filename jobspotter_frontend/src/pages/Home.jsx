import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaRoute,
  FaFire,
  FaThumbsUp,
  FaBriefcase,
  FaSearch,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export function Home() {
  const [user, setUser] = useState(null);

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

  // Job and pagination states
  const [jobPostsData, setJobPostsData] = useState([]);
  const [viewType] = useState("card"); // Always card view here
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Tag mapping (for converting enum tags to friendly names)
  const [tagMapping, setTagMapping] = useState(new Map());
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

  // Convert tag enums to friendly names
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

  // Fetch jobs data
  useEffect(() => {
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
      });
  }, [tagMapping]);

  // Pagination handling (logic still here if needed, but no buttons shown)
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div className="my-10 main-content min-h-screen p-4 border-1 rounded-4xl">



      {/* HERO SECTION */}
      <header
        className="
          relative 
          w-full 
          h-screen 
          flex 
          rounded
          items-center 
          justify-center 
          bg-cover 
          bg-center lava-lamp-background 
        "
      >
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            JOBSPOTTER
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white">
            JobSpotter is an incredibly simple, yet powerful platform
            for professionals, startups, and established businesses.
            Connect with local talent or discover new opportunities today!
          </p>
          <p
            className={`
              text-2xl md:text-3xl font-semibold mb-8
              transition-all duration-700
              ${slideIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
          >
            {messages[currentMessageIndex]}
          </p>
          {!user && (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="#hot-jobs"
                className="px-6 py-3 text-lg bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
              >
                Discover Jobs
              </a>
              <Link
                to="/register"
                className="px-6 py-3 text-lg border border-white text-white rounded-md hover:bg-white hover:text-black transition"
              >
                Register Now
              </Link>
            </div>
          )}
          {/* New Get Started Button */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
            <Link
              to="/searchjobpost"
              className="px-6 py-3 text-lg bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-center">

            {/* 1. Local Jobs */}
            <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
              <FaBriefcase className="text-4xl text-green-500 mb-2 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Local Jobs</h3>
              <p className="text-center">
                Find positions in your neighborhood or city.
              </p>
            </div>

            {/* 2. Smart Search */}
            <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
              <FaSearch className="text-4xl text-blue-500 mb-2 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Smart Search</h3>
              <p className="text-center">
                Quickly discover relevant jobs with advanced filters.
              </p>
            </div>

            {/* 3. Fast Hiring */}
            <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
              <FaClock className="text-4xl text-yellow-400 mb-2 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Fast Hiring</h3>
              <p className="text-center">
                Employers can connect with top applicants instantly.
              </p>
            </div>

            {/* 4. Earn More */}
            <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
              <FaDollarSign className="text-4xl text-red-500 mb-2 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Earn More</h3>
              <p className="text-center">
                Discover side gigs or high-paying full-time roles.
              </p>
            </div>

          </div>
        </div>
      </section>




      {/* HOT JOBS */}
      <section id="hot-jobs" className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <svg width="0" height="0">
            <defs>
              <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          <span className="mr-2">
            <FaFire style={{ fill: "url(#fireGradient)" }} />
          </span>
          Hot Jobs
          <span className="ml-2">
            <FaFire style={{ fill: "url(#fireGradient)" }} />
          </span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {jobPostsData.slice(0, 3).map((job) => (
            <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
              <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {job.address}
                </p>
                <p className="flex items-center gap-1">
                  <MdDateRange className="text-blue-500" />{" "}
                  Posted: {new Date(job.datePosted).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RECOMMENDED JOBS */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-4 text-xl font-bold mb-4">
            <svg width="0" height="0">
              <defs>
                <linearGradient id="thumbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            <span className="animate-bounce">
              <FaThumbsUp style={{ fill: "url(#thumbGradient)" }} />
            </span>
            <h2 className="text-3xl font-bold">Recommended Jobs</h2>
            <span className="animate-bounce">
              <FaThumbsUp style={{ fill: "url(#thumbGradient)" }} />
            </span>
          </div>
          <p className="text-white">
            Hand‐picked opportunities tailored to your profile!
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {jobPostsData.slice(3, 6).map((job) => (
            <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
              <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {job.address}
                </p>
                <p className="flex items-center gap-1">
                  <MdDateRange className="text-blue-500" />{" "}
                  Posted: {new Date(job.datePosted).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ALL JOBS */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        {errorMessage && (
          <div className="text-red-400 mb-4 text-center">{errorMessage}</div>
        )}
        {jobPostsData.length === 0 ? (
          <p className="text-center text-white">No jobs found.</p>
        ) : (
          <div
            className={
              viewType === "card"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {jobPostsData.map((job) => (
              <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
                <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" /> {job.address}
                  </p>
                  <p className="flex items-center gap-1">
                    <MdDateRange className="text-blue-500" />{" "}
                    Posted: {new Date(job.datePosted).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaUsers className="text-purple-500" />{" "}
                    Max Applicants: {job.maxApplicants}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaRoute className="text-green-500" />{" "}
                    Distance: {parseFloat(job.relevantDistance).toFixed(2)} km
                  </p>
                  <p className="mt-2">
                    <strong>Description:</strong>{" "}
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + "..."
                      : job.description}
                  </p>
                  {job.tags && job.tags.length > 0 && (
                    <p className="my-3 text-sm">{job.tags.join(", ")}</p>
                  )}
                  <input type="hidden" value={job.jobPostId} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
