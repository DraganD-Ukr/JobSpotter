import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUsers, FaRoute } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export function Home() {
  const [user, setUser] = useState(null);

  // Messages to rotate through
  const messages = [
    "Welcome to JobSpotter",
    "Looking for a job?",
    "We got you covered!",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  // Rotate messages every 4 seconds, re-trigger slide animation each time
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

  // State for job posts and pagination
  const [jobPostsData, setJobPostsData] = useState([]);
  const [viewType, setViewType] = useState("card");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // State for dynamic tag mapping
  const [tagMapping, setTagMapping] = useState(new Map());

  // Fetch tags from the API and set up the tagMapping (friendlyName -> enum value)
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
            // Here the friendly name is the key and the enum value is the value
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
          // Attempt to read the tag value from different possible keys
          const enumVal = tagObj.tagName || tagObj.name || tagObj.value;
          // Look for a friendly name in the tagMapping; if not found, fallback to the enum value
          return tagMapping.get(enumVal) || enumVal;
        });
      }
      return { ...job, tags: friendlyTags };
    });
  }

  // Fetch job posts from the search endpoint and process them with friendly tags
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

  // Dummy pagination functions (assuming you have these implemented elsewhere)
  function handlePageChange(newPage) {
    setPage(newPage);
  }
  function renderPaginationButtons() {
    // (Keep your current pagination button logic here if you have it.)
    return null;
  }

  return (
    <div className="main-content min-h-screen p-4">
      {/* Banner Section */}
      <div className="mt-20 mb-20 lava-lamp-background object-contain h-25 p-2 rounded-lg shadow-2xl flex justify-center items-center">
        <img
          src="/jb.png"
          alt="JobSpotter Logo"
          className="mb-6 object-contain h-110"
        />
      </div>

      {/* Welcome Section */}
      <div className="max-w-2xl mx-auto text-center">
        <h1
          className={`
            text-5xl font-extrabold text-lime-600 mb-4
            transform transition-transform ease-in-out duration-1000
            ${slideIn ? "translate-x-0" : "-translate-x-64"}
          `}
        >
          {messages[currentMessageIndex]}
        </h1>
        <p className="text-xl mb-6">
          Find your ideal job or side hustle today and connect with local opportunities!
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-3 text-white bg-green-600 rounded-lg text-lg hover:bg-green-700 transition"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-6 py-3 text-green-600 border border-green-600 rounded-lg text-lg hover:bg-green-50 transition"
            >
              Register Now
            </a>
          </div>
        )}
      </div>

      {/* Hot Jobs Section */}
      <div className="mt-16 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Hot Jobs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {jobPostsData.slice(0, 3).map((job) => (
            <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
              <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {job.address}
                </p>
                <p className="flex items-center gap-1">
                  <MdDateRange className="text-blue-500" /> Posted:{" "}
                  {new Date(job.datePosted).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <div className="mt-16 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Recommended Jobs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {jobPostsData.slice(3, 6).map((job) => (
            <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
              <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {job.address}
                </p>
                <p className="flex items-center gap-1">
                  <MdDateRange className="text-blue-500" /> Posted:{" "}
                  {new Date(job.datePosted).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Job Posts Section (Now at the bottom, "Search returned X job posts" removed) */}
      <div className="mt-16 w-full max-w-6xl mx-auto">
        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
        {jobPostsData.length === 0 ? (
          <p className="text-center">No jobs found.</p>
        ) : (
          <div
            className={
              viewType === "card"
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                : "max-w-6xl mx-auto space-y-4"
            }
          >
            {jobPostsData.map((job) => (
              <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
                <div
                  className={`card border border-gray-300 ${
                    viewType === "card"
                      ? "hover:shadow-md hover:border-green-500 transition"
                      : "rounded-lg shadow"
                  } w-full ${viewType === "card" ? "max-w-sm" : ""} flex flex-col p-4 rounded-lg`}
                >
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" /> {job.address}
                  </p>
                  <p className="flex items-center gap-1">
                    <MdDateRange className="text-blue-500" /> Posted:{" "}
                    {new Date(job.datePosted).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaUsers className="text-purple-500" /> Max Applicants:{" "}
                    {job.maxApplicants}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaRoute className="text-green-500" /> Distance:{" "}
                    {parseFloat(job.relevantDistance).toFixed(2)} km
                  </p>
                  <p className="mt-2">
                    <strong>Description:</strong>{" "}
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + "..."
                      : job.description}
                  </p>
                  {job.tags && job.tags.length > 0 && (
                    <p className="my-3 text-sm">
                      {job.tags.join(", ")}
                    </p>
                  )}
                  <input type="hidden" value={job.jobPostId} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="w-32 px-4 py-2 mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
          id="navigate-page"
          style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)" }}
        >
          Previous
        </button>

        {renderPaginationButtons()}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1 || jobPostsData.length === 0}
          className="w-26 px-4 py-2 ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
          id="navigate-page"
          style={{ clipPath: "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
