import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaList, FaTh, FaTag, FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUsers, FaRoute } from "react-icons/fa"; // Import icons for the toggle button and tags
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext for dark mode
import { MdDateRange } from "react-icons/md";

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
  const [totalElements, setTotalElements] = useState(0);
  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    latitude: "",
    longitude: "",
    radius: 50,
  });


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

    // Read query parameters
    const query = searchParams.get("title") || "";
    let tags = searchParams.get("tags") || "";  // This will be a comma-separated string
    const latitude = searchParams.get("latitude") || "";
    const longitude = searchParams.get("longitude") || "";
    const radius = searchParams.get("radius") || "";
    const size = 10;


    // Ensure tagArray is an array and join the tags into a string
    const tagArray = filters.tags || []; // Default to an empty array if filters.tags is undefined or null
    const tagsParam = tagArray.length > 0 ? (tagArray.join(",")) : ""; // Only join if tags are present

    // Construct the API endpoint
    const endpoint = `/api/v1/job-posts/search?title=${encodeURIComponent(query)}&tags=${encodeURIComponent(tagsParam)}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&pageNumber=${page}&size=${size}`;

    // Log the endpoint for debugging
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

        // Update total elements and total pages
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

    // Join the tags array into a comma-separated string
    const tagsParam = filters.tags.join(",");

    // Update the search parameters
    setSearchParams({ ...filters, title: localQuery, tags: tagsParam });
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

    if (totalPages <= maxButtons) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            id={page === i ? "active-page" : "page-button"}// Correctly apply the ID conditionally
            className={`px-4 py-2 mx-1 rounded-full ${page === i
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
          >
            {console.log(`Page: ${page}, i: ${i}, Active ID: ${page === i ? "active-page" : "none"}`)}
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
            id={page === i ? "active-page" : "page-button"}// Correctly apply the ID conditionally
            className={`px-4 py-2 mx-1 rounded-full ${page === i
              ? "bg-green-500 light:bg-amber-400 text-white"
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
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
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
        {/* Filters */}
        <div className="w-1/5 pr-12 border-r ml-42 mr-4">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <form onSubmit={handleSearchSubmit}>
            {/* Tags Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div className="flex justify-between items-center cursor-pointer" onClick={toggleTagsCollapse}>
                <h4 className="text-lg font-semibold">Tags</h4>
                {isTagsCollapsed ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${isTagsCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {filters.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full flex items-center ${getTagColor(tag)}`}
                    >
                      <FaTag className="mr-2" />
                      <span className="mr-2">
                        {Array.from(reversedTagMapping.entries()).find(([key, value]) => value === tag)?.[0]}
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
                  {Array.from(reversedTagMapping.keys()).map((tag) => (
                    <option key={tag} value={reversedTagMapping.get(tag)}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div className="flex justify-between items-center cursor-pointer" onClick={toggleLocationCollapse}>
                <h4 className="text-lg font-semibold">Location</h4>
                {isLocationCollapsed ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${isLocationCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
              >
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  className="w-full px-4 py-2 border rounded-md mb-2"
                  onChange={(e) => {
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
                  <p className="text-sm text-green-500 mt-2 text-center">
                    Using your current location
                  </p>
                )}
              </div>
            </div>

            {/* Radius Section */}
            <div className="mb-4 p-4 border rounded-md">
              <div className="flex justify-between items-center cursor-pointer" onClick={toggleRadiusCollapse}>
                <h4 className="text-lg font-semibold">Radius (km)</h4>
                {isRadiusCollapsed ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${isRadiusCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
              >
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
                      background: `linear-gradient(to right, #3b82f6 ${filters.radius / 5}%, #d1d5db ${filters.radius / 5}%)`,
                    }}
                  />
                  <div className="absolute w-full top-4 flex justify-between">
                    {[0, 100, 200, 300, 400, 500].map((value) => (
                      <div key={value} className="relative">
                        <div className={`w-0.5 h-3 bg-gray-500 mx-auto`}></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  {[0, 100, 200, 300, 400, 500].map((value) => (
                    <span key={value} className="w-8 text-center">{value}</span>
                  ))}
                </div>
                <p className="text-sm mt-2 text-gray-600">Radius: {filters.radius} km</p>
              </div>
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
        <div className="w-4/5 p-4 ml-4 mr-30">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              {searchParams.get("title")
                ? `Search returned ${totalElements} job posts`
                : "Showing All Jobs"}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}



          {jobPostsData.length === 0 ? (
            <p className="text-center">No jobs found.</p>
          ) : (
            <>
              
                <div className={viewType === "card" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto" : "max-w-6xl mx-auto space-y-4"}>
                  {jobPostsData.map((job) => (
                    <Link to={`/job/${job.jobPostId}`}
                key={job.jobPostId}
              >
                    <div
                      key={job.jobPostId}
                      className={`card border border-gray-300 ${viewType === "card" ? "hover:shadow-md hover:border-green-500 transition" : "rounded-lg shadow"} w-full ${viewType === "card" ? "max-w-sm" : ""} flex flex-col p-4 rounded-lg`}
                    >
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-500" /> {job.address}
                      </p>
                      <p className="flex items-center gap-1">
                        <MdDateRange className="text-blue-500" /> Posted: {new Date(job.datePosted).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaUsers className="text-purple-500" /> Max Applicants: {job.maxApplicants}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaRoute className="text-green-500" /> Distance: {parseFloat(job.relevantDistance).toFixed(2)} km
                      </p>
                      <p className="mt-2">
                        <strong>Description:</strong>  {job.description.length > 100 ? job.description.slice(0, 100) + "..." : job.description}
                      </p>
                      {job.tags && job.tags.length > 0 && (
                        <p className="my-3 text-sm">

                          {job.tags
                            .map((tag) => Array.from(reversedTagMapping.entries()).find(([key, value]) => value === tag)?.[0])
                            .join(", ")}
                        </p>
                      )}
                      <input type="hidden" value={job.jobPostId} />
                      
                    </div>
                    </Link>
                  ))}
                </div>
              
            </>
          )}


          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {/* Previous Button - Left arrow */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="w-32 px-4 py-2 mr-6 mx-1 bg-gray-300 text-black rounded-l-full rounded-r-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
              id="navigate-page"
              style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0% 100%, 0% 0%)" }}
            >
              Previous
            </button>

            {renderPaginationButtons()}

            {/* Next Button - Right arrow */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1 || (jobPostsData.length === 0)}
              className="w-26 px-4 py-2 ml-6 mx-1 bg-gray-300 text-black rounded-r-full rounded-l-md hover:bg-gray-400 disabled:opacity-50 flex justify-center"
              id="navigate-page"
              style={{ clipPath: "polygon(0% 0%, 15% 50%, 0% 100%, 100% 100%, 100% 0%)" }}
            >
              Next
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
