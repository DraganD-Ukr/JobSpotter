import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
  
  // Read "title" from URL query parameters (if provided)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("title") || "";
  const [localQuery, setLocalQuery] = useState(initialQuery);

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  function fetchJobs() {
    setLoading(true);
    // Use search API if title parameter exists; otherwise fetch all jobs.
    const query = searchParams.get("title") || "";
    const endpoint = query
      ? `/api/v1/job-posts/search?title=${encodeURIComponent(query)}`
      : `/api/v1/job-posts`;

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
        // If data isn't an array, assume it's paginated with a "content" property.
        const jobsArray = Array.isArray(data) ? data : data.content || [];
        setJobPostsData(processJobs(jobsArray));
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
    setSearchParams({ title: localQuery });
  }

  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-4">
      {/* Header & Controls */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          {searchParams.get("title")
            ? `Results for "${searchParams.get("title")}"` 
            : "Showing All Jobs"}
        </h2>
        {/* Row with search bar & view toggle side-by-side */}
        <div className="flex gap-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search jobs..."
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
            className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
          >
            {viewType === "card"
              ? "Switch to List View"
              : "Switch to Card View"}
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
            // CARD VIEW: Grid layout using global .card styling
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
                      <strong>Tags:</strong> {job.tags.join(", ")}
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
            // LIST VIEW: Vertical list layout
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
                        <strong>Tags:</strong> {job.tags.join(", ")}
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
    </div>
  );
}
