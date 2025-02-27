import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { FaList, FaTh, FaTag } from "react-icons/fa"; // Import icons for the toggle button and tags
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext for dark mode

const reversedTagMapping = new Map([
  ["General Help", "GENERAL_HELP"],
  ["Handyman Services", "HANDYMAN_SERVICES"],
  ["Skilled Trades", "SKILLED_TRADES"],
  ["Cleaning Services", "CLEANING_SERVICES"],
  ["Delivery Services", "DELIVERY_SERVICES"],
  ["Caregiving", "CAREGIVING"],
  ["Pet Care", "PET_CARE"],
  ["Tutoring/Mentoring", "TUTORING_MENTORING"],
  ["Event Staff", "EVENT_STAFF"],
  ["Administrative Support", "ADMINISTRATIVE_SUPPORT"],
  ["Virtual Assistance", "VIRTUAL_ASSISTANCE"],
  ["Food Services", "FOOD_SERVICES"],
  ["Gardening/Landscaping", "GARDENING_LANDSCAPING"],
  ["Community Outreach", "COMMUNITY_OUTREACH"],
  ["IT Support", "IT_SUPPORT"],
  ["Creative Services", "CREATIVE_SERVICES"],
  ["Personal Services", "PERSONAL_SERVICES"],
  ["Tutoring Languages", "TUTORING_LANGUAGES"],
  ["Music Instruction", "MUSIC_INSTRUCTION"],
  ["Home Maintenance", "HOME_MAINTENANCE"],
  ["Transportation Assistance", "TRANSPORTATION_ASSISTANCE"],
  ["Errands/Shopping", "ERRANDS_SHOPPING"],
  ["Volunteer Work", "VOLUNTEER_WORK"],
  ["Community Events", "COMMUNITY_EVENTS"],
  ["Fundraising", "FUNDRAISING"],
  ["Animal Welfare", "ANIMAL_WELFARE"],
  ["Mentoring (Community)", "MENTORING"],
  ["Health Support", "HEALTH_SUPPORT"],
  ["Counseling Support", "COUNSELING_SUPPORT"],
  ["Disaster Relief", "DISASTER_RELIEF"],
  ["Environmental Conservation", "ENVIRONMENTAL_CONSERVATION"],
  ["Other", "OTHER"],
]);

