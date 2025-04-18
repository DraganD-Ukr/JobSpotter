import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  FaList,
  FaTh,
  FaTag,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaUsers,
  FaRoute,
  FaTimesCircle,
  FaCircle,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../components/ThemeContext";

let tagMappingCache = null;

export function SearchJobPost() {
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("card");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    latitude: "",
    longitude: "",
    radius: 50,
  });

  const [tagMapping, setTagMapping] = useState(new Map());
  const [suggestions, setSuggestions] = useState([]);

  // Fetch dynamic tag mapping (cached)
  useEffect(() => {
    const fetchTags = async () => {
      if (tagMappingCache) {
        console.log("Using cached tag data.");
        setTagMapping(tagMappingCache);
        return;
      }
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
        console.log("Fetched tags data from API:", tagsData);

        if (!tagsData || typeof tagsData !== "object" || Array.isArray(tagsData)) {
          console.warn("API response did not return a valid tags object.");
          setTagMapping(new Map());
          return;
        }

        const newTagMap = new Map();
        Object.keys(tagsData).forEach((enumValue) => {
          const friendlyName = tagsData[enumValue];
          if (friendlyName) {
            newTagMap.set(friendlyName, enumValue);
          } else {
            console.warn(`Tag object missing friendlyName for enumValue: ${enumValue}`);
          }
        });

        tagMappingCache = newTagMap;
        setTagMapping(newTagMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setErrorMessage(t("failedToLoadJobTags"));
      }
    };

    fetchTags();
  }, [t]);

  // Collapsable filters
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(false);
  const [isLocationCollapsed, setIsLocationCollapsed] = useState(false);
  const [isRadiusCollapsed, setIsRadiusCollapsed] = useState(false);
  const toggleTagsCollapse = () => setIsTagsCollapsed(!isTagsCollapsed);
  const toggleLocationCollapse = () => setIsLocationCollapsed(!isLocationCollapsed);
  const toggleRadiusCollapse = () => setIsRadiusCollapsed(!isRadiusCollapsed);

  // Read "title" from URL query parameters (if provided)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("title") || "";
  const [localQuery, setLocalQuery] = useState(initialQuery);

  const [tagColors, setTagColors] = useState({});
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

  useEffect(() => {
    fetchJobs();
  }, [searchParams, page, pageSize]);

  function fetchJobs() {
    setLoading(true);
    const query = searchParams.get("title") || "";
    const tagArray = filters.tags || [];
    const tagsParam = tagArray.length > 0 ? tagArray.join(",") : "";
    const latitude = searchParams.get("latitude") || "";
    const longitude = searchParams.get("longitude") || "";
    const radius = searchParams.get("radius") || "";
    const endpoint = `/api/v1/job-posts/search?title=${encodeURIComponent(
      query
    )}&tags=${encodeURIComponent(tagsParam)}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&pageNumber=${page}&size=${pageSize}`;

    console.log(endpoint);

    fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        const jobsArray = data.content || [];
        setJobPostsData(processJobs(jobsArray));
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

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

  // --- STATUS LOGIC ---
  function getJobStatusInfo(job) {
    let statusColor = "text-gray-400";
    let statusText = t("nA");
    let StatusIcon = FaCircle;

    switch (job.status) {
      case "OPEN":
        statusColor = "text-green-500";
        statusText = t("open");
        break;
      case "ASSIGNED":
        statusColor = "text-blue-500";
        statusText = t("assigned");
        break;
      case "IN_PROGRESS":
        statusColor = "text-yellow-500";
        statusText = t("inProgress");
        break;
      case "COMPLETED":
        statusColor = "text-gray-500";
        statusText = t("completed");
        break;
      case "CANCELLED":
        statusColor = "text-red-500";
        statusText = t("cancelled");
        break;
      default:
        statusColor = "text-gray-400";
        statusText = t("nA");
    }
    return { statusColor, statusText, StatusIcon };
  }
  // --- END STATUS LOGIC ---

  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // Handle typed input for suggestions
  function handleLocalQueryChange(e) {
    const value = e.target.value;
    setLocalQuery(value);
    fetchSuggestions(value);
  }

  // Fetch suggestions from /api/v1/job-posts/title-suggestions
  function fetchSuggestions(value) {
    if (!value) {
      setSuggestions([]);
      return;
    }
    fetch(`/api/v1/job-posts/title-suggestions?title=${encodeURIComponent(value)}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        return res.json();
      })
      .then((data) => {
        setSuggestions(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }

  // When user clicks a suggestion, set it as the query
  function handleSuggestionClick(suggestion) {
    setLocalQuery(suggestion);
    setSuggestions([]);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const tagsParam = filters.tags.join(",");
    setSearchParams({ ...filters, title: localQuery, tags: tagsParam });
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTag(tag) {
    if (!filters.tags.includes(tag)) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  }

  function handleRemoveTag(tag) {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  function renderPaginationButtons() {
    const maxButtons = 5;
    const buttons = [];

    if (totalPages <= maxButtons) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            id={page === i ? "active-page" : "page-button"}
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
    } else {
      let startPage = Math.max(0, page - Math.floor(maxButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxButtons);
      if (endPage - startPage < maxButtons) {
        startPage = Math.max(0, endPage - maxButtons);
      }
      for (let i = startPage; i < endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            id={page === i ? "active-page" : "page-button"}
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
      if (startPage > 0) {
        buttons.unshift(
          <button
            key="start-ellipsis"
            onClick={() => handlePageChange(startPage - 1)}
            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400"
            id="other-pages"
          >
            ...
          </button>
        );
      }
      if (endPage < totalPages) {
        buttons.push(
          <button
            key="end-ellipsis"
            onClick={() => handlePageChange(endPage)}
            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400"
            id="other-pages"
          >
            ...
          </button>
        );
      }
    }
    return buttons;
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
      alert(t("geolocationNotSupported"));
    }
  }

  function getRandomColor() {
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
  }

  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border border-black rounded-4xl ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Top Search Bar, Toggle View, and Page Size */}
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearchSubmit} className="flex relative">
          <div className="relative">
            <input
              type="text"
              value={localQuery}
              onChange={handleLocalQueryChange}
              placeholder={t("searchJobsPlaceholder")}
              className={`px-4 py-2 border rounded-l-md focus:outline-none ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            {suggestions.length > 0 && (
              <ul
                className={`absolute top-full left-0 w-full border rounded-md shadow-md z-10 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
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
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            {t("search")}
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
              {t("listView")}
            </>
          ) : (
            <>
              <FaTh className="mr-2" />
              {t("cardView")}
            </>
          )}
        </button>
        <div className="flex items-center ml-10">
          <label htmlFor="pageSize" className="mr-2">
            {t("showResults")}:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border rounded"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="flex">
        {/* Filters Column */}
        <div className="w-1/5 pr-12 border-r ml-4 mr-4">
          <h3 className="text-xl font-bold mb-4">{t("filters")}</h3>
          <form onSubmit={handleSearchSubmit}>
            {/* Tags Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleTagsCollapse}
              >
                <h4 className="text-lg font-semibold">{t("tags")}</h4>
                {isTagsCollapsed ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${
                  isTagsCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {filters.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full flex items-center ${getTagColor(
                        tag
                      )}`}
                    >
                      <FaTag className="mr-2" />
                      <span className="mr-2">
                        {
                          Array.from(tagMapping.entries()).find(
                            ([, value]) => value === tag
                          )?.[0]
                        }
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
                  className={`w-full px-4 py-2 border rounded-md ${
                    darkMode
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  <option value="">{t("selectATag")}</option>
                  {Array.from(tagMapping.keys()).map((tag) => (
                    <option key={tag} value={tagMapping.get(tag)}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleLocationCollapse}
              >
                <h4 className="text-lg font-semibold">{t("location")}</h4>
                {isLocationCollapsed ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${
                  isLocationCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <input
                  type="text"
                  name="address"
                  placeholder={t("enterAddressLatLng")}
                  className={`w-full px-4 py-2 border rounded-md mb-2 ${
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
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {t("useCurrentLocation")}
                </button>
                {filters.latitude && filters.longitude && (
                  <p className="text-sm text-green-500 mt-2 text-center">
                    {t("usingCurrentLocation")}
                  </p>
                )}
              </div>
            </div>

            {/* Radius Section */}
            <div className="mb-4 p-4 border rounded-md">
              <label
                htmlFor="distance-range-slider"
                className={`block mb-2 font-medium ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                {t("radiusKm")}
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
              <div
                className={`flex justify-between text-xs mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {[0, 100, 200, 300, 400, 500].map((value) => (
                  <span key={value} className="w-8 text-center">
                    {value}
                  </span>
                ))}
              </div>
              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("radius")}: {filters.radius} km
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {t("applyFilters")}
            </button>
          </form>
        </div>

        {/* Job Posts Column */}
        <div className="w-4/5 p-4 ml-4 mr-4">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl font-bold text-left mb-4">
              {totalElements >= 1
                ? t("searchReturnedJobPosts", { count: totalElements })
                : t("noJobPostsFound")}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}

          {jobPostsData.length === 0 ? (
            <p className="text-center">{t("noJobPostsFound")}</p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              }
            >
              {jobPostsData.map((job) => {
                const { statusColor, statusText, StatusIcon } = getJobStatusInfo(job);
                return (
                  <Link to={`/job/${job.jobPostId}`} key={job.jobPostId}>
                    <div
                      className={`card border ${
                        darkMode
                          ? "border-gray-700 hover:border-green-500"
                          : "border-gray-300 hover:border-green-500"
                      } ${
                        viewType === "card"
                          ? "hover:shadow-md transition rounded-md p-4"
                          : "rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between"
                      }`}
                    >
                      {/* Updated Title */}
                      <h3 className="text-xl font-semibold">
                        {t("jobTitle", { defaultValue: job.title })}
                      </h3>
                      {job.address && (
                        <p className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-red-500" /> {job.address}
                        </p>
                      )}
                      {job.datePosted && (
                        <p className="flex items-center gap-1">
                          <MdDateRange className="text-blue-500" /> {t("posted")}:{" "}
                          {new Date(job.datePosted).toLocaleDateString()}
                        </p>
                      )}
                      {typeof job.maxApplicants !== "undefined" && (
                        <p className="flex items-center gap-1">
                          <FaUsers className="text-purple-500" /> {t("maxApplicants")}:{" "}
                          {job.maxApplicants}
                        </p>
                      )}
                      {typeof job.relevantDistance !== "undefined" && (
                        <p className="flex items-center gap-1">
                          <FaRoute className="text-green-500" /> {t("distance")}:{" "}
                          {parseFloat(job.relevantDistance).toFixed(2)} km
                        </p>
                      )}
                      {/* Description */}
                      <p className="mt-2">
                        <strong>{t("description")}:</strong>{" "}
                        {job.description && job.description.length > 100
                          ? t("jobDescription", { defaultValue: job.description.slice(0, 100) + "..." })
                          : t("jobDescription", { defaultValue: job.description })}
                      </p>
                      {job.tags && job.tags.length > 0 && (
                        <p className="my-3 text-sm">
                          <strong>{t("tagsLabel")}:</strong> {job.tags.join(", ")}
                        </p>
                      )}

                      {/* Status Indicator */}
                      <p className="flex items-center mt-2 gap-1">
                        <StatusIcon className={`${statusColor} mr-1`} />
                        <strong className="mr-2">{t("jobStatus")}:</strong>
                        <span className={statusColor}>{statusText}</span>
                      </p>

                      <div className="flex justify-end mt-4">
                        {/*Yellow warning icon */}
                        <Link
                          to={`/userreportformpopup?jobId=${job.jobPostId || ""}&reportedUserId=${job.jobPosterId}`}
                          className="text-yellow-500 hover:text-yellow-600"
                          title={t("reportJobPost")}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExclamationTriangle size={20} />
                        </Link>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-32 px-4 py-2 mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
              id="navigate-page"
              style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)" }}
            >
              {t("previous")}
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1 || jobPostsData.length === 0}
              className="w-32 px-4 py-2 ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
              id="navigate-page"
              style={{ clipPath: "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)" }}
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

