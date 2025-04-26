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
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../components/ThemeContext";

export function MyJobs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  // ---------------- TAG MAPPING (Dynamic via API) ----------------
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

        // STORE the mapping as enumValue -> friendlyName
        const newTagMap = new Map();
        Object.keys(tagsData).forEach((enumValue) => {
          const friendlyName = tagsData[enumValue];
          if (friendlyName) {
            newTagMap.set(enumValue, friendlyName);
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
  const [pageSize, setPageSize] = useState(9);
  const [filters, setFilters] = useState({
    title: "",
    tags: [],     
    latitude: "",
    longitude: "",
    radius: 50,
    sortBy: "latest",
    jobStatus: "",
  });

  // ---------------- TAG COLOR HELPERS (for UI) ----------------
  const [tagColors, setTagColors] = useState({});
  function getRandomColor() {
    const colors = [
      "bg-red-400", "bg-red-500", "bg-yellow-400", "bg-yellow-500",
      "bg-green-400", "bg-green-500", "bg-blue-400", "bg-blue-500",
      "bg-purple-400", "bg-purple-500", "bg-pink-400", "bg-pink-500",
      "bg-indigo-400", "bg-indigo-500", "bg-teal-400", "bg-teal-500",
      "bg-cyan-400", "bg-cyan-500", "bg-orange-400", "bg-orange-500",
      "bg-lime-400", "bg-lime-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function getTagColor(tag) {
    if (tagColors[tag]) {
      return tagColors[tag];
    }
    const newColor = getRandomColor();
    setTagColors((prev) => ({ ...prev, [tag]: newColor }));
    return newColor;
  }

  // ---------------- Collapsable Filters (Tags, Status) ----------------
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(false);
  const [isStatusCollapsed, setIsStatusCollapsed] = useState(false);
  const toggleTagsCollapse = () => setIsTagsCollapsed(!isTagsCollapsed);
  const toggleStatusCollapse = () => setIsStatusCollapsed(!isStatusCollapsed);

  // -------------- MAIN DATA FETCH (INCLUDES FILTERS) --------------
  useEffect(() => {
    fetchMyJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.sortBy]);

  function fetchMyJobs() {
    setLoading(true);

    // Build a query string that includes all filters
    const urlParams = new URLSearchParams();

    // Title
    if (filters.title) {
      urlParams.append("title", filters.title);
    }
    // Tags
    if (filters.tags.length > 0) {
      urlParams.append("tags", filters.tags.join(",")); 
    }
    // Location & radius
    if (filters.latitude && filters.longitude) {
      urlParams.append("latitude", filters.latitude);
      urlParams.append("longitude", filters.longitude);
      urlParams.append("radius", filters.radius);
    }
    // Job Status
    if (filters.jobStatus) {
      urlParams.append("jobStatus", filters.jobStatus);
    }
    // Sorting & pagination
    urlParams.append("pageNumber", page);
    urlParams.append("size", 9);
    urlParams.append("sortBy", filters.sortBy);

    const endpoint = `/api/v1/job-posts/my-job-posts?${urlParams.toString()}`;

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

  // Convert the job's array of tag objects into friendly names using tagMapping
  function processJobs(jobs) {
    return jobs.map((job) => {
      if (!Array.isArray(job.tags)) return job;
      const friendlyTags = job.tags.map((tagObj) => {
        const enumVal = tagObj.tagName || tagObj.name || tagObj.value;
        // looks up friendly name from enumVal -> friendlyName
        return tagMapping.get(enumVal) || enumVal;
      });
      return { ...job, tags: friendlyTags };
    });
  }

  // ------------------- Status Info -------------------
  function getJobStatusInfo(job) {
    let statusColor = "text-gray-400";
    let statusText = t("nA", { defaultValue: "N/A" });
    let StatusIcon = FaCircle;
    switch (job.status) {
      case "OPEN":
        statusColor = "text-green-500";
        statusText = t("open", { defaultValue: "Open" });
        break;
      case "ASSIGNED":
        statusColor = "text-blue-500";
        statusText = t("assigned", { defaultValue: "Assigned" });
        break;
      case "IN_PROGRESS":
        statusColor = "text-yellow-500";
        statusText = t("inProgress", { defaultValue: "In Progress" });
        break;
      case "COMPLETED":
        statusColor = "text-gray-500";
        statusText = t("completed", { defaultValue: "Completed" });
        break;
      case "CANCELLED":
        statusColor = "text-red-500";
        statusText = t("cancelled", { defaultValue: "Cancelled" });
        break;
      default:
        statusColor = "text-gray-400";
        statusText = t("nA", { defaultValue: "N/A" });
    }
    return { statusColor, statusText, StatusIcon };
  }

  function getApplicantStatusInfo(job) {
    let applicantStatusColor = "text-gray-400";
    let applicantStatusText = job.applicantStatus || t("nA", { defaultValue: "N/A" });
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

  // ------------------- UI Handlers -------------------
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    // Re-fetch with updated filters
    fetchMyJobs();
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTag(enumValue) {
    if (enumValue && !filters.tags.includes(enumValue)) {
      setFilters((prev) => ({ ...prev, tags: [...prev.tags, enumValue] }));
    }
  }

  function handleRemoveTag(enumValue) {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((existing) => existing !== enumValue),
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
      alert(t("geolocationNotSupported", { defaultValue: "Geolocation is not supported by this browser." }));
    }
  }

  function handleViewDetails(jobId) {
    navigate(`/myJob/${jobId}`);
  }

  // ------------------- Pagination Helpers -------------------
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
            className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 mx-0.5 xs:mx-1 sm:mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 text-xs xs:text-sm sm:text-base"
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
            className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 mx-0.5 xs:mx-1 sm:mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 text-xs xs:text-sm sm:text-base"
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
        className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 mx-0.5 xs:mx-1 sm:mx-1 rounded-full text-xs xs:text-sm sm:text-base ${
          page === i
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-black hover:bg-gray-400"
        }`}
      >
        {i + 1}
      </button>
    );
  }

  // ------------------- Loading State -------------------
  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen p-2 xs:p-4 sm:p-6">
        <p className="text-sm xs:text-base sm:text-lg">{t("loading", { defaultValue: "Loading your jobs..." })}</p>
      </div>
    );
  }

  return (
    <div
      className={`my-6 xs:my-8 sm:my-10 main-content min-h-screen p-2 xs:p-4 sm:p-6 border-1 rounded-4xl ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Top search bar + toggle */}
      <div className="flex flex-col sm:flex-row justify-center mb-4 xs:mb-6 sm:mb-8 gap-2 xs:gap-3 sm:gap-4">
        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <input
            type="text"
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder={t("searchJobsPlaceholder", { defaultValue: "Search your jobs by title..." })}
            className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border rounded-l-md focus:outline-none text-xs xs:text-sm sm:text-base w-full sm:w-64 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <button
            type="submit"
            className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 text-xs xs:text-sm sm:text-base"
          >
            {t("search", { defaultValue: "Search" })}
          </button>
        </form>
        <button
          onClick={toggleView}
          className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center w-full sm:w-auto text-xs xs:text-sm sm:text-base"
          id="toggle-view"
        >
          {viewType === "card" ? (
            <>
              <FaList className="mr-1 xs:mr-1.5 sm:mr-2 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
              {t("listView", { defaultValue: "List View" })}
            </>
          ) : (
            <>
              <FaTh className="mr-1 xs:mr-1.5 sm:mr-2 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
              {t("cardView", { defaultValue: "Card View" })}
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Filters Column */}
        <div className="w-full lg:w-1/5 pr-0 lg:pr-6 xs:pr-8 sm:pr-10 mb-4 xs:mb-6 sm:mb-8 lg:mb-0">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold mb-2 xs:mb-3 sm:mb-4">
            {t("filters", { defaultValue: "Filters" })}
          </h3>
          <form onSubmit={handleSearchSubmit}>
            {/* TAGS SECTION */}
            <div className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-4 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleTagsCollapse}
              >
                <h4 className="text-sm xs:text-base sm:text-lg font-semibold">{t("tags")}</h4>
                {isTagsCollapsed ? (
                  <FaChevronUp className="text-gray-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
                ) : (
                  <FaChevronDown className="text-gray-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${
                  isTagsCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {/* Render any selected tags */}
                <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-3 mb-1 xs:mb-2 sm:mb-3">
                  {filters.tags.map((enumValue) => (
                    <span
                      key={enumValue}
                      className={`px-1 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-1 rounded-full flex items-center text-xs xs:text-sm sm:text-sm ${getTagColor(enumValue)}`}
                    >
                      <FaTag className="mr-0.5 xs:mr-1 sm:mr-1.5 h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4" />
                      <span className="mr-0.5 xs:mr-1 sm:mr-1.5">
                        {tagMapping.get(enumValue) || enumValue}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(enumValue)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {/* Tag select */}
                <select
                  name="tags"
                  value=""
                  onChange={(e) => handleAddTag(e.target.value)}
                  className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border rounded-md text-xs xs:text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  <option value="">{t("selectATag")}</option>
                  {Array.from(tagMapping.entries()).map(([enumVal, friendlyName]) => (
                    <option key={enumVal} value={enumVal}>
                      {friendlyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Status Filter */}
            <div className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-4 border rounded-md">
              <label className="block mb-1 xs:mb-2 sm:mb-2 text-xs xs:text-sm sm:text-base">
                {t("jobStatus", { defaultValue: "Job Status" })}
              </label>
              <select
                name="jobStatus"
                value={filters.jobStatus}
                onChange={handleFilterChange}
                className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border rounded-md text-xs xs:text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <option value="">{t("selectAStatus", { defaultValue: "Select a status" })}</option>
                <option value="OPEN">{t("open", { defaultValue: "Open" })}</option>
                <option value="ASSIGNED">{t("assigned", { defaultValue: "Assigned" })}</option>
                <option value="IN_PROGRESS">{t("inProgress", { defaultValue: "In Progress" })}</option>
                <option value="COMPLETED">{t("completed", { defaultValue: "Completed" })}</option>
                <option value="CANCELLED">{t("cancelled", { defaultValue: "Cancelled" })}</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-4 border rounded-md">
              <label className="block mb-1 xs:mb-2 sm:mb-2 text-xs xs:text-sm sm:text-base">
                {t("location", { defaultValue: "Location" })}
              </label>
              <input
                type="text"
                name="address"
                placeholder={t("enterAddressLatLng", { defaultValue: "Enter address (lat,lng)" })}
                className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border rounded-md mb-1 xs:mb-2 sm:mb-3 text-xs xs:text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black border-gray-300"
                }`}
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
                className="w-full bg-blue-500 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-md hover:bg-blue-600 text-xs xs:text-sm sm:text-base"
              >
                {t("useCurrentLocation", { defaultValue: "Use Current Location" })}
              </button>
              {filters.latitude && filters.longitude && (
                <p className="text-xs xs:text-sm sm:text-sm text-green-500 mt-1 xs:mt-2 sm:mt-3 text-center">
                  {t("usingCurrentLocation", { defaultValue: "Using your current location" })}
                </p>
              )}
            </div>

            {/* Radius Filter */}
            <div className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-4 border rounded-md">
              <label
                htmlFor="distance-range-slider"
                className={`block mb-1 xs:mb-2 sm:mb-2 font-medium text-xs xs:text-sm sm:text-base ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                {t("radiusKm", { defaultValue: "Radius (km)" })}
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
                  className="w-full h-1 xs:h-2 sm:h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${
                      filters.radius / 5
                    }%, #d1d5db ${filters.radius / 5}%)`,
                  }}
                />
                <div className="absolute w-full top-3 xs:top-4 sm:top-4 flex justify-between">
                  {[0, 100, 200, 300, 400, 500].map((value) => (
                    <div key={value} className="relative">
                      <div className="w-0.5 h-2 xs:h-3 sm:h-3 bg-gray-500 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`flex justify-between text-xs xs:text-sm sm:text-sm mt-1 xs:mt-2 sm:mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {[0, 100, 200, 300, 400, 500].map((value) => (
                  <span key={value} className="w-8 text-center">
                    {value}
                  </span>
                ))}
              </div>
              <p className={`text-xs xs:text-sm sm:text-sm mt-1 xs:mt-2 sm:mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {t("radius", { defaultValue: "Radius" })}: {filters.radius} km
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-md hover:bg-green-600 text-xs xs:text-sm sm:text-base"
            >
              {t("applyFilters", { defaultValue: "Apply Filters" })}
            </button>
          </form>
        </div>

        {/* Jobs Column */}
        <div className="w-full lg:w-4/5 p-2 xs:p-4 sm:p-6">
          <div className="flex flex-col items-start mb-4 xs:mb-6 sm:mb-8">
            <h2 className="text-base xs:text-lg sm:text-xl font-bold text-left mb-2 xs:mb-3 sm:mb-4">
              {totalElements >= 1
                ? t("searchReturnedJobPosts", {
                    count: totalElements,
                    defaultValue: `Search returned ${totalElements} job posts`
                  })
                : t("noJobPostsFound", { defaultValue: "No job posts found" })}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-2 xs:mb-3 sm:mb-4 text-center text-xs xs:text-sm sm:text-base">{errorMessage}</div>
          )}

          {jobs.length === 0 ? (
            <p className="text-center text-xs xs:text-sm sm:text-base">
              {t("noJobPostsFound", { defaultValue: "No jobs found." })}
            </p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "grid gap-2 xs:gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "space-y-2 xs:space-y-4 sm:space-y-6"
              }
            >
              {jobs.map((job) => {
                const { statusColor, statusText, StatusIcon } = getJobStatusInfo(job);
                const {
                  applicantStatusColor,
                  applicantStatusText
                } = getApplicantStatusInfo(job);

                return (
                  <div
                    key={job.jobPostId}
                    className={`card border ${darkMode ? "border-gray-700" : "border-gray-300"} ${
                      viewType === "card"
                        ? "hover:shadow-md hover:border-green-500 transition rounded-md p-2 xs:p-4 sm:p-6"
                        : "rounded-lg shadow p-2 xs:p-4 sm:p-6 flex flex-col sm:flex-row justify-between"
                    }`}
                  >
                    {/* Updated Title */}
                    <h3 className="text-base xs:text-lg sm:text-xl font-semibold">
                      {t("jobTitle", { defaultValue: job.title })}
                    </h3>
                    {/* Address */}
                    <p className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-xs xs:text-sm sm:text-base">
                      <FaMapMarkerAlt className="text-red-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" /> {job.address}
                    </p>
                    {/* Date Posted */}
                    <p className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-xs xs:text-sm sm:text-base">
                      <MdDateRange className="text-blue-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />{" "}
                      {t("posted", { defaultValue: "Posted" })}:
                      {" " + new Date(job.datePosted).toLocaleDateString()}
                    </p>
                    {/* Max Applicants */}
                    <p className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-xs xs:text-sm sm:text-base">
                      <FaUsers className="text-purple-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />{" "}
                      {t("maxApplicants", { defaultValue: "Max Applicants" })}:
                      {" " + job.maxApplicants}
                    </p>
                    {/* Description snippet */}
                    <p className="mt-1 xs:mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base">
                      <strong>{t("description", { defaultValue: "Description" })}:</strong>{" "}
                      {job.description && job.description.length > 100
                        ? t("jobDescription", {
                            defaultValue: job.description.slice(0, 100) + "..."
                          })
                        : t("jobDescription", { defaultValue: job.description })}
                    </p>
                    {/* Tags display */}
                    {job.tags && job.tags.length > 0 && (
                      <p className="my-1 xs:my-2 sm:my-3 text-xs xs:text-sm sm:text-sm">
                        <strong>{t("tagsLabel", { defaultValue: "Tags" })}:</strong>{" "}
                        {job.tags.join(", ")}
                      </p>
                    )}
                    {/* Status Info */}
                    <p className="flex items-center mt-1 xs:mt-2 sm:mt-3 gap-1 xs:gap-1.5 sm:gap-2 text-xs xs:text-sm sm:text-base">
                      <StatusIcon className={`${statusColor} mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5`} />
                      <strong className="mr-1 xs:mr-2 sm:mr-2">
                        {t("jobStatus", { defaultValue: "Job Status" })}:
                      </strong>{" "}
                      <span className={statusColor}>{statusText}</span>
                    </p>
                    {/* Applicant Status */}
                    <p className="flex items-center mt-1 xs:mt-2 sm:mt-3 gap-1 xs:gap-1.5 sm:gap-2 text-xs xs:text-sm sm:text-base">
                      {job.applicantStatus === "PENDING" && (
                        <FaClock className={`${applicantStatusColor} mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5`} />
                      )}
                      {job.applicantStatus === "ACCEPTED" && (
                        <FaCheckCircle className={`${applicantStatusColor} mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5`} />
                      )}
                      {job.applicantStatus === "REJECTED" && (
                        <FaTimesCircle className={`${applicantStatusColor} mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5`} />
                      )}
                      {job.applicantStatus !== "PENDING" &&
                        job.applicantStatus !== "ACCEPTED" &&
                        job.applicantStatus !== "REJECTED" && (
                          <FaCircle className={`${applicantStatusColor} mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5`} />
                        )}
                      <strong>
                        {t("applicantStatus", { defaultValue: "Applicant Status" })}:
                      </strong>{" "}
                      <span className={applicantStatusColor}>{applicantStatusText}</span>
                    </p>
                    {/* View Details Button */}
                    <div className="mt-2 xs:mt-3 sm:mt-4">
                      <button
                        onClick={() => handleViewDetails(job.jobPostId)}
                        className="w-full bg-green-500 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-md hover:bg-blue-600 text-xs xs:text-sm sm:text-base"
                      >
                        {t("viewMoreDetails", { defaultValue: "View More Details" })}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 xs:mt-6 sm:mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="w-24 xs:w-28 sm:w-32 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 mr-2 xs:mr-4 sm:mr-6 mx-0.5 xs:mx-1 sm:mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-xs xs:text-sm sm:text-base"
                style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)" }}
              >
                {t("previous", { defaultValue: "Previous" })}
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages - 1}
                className="w-24 xs:w-28 sm:w-32 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 ml-2 xs:ml-4 sm:ml-6 mx-0.5 xs:mx-1 sm:mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-xs xs:text-sm sm:text-base"
                style={{ clipPath: "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)" }}
              >
                {t("next", { defaultValue: "Next" })}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}