export function SearchJobPost() {
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("card"); // "card" or "list"
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    latitude: "",
    longitude: "",
    radius: 50,
  });

  // Read "title" from URL query parameters (if provided)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("title") || "";
  const [localQuery, setLocalQuery] = useState(initialQuery);

  const { darkMode } = useContext(ThemeContext); // Use dark mode context

  const [tagColors, setTagColors] = useState({});

  // UseState for added tags colors to prevent change on re-render
  const getTagColor = (tag) => {
    if (tagColors[tag]) {
      return tagColors[tag]; // Return already assigned color
    } else {
      const newColor = getRandomColor(); // Generate new color
      setTagColors((prevColors) => ({
        ...prevColors,
        [tag]: newColor, // Assign the new color to the tag
      }));
      return newColor; // Return the new color
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams, page]);

  function fetchJobs() {
    setLoading(true);
    // Use search API if title parameter exists; otherwise fetch all jobs.
    const query = searchParams.get("title") || "";
    const tags = searchParams.get("tags") || "";
    const latitude = searchParams.get("latitude") || "";
    const longitude = searchParams.get("longitude") || "";
    const radius = searchParams.get("radius") || "";
    const size = 10;

    const endpoint = `/api/v1/job-posts/search?title=${encodeURIComponent(query)}&tags=${encodeURIComponent(tags)}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&pageNumber=${page}&size=${size}`;

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
          return reversedTagMapping.get(enumVal) || enumVal;
        });
      }
      return { ...job, tags: friendlyTags };
    });
  }

  // Example "Apply Now" action
  function handleApply(jobPostId) {
    alert(`Applying to job: ${jobPostId}`);
  }

  // Toggle between "card" and "list" view
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // On search submit, update URL query parameter; triggers refetch via useEffect
  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchParams({ ...filters, title: localQuery });
  }

  // Handle filter changes
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // Handle tag addition
  function handleAddTag(tag) {
    if (!filters.tags.includes(tag)) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  }

  // Handle tag removal
  function handleRemoveTag(tag) {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  // Handle pagination
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  // Generate pagination buttons
  function renderPaginationButtons() {
  const maxButtons = 5;
  const buttons = [];

  // Add classes based on darkMode state
  const lightModeClasses = "bg-gray-300 text-black hover:bg-gray-400";
  const darkModeClasses = "bg-gray-700 text-white hover:bg-gray-600";
  const activeButtonClasses = "bg-green-500 text-white";

  if (totalPages <= maxButtons) {
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-full ${
            page === i ? activeButtonClasses : darkMode ? darkModeClasses : lightModeClasses
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
            page === i ? activeButtonClasses : darkMode ? darkModeClasses : lightModeClasses
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
          className={`px-4 py-2 mx-1 rounded-full ${darkMode ? darkModeClasses : lightModeClasses}`}
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
          className={`px-4 py-2 mx-1 rounded-full ${darkMode ? darkModeClasses : lightModeClasses}`}
        >
          ...
        </button>
      );
    }
  }

  return buttons;
}


  // Handle location search
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

  function getRandomColor() {
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
    
  
    
    return colors[Math.floor(Math.random() * colors.length)];
  }

  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  

  return (
    <div className={`main-content min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex flex-wrap">
        {/* Filters */}
        <div className="w-1/4 p-4 border-r">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <form onSubmit={handleSearchSubmit}>
            <div className="mb-4">

              <label className="block mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {filters.tags.map((tag) => (

                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full flex items-center ${getTagColor(tag)}`}
                  >
                    <FaTag className="mr-2" />
                    <span className="mr-2">{Array.from(reversedTagMapping.entries()).find(([key, value]) => value === tag)?.[0]}</span>
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
                {Array.from(reversedTagMapping.keys()).map((tag) => (
                  <option key={tag} value={reversedTagMapping.get(tag)}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Location</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                className="w-full px-4 py-2 border rounded-md mb-2"
                onChange={(e) => {
                  // Use a geocoding service to convert address to latitude and longitude
                  // For simplicity, this example assumes the address is already in the correct format
                  const [latitude, longitude] = e.target.value.split(",");
                  setFilters((prev) => ({
                    ...prev,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
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
                <p className="text-sm text-green-500 mt-2">
                  Using current location: {filters.latitude}, {filters.longitude}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Radius (km)</label>
              <input
                type="range"
                name="radius"
                min="0"
                max="500"
                value={filters.radius}
                onChange={handleFilterChange}
                className="w-full"
              />
              <p className="text-sm mt-2">Radius: {filters.radius} km</p>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Job Posts */}
        <div className="w-3/4 p-4">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              {searchParams.get("title")
                ? `Results for "${searchParams.get("title")}"`
                : "Showing All Jobs"}
            </h2>
            <div className="flex gap-4">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Search jobs by title..."
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
                className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 flex items-center"
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
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}

          {jobPostsData.length === 0 ? (
            <p className="text-center">No jobs found.</p>
          ) : (
            <>
              {viewType === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                  {jobPostsData.map((job) => (
                    <div
                      key={job.jobPostId}
                      className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col"
                    >
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="mt-2">{job.description}</p>
                      {job.tags && job.tags.length > 0 && (
                        <p className="mt-2 text-sm">
                          <strong>Tags:</strong>{" "}
                          {job.tags
                            .map((tag) => Array.from(reversedTagMapping.entries()).find(([key, value]) => value === tag)?.[0])
                            .join(", ")}
                        </p>
                      )}
                      <div className="mt-4">
                        <button
                          onClick={() => handleApply(job.jobPostId)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-w-6xl mx-auto space-y-4">
                  {jobPostsData.map((job) => (
                    <div
                      key={job.jobPostId}
                      className="card border border-gray-300 rounded-lg p-4 shadow flex flex-col sm:flex-row justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="mt-2">{job.description}</p>
                        {job.tags && job.tags.length > 0 && (
                          <p className="mt-2 text-sm">
                            <strong>Tags:</strong>{" "}
                            {job.tags
                              .map((tag) => Array.from(reversedTagMapping.entries()).find(([key, value]) => value === tag)?.[0])
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-start sm:items-end">
                        <button
                          onClick={() => handleApply(job.jobPostId)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="px-4 py-2 mx-1 bg-gray-300 text-black rounded-full hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
