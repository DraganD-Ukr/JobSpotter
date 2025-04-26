import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaList, FaTh, FaCircle } from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";

// Helper function to determine icon/color/text for each report status
function getReportStatusInfo(report) {
  let statusColor = "text-gray-400";
  let statusText = "N/A";
  let StatusIcon = FaCircle;

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


  useEffect(() => {
    syncFiltersFromUrl();
    fetchReports();

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
            className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 rounded-full text-sm xs:text-base sm:text-base ${
              page === i
                ? "bg-green-500 text-white"
                : darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
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
                : darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
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
            className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 rounded-full text-sm xs:text-base sm:text-base ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
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
            className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mx-1 rounded-full text-sm xs:text-base sm:text-base ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
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
      <div className="main-content min-h-screen flex items-center justify-center p-4 xs:p-6 sm:p-8">
        <p className="text-sm xs:text-base sm:text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`my-6 xs:my-8 sm:my-10 main-content min-h-screen p-4 xs:p-6 sm:p-8 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      {/* Top bar: toggle view, pageSize */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 xs:mb-8 sm:mb-8 gap-3 xs:gap-4 sm:gap-5">
        <button
          onClick={toggleView}
          className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center w-full sm:w-auto text-sm xs:text-base sm:text-base`}
          id="toggle-view"
        >
          {viewType === "card" ? (
            <>
              <FaList className="mr-1 xs:mr-2" />
              List View
            </>
          ) : (
            <>
              <FaTh className="mr-1 xs:mr-2" />
              Card View
            </>
          )}
        </button>

        {/* Show Results Dropdown */}
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="pageSize" className="mr-2 text-sm xs:text-base sm:text-base">
            Show Results:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className={`px-2 xs:px-2 sm:px-2 py-1 xs:py-1 sm:py-1 border rounded text-sm xs:text-base sm:text-base ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left column: Filters */}
        <div className="w-full lg:w-1/4 pr-0 lg:pr-6 xs:pr-8 mb-6 lg:mb-0">
          <h3 className="text-lg xs:text-xl sm:text-xl font-bold mb-4 xs:mb-6 sm:mb-8">
            Filters
          </h3>
          <form onSubmit={handleFilterSubmit} className="space-y-4 xs:space-y-6 sm:space-y-8">
            {/* reportedUserId */}
            <div>
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
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
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="UUID or numeric ID"
              />
            </div>
            {/* reportedJobPostId */}
            <div>
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
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
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="Numeric ID"
              />
            </div>
            {/* reportedApplicantId */}
            <div>
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
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
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="Numeric ID"
              />
            </div>
            {/* reportedReviewId */}
            <div>
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
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
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                placeholder="Numeric ID"
              />
            </div>
            {/* status */}
            <div>
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
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
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
                {possibleTags.map((tag) => (
                  <label
                    key={tag}
                    className={`inline-flex items-center space-x-2 px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 border rounded-md cursor-pointer text-sm xs:text-base sm:text-base ${
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
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }))
                }
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
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
              <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
                Sort Order
              </label>
              <select
                value={filters.isAsc ? "true" : "false"}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    isAsc: e.target.value === "true",
                  }))
                }
                className={`w-full px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md text-sm xs:text-base sm:text-base ${
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
              className="w-full bg-green-500 text-white px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 rounded-md hover:bg-green-600 text-sm xs:text-base sm:text-base"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Right column: Reports list */}
        <div className="w-full lg:w-3/4 p-4 xs:p-6 sm:p-8">
          <div className="flex flex-col items-start mb-4 xs:mb-6 sm:mb-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4">
              {totalElements > 0
                ? `Found ${totalElements} report(s)`
                : "No reports found"}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 xs:mb-6 sm:mb-8 text-center text-sm xs:text-base sm:text-lg">
              {errorMessage}
            </div>
          )}

          {reportsData.length === 0 ? (
            <p className="text-center text-sm xs:text-base sm:text-lg">
              No reports found.
            </p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-full mx-auto"
                  : "max-w-full mx-auto space-y-4 xs:space-y-6 sm:space-y-8"
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
                    className={`border p-4 xs:p-6 sm:p-8 rounded-lg ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    } ${
                      viewType === "card"
                        ? "hover:shadow-md hover:border-green-500 transition"
                        : "shadow"
                    }`}
                  >
                    <h2 className="text-base xs:text-lg sm:text-lg font-semibold mb-2 xs:mb-3 sm:mb-4">
                      {report.reportTitle ? report.reportTitle : "No Title"}
                    </h2>

                    {/* Display the color-coded status */}
                    <p className="flex items-center text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-4">
                      <strong className="mr-1">Status:</strong>
                      <StatusIcon className={`${statusColor} mr-1`} />
                      <span className={`${statusColor}`}>{statusText}</span>
                    </p>

                    <p className="text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-4">
                      <strong>Tags:</strong>{" "}
                      {report.reportTags?.length
                        ? report.reportTags.join(", ")
                        : "None"}
                    </p>
                    <p className="text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-4">
                      <strong>Created At:</strong> {createdAtReadable}
                    </p>
                    <p className="text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-4 line-clamp-3">
                      <strong>Message:</strong>{" "}
                      {report.reportMessage || "N/A"}
                    </p>

                    {/* "Manage" link => AdminReportManagementPopup */}
                    <Link
                      to={`/adminreportmanagementpopup?${queryParams}`}
                      className="text-blue-500 hover:underline text-sm xs:text-base sm:text-base"
                    >
                      Manage
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6 xs:mt-8 sm:mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-28 xs:w-32 sm:w-32 px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 mr-4 xs:mr-6 sm:mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-sm xs:text-base sm:text-base"
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
              className="w-24 xs:w-26 sm:w-26 px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 ml-4 xs:ml-6 sm:ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center text-sm xs:text-base sm:text-base"
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