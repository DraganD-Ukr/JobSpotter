import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaList, FaTh, FaTimesCircle } from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";

export function SearchReport() {
  const { darkMode } = useContext(ThemeContext);

  //  State 
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // For card/list toggle
  const [viewType, setViewType] = useState("card");

  // Pagination states (zero-based page)
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filter state: adjust to match your actual fields
  const [filters, setFilters] = useState({
    title: "",
    status: "",
  });

  // For reading/writing query params
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTitle = searchParams.get("title") || "";
  const [localTitle, setLocalTitle] = useState(initialTitle);

  //  On mount, or when page/pageSize changes 
  useEffect(() => {
    fetchReports();

  }, [searchParams, page, pageSize]);

  //  Fetch function 
  async function fetchReports() {
    setLoading(true);
    setErrorMessage("");

    try {
      // Read the search params from the URL
      const queryTitle = searchParams.get("title") || "";
      const queryStatus = searchParams.get("status") || "";

      const endpoint = `/api/v1/reports/search?title=${encodeURIComponent(
        queryTitle
      )}&status=${encodeURIComponent(queryStatus)}&page=${page}&size=${pageSize}`;

      console.log("Fetching:", endpoint);

      const res = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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

  //  Handle form submit 
  function handleSearchSubmit(e) {
    e.preventDefault();

    // Update the URL’s search params with our filter states
    const newParams = {
      ...filters,
      title: localTitle, 
    };

    Object.keys(newParams).forEach((key) => {
      if (!newParams[key]) delete newParams[key];
    });

    // Convert to search params
    setSearchParams(newParams);
    // Reset page to 0
    setPage(0);
  }

  //  Toggle view 
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  //  Pagination 
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handlePageSizeChange(e) {
    setPageSize(parseInt(e.target.value, 10));
    setPage(0);
  }

  // For rendering pagination buttons (similar to your job code)
  function renderPaginationButtons() {
    const buttons = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
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
          >
            ...
          </button>
        );
      }
    }

    return buttons;
  }

  //  Render 
  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            placeholder="Search reports by title..."
            className="px-4 py-2 border rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            Search
          </button>
        </form>

        {/* Toggle View Button */}
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

        {/* Show Results Dropdown */}
        <div className="justify-center ml-10 flex items-center">
          <label htmlFor="pageSize" className="mr-2">
            Show Results:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="flex">
        {/* Left column: filters */}
        <div className="w-1/5 pr-12 border-r mr-4">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <form onSubmit={handleSearchSubmit}>
            {/* Example filter: status */}
            <div className="mb-4 p-4 border rounded-md">
              <label className="block mb-2 font-semibold">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="">Any</option>
                <option value="OPEN">OPEN</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>


            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Right column: reports list */}
        <div className="w-4/5 p-4 ml-4">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              {totalElements > 0
                ? `Search returned ${totalElements} reports`
                : "No reports found"}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}

          {reportsData.length === 0 ? (
            <p className="text-center">No reports found.</p>
          ) : (
            <div
              className={
                viewType === "card"
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                  : "max-w-6xl mx-auto space-y-4"
              }
            >
              {reportsData.map((report) => {
                const queryParams = new URLSearchParams({
                  reportId: report.reportId || "",
                  reportSubjectType: report.reportSubjectType || "",
                  reportSubjectId: report.reportSubjectId?.toString() || "",
                  reportedUserId: report.reportedUserId?.toString() || "",
                  reportedJobPostId: report.reportedJobPostId?.toString() || "",
                  reviewId: report.reviewId?.toString() || "",
                  reviewMessage: report.reviewMessage || "",
                  reportMessage: report.reportMessage || "",
                  reportTags: report.reportTags ? report.reportTags.join(",") : "",
                  reportStatus: report.reportStatus || "",
                  createdAt: report.createdAt || "",
                }).toString();

                return (
                  <div
                    key={report.reportId}
                    className={`border border-gray-300 p-4 rounded-lg ${
                      viewType === "card"
                        ? "hover:shadow-md hover:border-green-500 transition"
                        : "shadow"
                    }`}
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      Report ID: {report.reportId}
                    </h2>
                    <p className="text-sm mb-2">
                      <strong>Title:</strong> {report.title || "N/A"}
                    </p>
                    <p className="text-sm mb-2">
                      <strong>Status:</strong> {report.status || "N/A"}
                    </p>
                    <p className="text-sm mb-4 line-clamp-3">
                      <strong>Description:</strong>{" "}
                      {report.description || "N/A"}
                    </p>

                    {/* "Manage" link that opens AdminReportManagementPopup */}
                    <Link
                      to={`/adminreportmanagementpopup?${queryParams}`}
                      className="text-blue-500 hover:underline"
                    >
                      Manage
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-32 px-4 py-2 mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
              style={{
                clipPath:
                  "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)",
              }}
            >
              Previous
            </button>

            {renderPaginationButtons()}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1 || reportsData.length === 0}
              className="w-26 px-4 py-2 ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
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
