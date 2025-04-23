import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
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

export function JobPostHistory() {
  const { t } = useTranslation();

  // ---------------------------------------TAG MAPPING (Dynamic via API)----------------------------------------
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
        console.log("Fetched tags data from API:", tagsData);

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

  // ---------------------------------------STATE DECLARATIONS----------------------------------------
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("card"); // "card" or "list"
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("datePosted"); // Default sort option

  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    applicantStatus: "ACCEPTED",
  });

  // ---------------------------------------Collapsable filters----------------------------------------
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(false);
  const [isStatusCollapsed, setIsStatusCollapsed] = useState(false);

  const toggleTagsCollapse = () => setIsTagsCollapsed(!isTagsCollapsed);
  const toggleStatusCollapse = () => setIsStatusCollapsed(!isStatusCollapsed);

  // For query params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("title") || "";
  const [localQuery, setLocalQuery] = useState(initialQuery);

  useEffect(() => {
    fetchJobPostHistory();
  }, [searchParams, page, pageSize, sortBy]);

  useEffect(() => {
    fetchJobPostHistory();
  }, [page]);

  useEffect(() => {
    fetchJobPostHistory();
  }, []);

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
              const enumVal = tagObj.tagName || tagObj.name || tagObj.value;
              return tagMapping.get(enumVal) || enumVal;
            });
          }
          setTotalElements(data.totalElements);
          setTotalPages(data.totalPages);
          return {
            ...job,
            jobId,
            tags: friendlyTags,
            jobStatus: job.status,
            applicantStatus: job.applicantStatus,
          };
        });
        setJobPostsData(jobsWithFriendlyTags);
      })
      .catch((err) => {
        console.error("Error fetching job post history:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  const [tagColors, setTagColors] = useState({});

  function getTagColor(tag) {
    if (tagColors[tag]) {
      return tagColors[tag];
    } else {
      const newColor = getRandomColor();
      setTagColors((prevColors) => ({
        ...prevColors,
        [tag]: newColor,
      }));
      return newColor;
    }
  }

  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // ---------------------------------------SEARCH----------------------------------------
  function handleSearchSubmit(e) {
    e.preventDefault();
    const tagsParam = filters.tags.join(",");
    setSearchParams({ ...filters, title: localQuery, tags: tagsParam, sortBy: sortBy });
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // ---------------------------------------SORT BY----------------------------------------
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setPage(0);
  };

  // ---------------------------------------TAGS----------------------------------------
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

  // ---------------------------------------PAGE SIZE----------------------------------------
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ---------------------------------------PAGINATION----------------------------------------
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

  // ---------------------------------------LOADING----------------------------------------
  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>{t("loading", { defaultValue: "Loading job post history..." })}</p>
      </div>
    );
  }

  return (
    <div className="my-10 main-content min-h-screen p-4 border-1 rounded-4xl">
      <h1 className="text-3xl font-bold mb-12 text-center">
        {t("jobPostHistoryTitle", { defaultValue: "Search Your Job Post History" })}
      </h1>

      {errorMessage && (
        <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
      )}

      {/* Search Bar */}
      <div className="flex justify-center mb-8 sm:ml-4 md:ml-6 lg:ml-30 xl:ml-100">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={t("searchJobsPlaceholder", { defaultValue: "Search jobs by title..." })}
            className="px-4 py-2 border rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            {t("search", { defaultValue: "Search" })}
          </button>
        </form>

        {/* Toggle View */}
        <button
          onClick={toggleView}
          className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center ml-4"
          id="toggle-view"
        >
          {viewType === "card" ? (
            <>
              <FaList className="mr-2" />
              {t("listView", { defaultValue: "List View" })}
            </>
          ) : (
            <>
              <FaTh className="mr-2" />
              {t("cardView", { defaultValue: "Card View" })}
            </>
          )}
        </button>

        {/* Sort By */}
        <div className="justify-center ml-10 flex items-center">
          <label htmlFor="sortBy" className="mr-2">
            {t("sortBy", { defaultValue: "Sort by:" })}
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
            className="px-2 py-1 border rounded"
          >
            <option value="datePosted">{t("datePostedOption", { defaultValue: "Date Posted" })}</option>
            <option value="lastUpdatedAt">{t("lastUpdatedOption", { defaultValue: "Last Updated" })}</option>
            <option value="title">{t("titleOption", { defaultValue: "Title" })}</option>
            <option value="status">{t("statusOption", { defaultValue: "Status" })}</option>
          </select>
        </div>

        {/* Show Results */}
        <div className="justify-center ml-10 flex items-center">
          <label htmlFor="pageSize" className="mr-2">
            {t("showResults", { defaultValue: "Show Results:" })}
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
        {/* Filters */}
        <div className="w-1/5 pr-12 border-r ml-42 mr-4">
          <h3 className="text-lg font-bold mb-4">{t("filters", { defaultValue: "Filters" })}</h3>
          <form onSubmit={handleSearchSubmit}>
            {/* Tags Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleTagsCollapse}
              >
                <h4 className="text-lg font-semibold">{t("tags", { defaultValue: "Tags" })}</h4>
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
                      className={`px-2 py-1 rounded-full flex items-center ${getTagColor(tag)}`}
                    >
                      <FaTag className="mr-2" />
                      <span className="mr-2">
                        {Array.from(tagMapping.entries()).find(([key, value]) => value === tag)?.[0]}
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
                  <option value="">
                    {t("selectATag", { defaultValue: "Select a tag" })}
                  </option>
                  {Array.from(tagMapping.keys()).map((tag) => (
                    <option key={tag} value={tagMapping.get(tag)}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleStatusCollapse}
              >
                <h4 className="text-lg font-semibold mb-1">
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
                <div className="mb-3 p-3">
                  <div className="flex justify-between items-center cursor-pointer">
                    <select
                      name="applicantStatus"
                      value={filters.applicantStatus}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 border rounded-md"
                    >
                      <option value="PENDING">{t("pendingOption", { defaultValue: "Pending" })}</option>
                      <option value="ACCEPTED">{t("acceptedOption", { defaultValue: "Accepted" })}</option>
                      <option value="REJECTED">{t("rejectedOption", { defaultValue: "Rejected" })}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {t("applyFilters", { defaultValue: "Apply Filters" })}
            </button>
          </form>
        </div>

        {/* Job Posts */}
        <div className="w-4/5 p-4 ml-4 mr-30">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              {totalElements >= 1
                ? t("searchReturnedJobPosts", {
                    count: totalElements,
                    defaultValue: `Search returned ${totalElements} job posts`,
                  })
                : t("noJobPostsFound", { defaultValue: "No job posts found" })}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}

          {jobPostsData.length === 0 ? (
            <p className="text-center">
              {t("noJobPostsFound", { defaultValue: "No jobs found." })}
            </p>
          ) : (
            <>
              <div
                className={
                  viewType === "card"
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto"
                    : "max-w-6xl mx-auto space-y-4"
                }
              >
                {jobPostsData.map((job) => {
                  // Status logic
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
                      } w-full ${viewType === "card" ? "max-w-sm" : ""} flex flex-col p-4 rounded-lg`}
                    >
                      {/* Title translated with defaultValue */}
                      <h3 className="text-xl font-semibold">
                        {t("jobTitle", { defaultValue: job.title })}
                      </h3>
                      <p className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-500" /> {job.address}
                      </p>
                      <p className="flex items-center gap-1">
                        <MdDateRange className="text-blue-500" />{" "}
                        {t("posted", { defaultValue: "Posted" })}:{" "}
                        {new Date(job.datePosted).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaUsers className="text-purple-500" />{" "}
                        {t("maxApplicants", { defaultValue: "Max Applicants" })}: {job.maxApplicants}
                      </p>

                      <p className="mt-2">
                        <strong>{t("description", { defaultValue: "Description" })}:</strong>{" "}
                        {job.description && job.description.length > 100
                          ? t("jobDescription", { defaultValue: job.description.slice(0, 100) + "..." })
                          : t("jobDescription", { defaultValue: job.description })}
                      </p>
                      {job.tags && job.tags.length > 0 && (
                        <p className="my-3 text-sm">
                          <strong>{t("tagsLabel", { defaultValue: "Tags" })}:</strong>{" "}
                          {job.tags
                            .map((tag) =>
                              Array.from(tagMapping.entries()).find(([key, value]) => value === tag)?.[0]
                            )
                            .join(", ")}
                        </p>
                      )}
                      <p className="flex items-center mt-2 gap-1">
                        <StatusIcon className={`${statusColor} mr-1`} />
                        <strong className="mr-2">
                          {t("jobStatus", { defaultValue: "Job Status" })}:
                        </strong>
                        <span className={statusColor}>{statusText}</span>
                      </p>
                      <p className="flex items-center mt-2 gap-1">
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
            </>
          )}
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-32 px-4 py-2 mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
              style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)" }}
            >
              {t("previous", { defaultValue: "Previous" })}
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1 || jobPostsData.length === 0}
              className="w-26 px-4 py-2 ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
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


