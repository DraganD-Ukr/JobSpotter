import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaList, FaTh, FaCircle } from "react-icons/fa"; 
import { ThemeContext } from "../components/ThemeContext";

// Helper function to determine icon/color/text for each report status
function getReportStatusInfo(report) {
  let statusColor = "text-gray-400";
  let statusText = "N/A";
  let StatusIcon = FaCircle; // Default icon

  switch (report.status) {
    case "OPEN":
      statusColor = "text-green-500";
      statusText = "Open";
      break;
    case "UNDER_REVIEW":
      statusColor = "text-yellow-500";
      statusText = "Under Review";
      break;
    case "PENDING_RESPONSE":
      statusColor = "text-orange-500";
      statusText = "Pending Response";
      break;
    case "RESOLVED":
      statusColor = "text-blue-500";
      statusText = "Resolved";
      break;
    case "REJECTED":
      statusColor = "text-red-500";
      statusText = "Rejected";
      break;
    case "ACTION_TAKEN":
      statusColor = "text-green-600";
      statusText = "Action Taken";
      break;
    case "ESCALATED":
      statusColor = "text-purple-500";
      statusText = "Escalated";
      break;
    case "ON_HOLD":
      statusColor = "text-indigo-500";
      statusText = "On Hold";
      break;
    case "AUTO_RESOLVED":
      statusColor = "text-teal-500";
      statusText = "Auto Resolved";
      break;
    default:
      statusColor = "text-gray-400";
      statusText = "N/A";
  }

  return { statusColor, statusText, StatusIcon };
}

