import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaList, FaTh, FaTag, FaMapMarkerAlt, FaUsers, FaRoute } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { ThemeContext } from "../components/ThemeContext";


export function MyJobs() {
  // State for dynamic tag mapping via API
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
        Object.keys(tagsData).forEach(enumValue => {
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

  // State for jobs data, loading, and errors
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Card vs. List view
  const [viewType, setViewType] = useState("card");

  // Pagination states
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters & search
  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    latitude: "",
    longitude: "",
    radius: 50,
    // Control sorting on the top-right
    sortBy: "latest", // Could be "latest", "oldest", etc.
  });

  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  // For dynamic tag colors in the filters sidebar (optional)
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

  // Fetch "My Jobs" on mount and whenever page or sortBy changes
  useEffect(() => {
    fetchMyJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.sortBy]);

  function fetchMyJobs() {
    setLoading(true);
    const size = 9;
    // Include sortBy in your query if your backend supports it
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
        // If backend returns a simple array
        if (Array.isArray(data)) {
          setJobs(processJobs(data));
          setTotalElements(data.length);
          setTotalPages(1);
        } else {
          // Otherwise, assume paginated
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

  // Convert tag enums to user-friendly strings
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

  // Toggle Card/List view
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // Search submit handler
  function handleSearchSubmit(e) {
    e.preventDefault();
    // Optionally re-fetch jobs using the updated title filter
    fetchMyJobs();
  }

  // Handle filter changes (slider, etc.)
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // Tag addition/removal
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

  // Handle location search (uses browser geolocation)
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

  // Navigate to job details page
  function handleViewDetails(jobId) {
    navigate(`/myJob/${jobId}`);
  }

  // Pagination
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
        buttons.push(
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
    <div
      className={`main-content min-h-screen p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Search Bar & Toggle Button */}
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
        {/* Sidebar Filters */}
        <div className="w-1/5 pr-12 border-r ml-42 mr-4">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <form onSubmit={handleSearchSubmit}>
            {/* Tags Filter */}
            <div className="mb-4 p-4 border rounded-md">
              <label className="block mb-2">Tags</label>
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
                          ([, val]) => val === tag
                        )?.[0] || tag
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

        {/* Jobs Listing */}
        <div className="w-4/5 p-4 ml-4 mr-30">
          {/* Header with "Showing X Jobs" and Sort By dropdown in top-right */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              Showing {totalElements} Job{totalElements !== 1 ? "s" : ""}
            </h2>

            {/* Sort By Dropdown (Top-Right) */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sortBy" className="font-medium">
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="px-3 py-2 border rounded-md"
              >
                <option value="datePosted">Date Posted</option>
#                {/* Add more sort options as needed */}
              </select>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}

          {jobs.length === 0 ? (
            <p className="text-center">No jobs found.</p>
          ) : (
            <>
              <div
                className={
                  viewType === "card"
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                    : "max-w-6xl mx-auto space-y-4"
                }
              >
                {jobs.map((job) => (
                  <div
                    key={job.jobPostId}
                    className={`card border border-gray-300 ${
                      viewType === "card"
                        ? "hover:shadow-md hover:border-green-500 transition rounded-md w-full max-w-sm flex flex-col p-4"
                        : "rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between"
                    }`}
                  >
                    {/* Title */}
                    <h3 className="text-xl font-semibold">{job.title}</h3>

                    {/* Address (if present) */}
                    {job.address && (
                      <p className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-500" /> {job.address}
                      </p>
                    )}

                    {/* Date Posted (if present) */}
                    {job.datePosted && (
                      <p className="flex items-center gap-1">
                        <MdDateRange className="text-blue-500" /> Posted:{" "}
                        {new Date(job.datePosted).toLocaleDateString()}
                      </p>
                    )}

                    {/* Max Applicants (if present) */}
                    {typeof job.maxApplicants !== "undefined" && (
                      <p className="flex items-center gap-1">
                        <FaUsers className="text-purple-500" /> Max Applicants:{" "}
                        {job.maxApplicants}
                      </p>
                    )}

                    {/* Distance (if present) */}
                    {typeof job.relevantDistance !== "undefined" && (
                      <p className="flex items-center gap-1">
                        <FaRoute className="text-green-500" /> Distance:{" "}
                        {parseFloat(job.relevantDistance).toFixed(2)} km
                      </p>
                    )}

                    {/* Description (truncate if >100 chars) */}
                    <p className="mt-2">
                      <strong>Description:</strong>{" "}
                      {job.description && job.description.length > 100
                        ? job.description.slice(0, 100) + "..."
                        : job.description}
                    </p>

                    {/* Tags */}
                    {job.tags && job.tags.length > 0 && (
                      <p className="my-3 text-sm">
                        <strong>Tags:</strong> {job.tags.join(", ")}
                      </p>
                    )}

                    {/* View Details Button */}
                    <div className="mt-4">
                      <button
                        onClick={() => handleViewDetails(job.jobPostId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                      >
                        View More Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="w-24 px-4 py-2 mx-1 bg-gray-300 text-black rounded-l-full hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>

              {renderPaginationButtons()}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages - 1}
                className="w-24 px-4 py-2 mx-1 bg-gray-300 text-black rounded-r-full hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
