import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaList,
  FaTh,
  FaTag,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUsers,
  FaCircle,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useTranslation } from "react-i18next";

let tagMappingCache = null;

export function JobPostHistory() {
  const { t } = useTranslation();

  //  Tag Mapping 
  const [tagMapping, setTagMapping] = useState(new Map());
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
            newTagMap.set(enumValue, friendlyName); 
          } else {
            console.warn(`Tag object missing friendlyName for enumValue: ${enumValue}`);
          }
        });

        tagMappingCache = newTagMap;
        setTagMapping(newTagMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setErrorMessage(t("failedToLoadJobTags", { defaultValue: "Failed to load job tags" }));
      }
    };

    fetchTags();
  }, [t]);

  // State Declarations
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("card");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("datePosted");

  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    applicantStatus: "ACCEPTED",
  });

  const [tagColors, setTagColors] = useState({});

  // Tag Color Functions
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

  function getRandomColor() {
    const colors = [
      "bg-red-400",
      "bg-yellow-400",
      "bg-green-400",
      "bg-blue-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-indigo-400",
      "bg-teal-400",
      "bg-cyan-400",
      "bg-orange-400",
      "bg-lime-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Collapsible Filters
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(false);
  const [isStatusCollapsed, setIsStatusCollapsed] = useState(false);
  const toggleTagsCollapse = () => setIsTagsCollapsed(!isTagsCollapsed);
  const toggleStatusCollapse = () => setIsStatusCollapsed(!isStatusCollapsed);

  // Query Params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("title") || "";
  const [localQuery, setLocalQuery] = useState(initialQuery);

  //Fetch Job Post History
  useEffect(() => {
    fetchJobPostHistory();
  }, [searchParams, page, pageSize, sortBy]);

  function fetchJobPostHistory() {
    setLoading(true);
    const query = searchParams.get("title") || "";
    const applicantStatus = filters.applicantStatus || null;
    const tagArray = filters.tags || [];
    const tagsParam = tagArray.length > 0 ? tagArray.join(",") : "";

    const endpoint = `/api/v1/job-posts/history?title=${encodeURIComponent(
      query
    )}&tags=${encodeURIComponent(tagsParam)}&applicantStatus=${applicantStatus}&page=${page}&size=${pageSize}&sortBy=${sortBy}`;

    fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job post history");
        return res.json();
      })
      .then((data) => {
        const content = data.content || [];
        const jobsWithFriendlyTags = content.map((job, index) => {
          const jobId = job.jobId || job.id || index;
          let friendlyTags = [];
          if (Array.isArray(job.tags)) {
            friendlyTags = job.tags.map((tagObj) => {
              const enumVal = tagObj.tagName || tagObj.name || tagObj.value || tagObj;
              return tagMapping.get(enumVal) || enumVal;
            });
          }
          return {
            ...job,
            jobId,
            tags: friendlyTags,
            jobStatus: job.status,
            applicantStatus: job.applicantStatus,
          };
        });
        setJobPostsData(jobsWithFriendlyTags);
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching job post history:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  // Toggle View
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // Search Handling
  function handleSearchSubmit(e) {
    e.preventDefault();
    const tagsParam = filters.tags.join(",");
    setSearchParams({ ...filters, title: localQuery, tags: tagsParam, sortBy });
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // Sort By
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setPage(0);
  };

  // Tag Handling
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

  // Page Size
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function renderPaginationButtons() {
    const maxButtons = 5;
    const buttons = [];

    if (totalPages <= maxButtons) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 rounded-full text-sm xs:text-base sm:text-base ${
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
            className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 rounded-full text-sm xs:text-base sm:text-base ${
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
            className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 text-sm xs:text-base sm:text-base"
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
            className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 text-sm xs:text-base sm:text-base"
          >
            ...
          </button>
        );
      }
    }
    return buttons;
  }

  // Loading State
  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center p-4 xs:p-6 sm:p-8">
        <p className="text-sm xs:text-base sm:text-lg">
          {t("loading", { defaultValue: "Loading job post history..." })}
        </p>
      </div>
    );
  }

  // Render Component
  return (
    <div className="my-6 xs:my-8 sm:my-10 main-content min-h-screen p-4 xs:p-6 sm:p-8 border-1 rounded-4xl">
      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-8 xs:mb-10 sm:mb-12 text-center">
        {t("jobPostHistoryTitle", { defaultValue: "Search Your Job Post History" })}
      </h1>

      {errorMessage && (
        <div className="text-red-500 mb-4 xs:mb-6 sm:mb-8 text-center text-sm xs:text-base sm:text-lg">
          {errorMessage}
        </div>
      )}

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center mb-6 xs:mb-8 sm:mb-8 gap-3 xs:gap-4 sm:gap-5 flex-wrap">
        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={t("searchJobsPlaceholder", { defaultValue: "Search jobs by title..." })}
            className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-l-md focus:outline-none w-full sm:w-64 text-sm xs:text-base sm:text-base"
          />
          <button
            type="submit"
            className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 text-sm xs:text-base sm:text-base"
          >
            {t("search", { defaultValue: "Search" })}
          </button>
        </form>

        <button
          onClick={toggleView}
          className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center text-sm xs:text-base sm:text-base w-full sm:w-auto"
        >
          {viewType === "card" ? (
            <>
              <FaList className="mr-1 xs:mr-2" />
              {t("listView", { defaultValue: "List View" })}
            </>
          ) : (
            <>
              <FaTh className="mr-1 xs:mr-2" />
              {t("cardView", { defaultValue: "Card View" })}
            </>
          )}
        </button>

        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="sortBy" className="mr-2 text-sm xs:text-base sm:text-base">
            {t("sortBy", { defaultValue: "Sort by:" })}
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
            className="px-2 xs:px-2 sm:px-2 py-1 xs:py-1 sm:py-1 border rounded text-sm xs:text-base sm:text-base"
          >
            <option value="datePosted">{t("datePostedOption", { defaultValue: "Date Posted" })}</option>
            <option value="lastUpdatedAt">{t("lastUpdatedOption", { defaultValue: "Last Updated" })}</option>
            <option value="title">{t("titleOption", { defaultValue: "Title" })}</option>
            <option value="status">{t("statusOption", { defaultValue: "Status" })}</option>
          </select>
        </div>

        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="pageSize" className="mr-2 text-sm xs:text-base sm:text-base">
            {t("showResults", { defaultValue: "Show Results:" })}
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 xs:px-2 sm:px-2 py-1 xs:py-1 sm:py-1 border rounded text-sm xs:text-base sm:text-base"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Filters */}
        <div className="w-full lg:w-1/5 pr-0 lg:pr-6 xs:pr-8 mb-6 lg:mb-0">
          <h3 className="text-base xs:text-lg sm:text-lg font-bold mb-4 xs:mb-6 sm:mb-8">
            {t("filters", { defaultValue: "Filters" })}
          </h3>
          <form onSubmit={handleSearchSubmit}>
            <div className="mb-4 xs:mb-6 sm:mb-8 p-4 xs:p-6 sm:p-8 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleTagsCollapse}
              >
                <h4 className="text-base xs:text-lg sm:text-lg font-semibold">
                  {t("tags", { defaultValue: "Tags" })}
                </h4>
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
                <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3 sm:mb-4">
                  {filters.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1 sm:py-1 rounded-full flex items-center text-sm xs:text-base sm:text-base ${getTagColor(tag)}`}
                    >
                      <FaTag className="mr-1 xs:mr-2" />
                      <span className="mr-1 xs:mr-2">{tagMapping.get(tag) || tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  name="tags"
                  value=""
                  onChange={(e) => handleAddTag(e.target.value)}
                  className="w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base"
                >
                  <option value="">{t("selectATag", { defaultValue: "Select a tag" })}</option>
                  {Array.from(tagMapping.entries()).map(([enumValue, friendlyName]) => (
                    <option key={enumValue} value={enumValue}>
                      {friendlyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4 xs:mb-6 sm:mb-8 p-4 xs:p-6 sm:p-8 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleStatusCollapse}
              >
                <h4 className="text-base xs:text-lg sm:text-lg font-semibold mb-1">
                  {t("applicationStatus", { defaultValue: "Application status" })}
                </h4>
                {isStatusCollapsed ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${
                  isStatusCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mb-3 xs:mb-4 sm:mb-5 p-3 xs:p-4 sm:p-5">
                  <select
                    name="applicantStatus"
                    value={filters.applicantStatus}
                    onChange={handleFilterChange}
                    className="w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base"
                  >
                    <option value="PENDING">{t("pendingOption", { defaultValue: "Pending" })}</option>
                    <option value="ACCEPTED">{t("acceptedOption", { defaultValue: "Accepted" })}</option>
                    <option value="REJECTED">{t("rejectedOption", { defaultValue: "Rejected" })}</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 rounded-md hover:bg-green-600 text-sm xs:text-base sm:text-base"
            >
              {t("applyFilters", { defaultValue: "Apply Filters" })}
            </button>
          </form>
        </div>

        {/* Job Posts */}
        <div className="w-full lg:w-4/5 p-4 xs:p-6 sm:p-8">
          <div className="flex flex-col items-start mb-6 xs:mb-8 sm:mb-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-center mb-4 xs:mb-6 sm:mb-8">
              {totalElements >= 1
                ? t("searchReturnedJobPosts", {
                    count: totalElements,
                    defaultValue: `Search returned ${totalElements} job posts`,
                  })
                : t("noJobPostsFound", { defaultValue: "No job posts found" })}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 xs:mb-6 sm:mb-8 text-center text-sm xs:text-base sm:text-lg">
              {errorMessage}
            </div>
          )}

          {jobPostsData.length === 0 ? (
            <p className="text-center text-sm xs:text-base sm:text-lg">
              {t("noJobPostsFound", { defaultValue: "No jobs found." })}
            </p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full mx-auto"
                  : "max-w-full mx-auto space-y-4 xs:space-y-6 sm:space-y-8"
              }
            >
              {jobPostsData.map((job) => {
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

                return (
                  <div
                    key={job.jobPostId}
                    className={`card border border-gray-300 ${
                      viewType === "card"
                        ? "hover:shadow-md hover:border-green-500 transition"
                        : "rounded-lg shadow"
                    } w-full ${viewType === "card" ? "max-w-full" : ""} flex flex-col p-4 xs:p-6 sm:p-8 rounded-lg`}
                  >
                    <h3 className="text-lg xs:text-xl sm:text-xl font-semibold">
                      {t("jobTitle", { defaultValue: job.title })}
                    </h3>
                    <p className="flex items-center gap-1 xs:gap-2 text-sm xs:text-base sm:text-base">
                      <FaMapMarkerAlt className="text-red-500" /> {job.address}
                    </p>
                    <p className="flex items-center gap-1 xs:gap-2 text-sm xs:text-base sm:text-base">
                      <MdDateRange className="text-blue-500" />{" "}
                      {t("posted", { defaultValue: "Posted" })}:{" "}
                      {new Date(job.datePosted).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-1 xs:gap-2 text-sm xs:text-base sm:text-base">
                      <FaUsers className="text-purple-500" />{" "}
                      {t("maxApplicants", { defaultValue: "Max Applicants" })}: {job.maxApplicants}
                    </p>
                    <p className="mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base sm:text-base">
                      <strong>{t("description", { defaultValue: "Description" })}:</strong>{" "}
                      {job.description && job.description.length > 100
                        ? t("jobDescription", { defaultValue: job.description.slice(0, 100) + "..." })
                        : t("jobDescription", { defaultValue: job.description })}
                    </p>
                    {job.tags && job.tags.length > 0 && (
                      <p className="my-2 xs:my-3 sm:my-3 text-xs xs:text-sm sm:text-sm">
                        <strong>{t("tagsLabel", { defaultValue: "Tags" })}:</strong>{" "}
                        {job.tags.join(", ")}
                      </p>
                    )}
                    <p className="flex items-center mt-2 xs:mt-3 sm:mt-4 gap-1 xs:gap-2 text-sm xs:text-base sm:text-base">
                      <StatusIcon className={`${statusColor} mr-1`} />
                      <strong className="mr-2">
                        {t("jobStatus", { defaultValue: "Job Status" })}:
                      </strong>
                      <span className={statusColor}>{statusText}</span>
                    </p>
                    <p className="flex items-center mt-2 xs:mt-3 sm:mt-4 gap-1 xs:gap-2 text-sm xs:text-base sm:text-base">
                      {job.applicantStatus === "PENDING" && (
                        <FaClock className={`${applicantStatusColor} mr-1`} />
                      )}
                      {job.applicantStatus === "ACCEPTED" && (
                        <FaCheckCircle className={`${applicantStatusColor} mr-1`} />
                      )}
                      {job.applicantStatus === "REJECTED" && (
                        <FaTimesCircle className={`${applicantStatusColor} mr-1`} />
                      )}
                      {job.applicantStatus !== "PENDING" &&
                        job.applicantStatus !== "ACCEPTED" &&
                        job.applicantStatus !== "REJECTED" && (
                          <FaCircle className={`${applicantStatusColor} mr-1`} />
                        )}
                      <strong>
                        {t("applicantStatus", { defaultValue: "Applicant Status" })}:
                      </strong>{" "}
                      <span className={applicantStatusColor}>{applicantStatusText}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex justify-center mt-6 xs:mt-8 sm:mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-28 xs:w-32 sm:w-32 px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mr-4 xs:mr-6 sm:mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-sm xs:text-base sm:text-base"
              style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)" }}
            >
              {t("previous", { defaultValue: "Previous" })}
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1 || jobPostsData.length === 0}
              className="w-24 xs:w-26 sm:w-26 px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 ml-4 xs:ml-6 sm:ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-sm xs:text-base sm:text-base"
              style={{ clipPath: "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)" }}
            >
              {t("next", { defaultValue: "Next" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}