export function SearchReport() {
  const { darkMode } = useContext(ThemeContext);

  // For reading/writing URL query params
  const [searchParams, setSearchParams] = useSearchParams();

  // Main data
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Card/list toggle
  const [viewType, setViewType] = useState("card");

  // Pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters
  const [filters, setFilters] = useState({
    tags: [],
    status: "",
    reportedUserId: "",
    reportedJobPostId: "",
    reportedApplicantId: "",
    reportedReviewId: "",
    sort: "createdAt",
    isAsc: true,
  });

  // Possible tag values
  const possibleTags = [
    "HARASSMENT",
    "SPAM",
    "INAPPROPRIATE_CONTENT",
    "MISINFORMATION",
    "POLICY_VIOLATION",
    "OTHER",
  ];

  // Possible statuses
  const possibleStatuses = [
    "OPEN",
    "UNDER_REVIEW",
    "PENDING_RESPONSE",
    "RESOLVED",
    "REJECTED",
    "ACTION_TAKEN",
    "ESCALATED",
    "ON_HOLD",
    "AUTO_RESOLVED",
  ];

  // Possible sort fields
  const possibleSortFields = [
    "reportId",
    "reportedId",
    "reportedUserId",
    "reportMessage",
    "reportStatus",
    "createdAt",
  ];

  /**
   * On mount or when searchParams/page/pageSize change:
   * 1) Sync local filter state from URL
   * 2) Fetch reports
   */
  useEffect(() => {
    syncFiltersFromUrl();
    fetchReports();
    // eslint-disable-next-line
  }, [searchParams, page, pageSize]);

  // 1) Sync local filters from the URL
  function syncFiltersFromUrl() {
    const urlTags = searchParams.getAll("tags");
    const urlStatus = searchParams.get("status") || "";
    const urlReportedUserId = searchParams.get("reportedUserId") || "";
    const urlReportedJobPostId = searchParams.get("reportedJobPostId") || "";
    const urlReportedApplicantId = searchParams.get("reportedApplicantId") || "";
    const urlReportedReviewId = searchParams.get("reportedReviewId") || "";
    const urlSort = searchParams.get("sort") || "createdAt";
    const urlIsAsc = searchParams.get("isAsc");
    let isAscBool = true;
    if (urlIsAsc === "false") {
      isAscBool = false;
    }

    setFilters({
      tags: urlTags,
      status: urlStatus,
      reportedUserId: urlReportedUserId,
      reportedJobPostId: urlReportedJobPostId,
      reportedApplicantId: urlReportedApplicantId,
      reportedReviewId: urlReportedReviewId,
      sort: urlSort,
      isAsc: isAscBool,
    });
  }

  // 2) Fetch reports from the server
  async function fetchReports() {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token") || "";
      const endpoint = `/api/v1/reports/search?${searchParams.toString()}&page=${page}&size=${pageSize}`;
      console.log("Fetching:", endpoint);

      const res = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch reports: ${res.statusText}`);
      }

      const data = await res.json();
      setReportsData(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // 3) When user clicks "Apply Filters"
  function handleFilterSubmit(e) {
    e.preventDefault();

    const newParams = new URLSearchParams();
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach((t) => {
        newParams.append("tags", t);
      });
    }
    if (filters.status) {
      newParams.set("status", filters.status);
    }
    if (filters.reportedUserId) {
      newParams.set("reportedUserId", filters.reportedUserId);
    }
    if (filters.reportedJobPostId) {
      newParams.set("reportedJobPostId", filters.reportedJobPostId);
    }
    if (filters.reportedApplicantId) {
      newParams.set("reportedApplicantId", filters.reportedApplicantId);
    }
    if (filters.reportedReviewId) {
      newParams.set("reportedReviewId", filters.reportedReviewId);
    }
    newParams.set("sort", filters.sort);
    newParams.set("isAsc", filters.isAsc ? "true" : "false");

    setSearchParams(newParams);
    setPage(0);
  }

  // 4) Toggle view (card/list)
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // 5) Pagination
  function handlePageChange(newPage) {
    setPage(newPage);
  }
  function handlePageSizeChange(e) {
    setPageSize(parseInt(e.target.value, 10));
    setPage(0);
  }
  function renderPaginationButtons() {
    const buttons = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 mx-1 rounded-full text-sm sm:text-base ${
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
            className={`px-4 py-2 mx-1 rounded-full text-sm sm:text-base ${
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
            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 text-sm sm:text-base"
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
            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 text-sm sm:text-base"
          >
            ...
          </button>
        );
      }
    }

    return buttons;
  }

  // 6) Render
  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p className="text-base sm:text-lg">Loading...</p>
      </div>
    );
  }

  // Add a helper for status icons/colors
  function getReportStatusInfo(report) {
    // Default
    let statusColor = "text-gray-400";
    let statusText = "N/A";
    let StatusIcon = FaCircle;

    switch (report.reportStatus) {
      case "Open":
        statusColor = "text-green-500";
        statusText = "Open";
        break;
      case "Under Review":
        statusColor = "text-yellow-500";
        statusText = "Under Review";
        break;
      case "Pending Response":
        statusColor = "text-orange-500";
        statusText = "Pending Response";
        break;
      case "Resolved":
        statusColor = "text-blue-500";
        statusText = "Resolved";
        break;
      case "Rejected":
        statusColor = "text-red-500";
        statusText = "Rejected";
        break;
      case "Action Taken":
        statusColor = "text-green-600";
        statusText = "Action Taken";
        break;
      case "Escalated":
        statusColor = "text-purple-500";
        statusText = "Escalated";
        break;
      case "On Hold":
        statusColor = "text-indigo-500";
        statusText = "On Hold";
        break;
      case "Auto Resolved":
        statusColor = "text-teal-500";
        statusText = "Auto Resolved";
        break;
      default:
        statusColor = "text-gray-400";
        statusText = "N/A";
    }
    return { statusColor, statusText, StatusIcon };
  }

  return (
    <div
      className={`my-6 sm:my-8 md:my-10 main-content min-h-screen p-2 sm:p-4 md:p-6 border rounded-2xl sm:rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      {/* Top bar: toggle view, pageSize */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <button
          onClick={toggleView}
          className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center text-sm sm:text-base"
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

        {/* Show Results Dropdown */}
        <div className="flex items-center">
          <label htmlFor="pageSize" className="mr-2 text-sm sm:text-base">
            Show Results:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 sm:px-3 sm:py-2 border rounded text-sm sm:text-base"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4">
        {/* Left column: Filters */}
        <div className="w-full md:w-1/3 lg:w-1/4 pr-0 md:pr-4 md:border-r mr-0 md:mr-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Filters</h3>
          <form onSubmit={handleFilterSubmit} className="space-y-4 sm:space-y-6">
            {/* reportedUserId */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">
                Reported User ID
              </label>
              <input
                type="text"
                value={filters.reportedUserId}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    reportedUserId: e.target.value,
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="UUID or numeric ID"
              />
            </div>
            {/* reportedJobPostId */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">
                Reported Job Post ID
              </label>
              <input
                type="text"
                value={filters.reportedJobPostId}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    reportedJobPostId: e.target.value,
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="Numeric ID"
              />
            </div>
            {/* reportedApplicantId */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">
                Reported Applicant ID
              </label>
              <input
                type="text"
                value={filters.reportedApplicantId}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    reportedApplicantId: e.target.value,
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="Numeric ID"
              />
            </div>
            {/* reportedReviewId */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">
                Reported Review ID
              </label>
              <input
                type="text"
                value={filters.reportedReviewId}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    reportedReviewId: e.target.value,
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="Numeric ID"
              />
            </div>
            {/* status */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">Status</label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="">Any</option>
                {possibleStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            {/* tags (multi-check) */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">Tags</label>
              <div className="flex flex-wrap gap-2">
                {possibleTags.map((tag) => (
                  <label
                    key={tag}
                    className={`inline-flex items-center space-x-2 px-2 py-1 sm:px-3 sm:py-1 border rounded-md cursor-pointer text-sm sm:text-base ${
                      darkMode
                        ? filters.tags.includes(tag)
                          ? "bg-blue-900 border-blue-700 text-white"
                          : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                        : filters.tags.includes(tag)
                        ? "bg-blue-50 border-blue-700 text-blue-800"
                        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => {
                        setFilters((prev) => {
                          const hasTag = prev.tags.includes(tag);
                          if (hasTag) {
                            return {
                              ...prev,
                              tags: prev.tags.filter((t) => t !== tag),
                            };
                          } else {
                            return {
                              ...prev,
                              tags: [...prev.tags, tag],
                            };
                          }
                        });
                      }}
                      className="hidden"
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Sorting Field */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                {possibleSortFields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            {/* Sort Order */}
            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">Sort Order</label>
              <select
                value={filters.isAsc ? "true" : "false"}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    isAsc: e.target.value === "true",
                  }))
                }
                className={`w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-sm sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="true">Ascending</option>
                <option value="false">Descending</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-md hover:bg-green-600 text-sm sm:text-base"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Right column: Reports list */}
        <div className="w-full md:w-2/3 lg:w-3/4 p-2 sm:p-4 ml-0 md:ml-4">
          <div className="flex flex-col items-start mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {totalElements > 0
                ? `Found ${totalElements} report(s)`
                : "No reports found"}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center text-sm sm:text-base">{errorMessage}</div>
          )}

          {reportsData.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No reports found.</p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-full mx-auto"
                  : "max-w-full mx-auto space-y-4"
              }
            >
              {reportsData.map((report) => {
                // Convert createdAt to a human-readable format
                const createdAtReadable = report.createdAt
                  ? new Date(report.createdAt).toLocaleString()
                  : "N/A";

                // Get status color/icon
                const { statusColor, statusText, StatusIcon } = getReportStatusInfo(report);
                
                // Build query params for the "Manage" link
                const queryParams = new URLSearchParams({
                  reportId: report.reportId?.toString() || "",
                  reportedUserId: report.reportedUserId?.toString() || "",
                  reportedJobPostId: report.reportedJobPostId?.toString() || "",
                  reportedApplicantId: report.reportedApplicantId?.toString() || "",
                  reportedReviewId: report.reportedReviewId?.toString() || "",
                  reportMessage: report.reportMessage || "",
                  reportTags: report.reportTags ? report.reportTags.join(",") : "",
                  reportStatus: report.reportStatus || "",
                  createdAt: report.createdAt || "",
                }).toString();

                return (
                  <div
                    key={report.reportId}
                    className={`border border-gray-300 p-3 sm:p-4 rounded-lg ${
                      viewType === "card"
                        ? "hover:shadow-md hover:border-green-500 transition"
                        : "shadow"
                    }`}
                  >
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      {report.reportTitle ? report.reportTitle : "No Title"}
                    </h2>

                    {/* Display the color-coded status */}
                    <p className="flex items-center text-xs sm:text-sm mb-2">
                      <strong className="mr-1">Status:</strong>
                      <StatusIcon className={`${statusColor} mr-1`} />
                      <span className={`${statusColor}`}>{statusText}</span>
                    </p>

                    <p className="text-xs sm:text-sm mb-2">
                      <strong>Tags:</strong>{" "}
                      {report.reportTags?.length
                        ? report.reportTags.join(", ")
                        : "None"}
                    </p>
                    <p className="text-xs sm:text-sm mb-2">
                      <strong>Created At:</strong> {createdAtReadable}
                    </p>
                    <p className="text-xs sm:text-sm mb-4 line-clamp-3">
                      <strong>Message:</strong>{" "}
                      {report.reportMessage || "N/A"}
                    </p>

                    {/* "Manage" link => AdminReportManagementPopup */}
                    <Link
                      to={`/adminreportmanagementpopup?${queryParams}`}
                      className="text-blue-500 hover:underline text-sm sm:text-base"
                    >
                      Manage
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-wrap justify-center mt-4 sm:mt-6 md:mt-8 space-x-1 sm:space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-24 sm:w-32 px-2 py-1 sm:px-4 sm:py-2 mr-2 sm:mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-sm sm:text-base"
              style={{
                clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)",
              }}
            >
              Previous
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1 || reportsData.length === 0}
              className="w-24 sm:w-32 px-2 py-1 sm:px-4 sm:py-2 ml-2 sm:ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-sm sm:text-base"
              style={{
                clipPath:
                  "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}