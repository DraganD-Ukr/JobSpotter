import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaList,
  FaTh,
  FaTag,
  FaMapMarkerAlt,
  FaUsers,
  FaRoute,
  FaCircle,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { ThemeContext } from "../components/ThemeContext";

export function MyJobs() {
  const [tagMapping, setTagMapping] = useState(new Map());
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/v1/job-posts/tags", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
        }
        const tagsData = await res.json();

        const newTagMap = new Map();
        Object.keys(tagsData).forEach((enumValue) => {
          const friendlyName = tagsData[enumValue];
          if (friendlyName) {
            newTagMap.set(friendlyName, enumValue);
          } else {
            console.warn(`Tag object missing friendlyName for enumValue: ${enumValue}`);
          }
        });
        setTagMapping(newTagMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [viewType, setViewType] = useState("card");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    latitude: "",
    longitude: "",
    radius: 50,
    sortBy: "latest",
    jobStatus: ""
  });

  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [tagColors, setTagColors] = useState({});
  const getTagColor = (tag) => {
    if (tagColors[tag]) {
      return tagColors[tag];
    } else {
      const colors = [
        "bg-red-400", "bg-red-500",
        "bg-yellow-400", "bg-yellow-500",
        "bg-green-400", "bg-green-500",
        "bg-blue-400", "bg-blue-500",
        "bg-purple-400", "bg-purple-500",
        "bg-pink-400", "bg-pink-500",
        "bg-indigo-400", "bg-indigo-500",
        "bg-teal-400", "bg-teal-500",
        "bg-cyan-400", "bg-cyan-500",
        "bg-orange-400", "bg-orange-500",
        "bg-lime-400", "bg-lime-500",
      ];
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setTagColors((prev) => ({ ...prev, [tag]: newColor }));
      return newColor;
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, [page, filters.sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchMyJobs() {
    setLoading(true);
    const size = 9;
    const endpoint = `/api/v1/job-posts/my-job-posts?pageNumber=${page}&size=${size}&sortBy=${filters.sortBy}`;

    fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch my jobs");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(processJobs(data));
          setTotalElements(data.length);
          setTotalPages(1);
        } else {
          const jobsArray = data.content || [];
          setJobs(processJobs(jobsArray));
          setTotalPages(data.totalPages || 1);
          setTotalElements(data.totalElements || jobsArray.length);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  function processJobs(jobArray) {
    return jobArray.map((job) => {
      let friendlyTags = [];
      if (Array.isArray(job.tags)) {
        friendlyTags = job.tags.map((enumVal) => {
          const raw =
            typeof enumVal === "string"
              ? enumVal
              : enumVal.tagName || enumVal.name || enumVal.value;
          const match = [...tagMapping.entries()].find(
            ([, enumKey]) => enumKey === raw
          );
          return match ? match[0] : raw;
        });
      }
      return { ...job, tags: friendlyTags };
    });
  }

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

  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    fetchMyJobs();
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTag(tag) {
    if (tag && !filters.tags.includes(tag)) {
      setFilters((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  }
  function handleRemoveTag(tag) {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  function handleLocationSearch() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFilters((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function handleViewDetails(jobId) {
    navigate(`/myJob/${jobId}`);
  }

  function handlePageChange(newPage) {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  }

  function renderPaginationButtons() {
    const buttons = [];
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      let startPage = Math.max(0, page - Math.floor(maxButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxButtons);
      if (endPage - startPage < maxButtons) {
        startPage = Math.max(0, endPage - maxButtons);
      }
      if (startPage > 0) {
        buttons.unshift(
          <button
            key="start-ellipsis"
            onClick={() => handlePageChange(startPage - 1)}
            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400"
          >
            ...
          </button>
        );
      }
      for (let i = startPage; i < endPage; i++) {
        buttons.push(renderPageButton(i));
      }
      if (endPage < totalPages) {
        buttons.push(
          <button
            key="end-ellipsis"
            onClick={() => handlePageChange(endPage)}
            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400"
          >
            ...
          </button>
        );
      }
    }
    return buttons;
  }

  function renderPageButton(i) {
    return (
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-4 py-2 mx-1 rounded-full ${
          page === i
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-black hover:bg-gray-400"
        }`}
      >
        {i + 1}
      </button>
    );
  }

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen">
        <p>Loading your jobs...</p>
      </div>
    );
  }

  return (
    // 1) Use a wide, centered container (max-w-7xl) to match SearchJobPost width.
    <div
      className={`min-h-screen py-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Top search bar + toggle, matching style from SearchJobPost */}
        <div className="flex justify-center mb-8">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              value={filters.title}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Search your jobs by title..."
              className="px-4 py-2 border rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
            >
              Search
            </button>
          </form>
          <button
            onClick={toggleView}
            className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center ml-4"
            id="toggle-view"
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

        <div className="flex">
          {/* 2) Filters on the left. Make it narrower or the same ratio as SearchJobPost */}
          <div className="w-1/4 pr-8 border-r mr-8">
            <h3 className="text-xl font-bold mb-4">Filters</h3>
            <form onSubmit={handleSearchSubmit}>
              {/* Tag Filter */}
              <div className="mb-4 p-4 border rounded-md">
                <label className="block mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {filters.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full flex items-center ${getTagColor(tag)}`}
                    >
                      <FaTag className="mr-2" />
                      <span className="mr-2">
                        {Array.from(tagMapping.entries()).find(
                          ([, val]) => val === tag
                        )?.[0] || tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  name="tags"
                  value=""
                  onChange={(e) => handleAddTag(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select a tag</option>
                  {Array.from(tagMapping.keys()).map((tag) => (
                    <option key={tag} value={tagMapping.get(tag)}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Status Filter */}
              <div className="mb-4 p-4 border rounded-md">
                <label className="block mb-2">Job Status</label>
                <select
                  name="jobStatus"
                  value={filters.jobStatus}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select a status</option>
                  <option value="OPEN">Open</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-4 p-4 border rounded-md">
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address (lat,lng)"
                  className="w-full px-4 py-2 border rounded-md mb-2"
                  onChange={(e) => {
                    const [lat, lng] = e.target.value.split(",");
                    setFilters((prev) => ({
                      ...prev,
                      latitude: parseFloat(lat),
                      longitude: parseFloat(lng),
                    }));
                  }}
                />
                <button
                  type="button"
                  onClick={handleLocationSearch}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Use Current Location
                </button>
                {filters.latitude && filters.longitude && (
                  <p className="text-sm text-green-500 mt-2 text-center">
                    Using your current location
                  </p>
                )}
              </div>

              {/* Radius Filter */}
              <div className="mb-4 p-4 border rounded-md">
                <label
                  htmlFor="distance-range-slider"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Radius (km)
                </label>
                <div className="relative w-full">
                  <input
                    id="distance-range-slider"
                    type="range"
                    name="radius"
                    min="0"
                    max="500"
                    value={filters.radius}
                    onChange={handleFilterChange}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 ${
                        filters.radius / 5
                      }%, #d1d5db ${filters.radius / 5}%)`,
                    }}
                  />
                  <div className="absolute w-full top-4 flex justify-between">
                    {[0, 100, 200, 300, 400, 500].map((value) => (
                      <div key={value} className="relative">
                        <div className="w-0.5 h-3 bg-gray-500 mx-auto"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  {[0, 100, 200, 300, 400, 500].map((value) => (
                    <span key={value} className="w-8 text-center">
                      {value}
                    </span>
                  ))}
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  Radius: {filters.radius} km
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Apply Filters
              </button>
            </form>
          </div>

          {/* 3) Jobs listing on the right, fill the remaining space */}
          <div className="w-3/4">
            <div className="flex flex-col items-start mb-8">
              <h2 className="text-2xl font-bold text-left mb-4">
                {totalElements >= 1
                  ? `Search returned ${totalElements} job posts`
                  : "No job posts found"}
              </h2>
            </div>

            {errorMessage && (
              <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
            )}

            {jobs.length === 0 ? (
              <p className="text-center">No jobs found.</p>
            ) : (
              <div
                className={
                  viewType === "card"
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }
              >
                {jobs.map((job) => {
                  const { statusColor, statusText, StatusIcon } = getJobStatusInfo(job);
                  const { applicantStatusColor, applicantStatusText } =
                    getApplicantStatusInfo(job);

                  return (
                    <div
                      key={job.jobPostId}
                      className={`border border-gray-300 ${
                        viewType === "card"
                          ? "hover:shadow-md hover:border-green-500 transition rounded-md p-4"
                          : "rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between"
                      }`}
                    >
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      {job.address && (
                        <p className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-red-500" /> {job.address}
                        </p>
                      )}
                      {job.datePosted && (
                        <p className="flex items-center gap-1">
                          <MdDateRange className="text-blue-500" /> Posted:{" "}
                          {new Date(job.datePosted).toLocaleDateString()}
                        </p>
                      )}
                      {typeof job.maxApplicants !== "undefined" && (
                        <p className="flex items-center gap-1">
                          <FaUsers className="text-purple-500" /> Max Applicants:{" "}
                          {job.maxApplicants}
                        </p>
                      )}
                      {typeof job.relevantDistance !== "undefined" && (
                        <p className="flex items-center gap-1">
                          <FaRoute className="text-green-500" /> Distance:{" "}
                          {parseFloat(job.relevantDistance).toFixed(2)} km
                        </p>
                      )}
                      <p className="mt-2">
                        <strong>Description:</strong>{" "}
                        {job.description && job.description.length > 100
                          ? job.description.slice(0, 100) + "..."
                          : job.description}
                      </p>
                      {job.tags && job.tags.length > 0 && (
                        <p className="my-3 text-sm">
                          <strong>Tags:</strong> {job.tags.join(", ")}
                        </p>
                      )}

                      {/* Status Indicators */}
                      <p className="flex items-center mt-2 gap-1">
                        <StatusIcon className={`${statusColor} mr-1`} />
                        <strong className="mr-2">Job Status:</strong>
                        <span className={statusColor}>{statusText}</span>
                      </p>
                      <p className="flex items-center mt-2 gap-1">
                        {job.applicantStatus === "PENDING" && (
                          <FaClock className={`${applicantStatusColor} mr-1`} />
                        )}
                        {job.applicantStatus === "ACCEPTED" && (
                          <FaCheckCircle
                            className={`${applicantStatusColor} mr-1`}
                          />
                        )}
                        {job.applicantStatus === "REJECTED" && (
                          <FaTimesCircle
                            className={`${applicantStatusColor} mr-1`}
                          />
                        )}
                        {job.applicantStatus !== "PENDING" &&
                          job.applicantStatus !== "ACCEPTED" &&
                          job.applicantStatus !== "REJECTED" && (
                            <FaCircle className={`${applicantStatusColor} mr-1`} />
                          )}
                        <strong>Applicant Status:</strong>{" "}
                        <span className={applicantStatusColor}>
                          {applicantStatusText}
                        </span>
                      </p>

                      <div className="mt-4">
                        <button
                          onClick={() => handleViewDetails(job.jobPostId)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                        >
                          View More Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                  className="w-32 px-4 py-2 mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
                  id="navigate-page"
                  style={{
                    clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)"
                  }}
                >
                  Previous
                </button>
                {renderPaginationButtons()}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages - 1}
                  className="w-26 px-4 py-2 ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
                  id="navigate-page"
                  style={{
                    clipPath: "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)"
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
