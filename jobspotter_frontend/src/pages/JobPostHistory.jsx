import { useEffect, useState } from "react";

// Example: enumValue -> friendly label
const tagMapping = new Map([
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

export function JobPostHistory() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null); // Only one job expands

  useEffect(() => {
    fetchJobPostHistory();
  }, []);

  // Fetch job post history from /api/v1/job-posts/history
  function fetchJobPostHistory() {
    setLoading(true);

    fetch("/api/v1/job-posts/history", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch job post history");
        }
        return res.json();
      })
      .then((data) => {
        const content = data.content || [];

        // Convert enum objects -> friendly labels
        // Use jobId or fallback to index
        const jobsWithFriendlyTags = content.map((job, index) => {
          const jobId = job.jobId || job.id || index;

          let friendlyTags = [];
          if (Array.isArray(job.tags)) {
            friendlyTags = job.tags.map((tagObj) => {
              const enumValue = tagObj.tagName || tagObj.name || tagObj.value;
              return tagMapping.get(enumValue) || enumValue;
            });
          }

          return {
            ...job,
            jobId,
            tags: friendlyTags,
          };
        });

        setJobs(jobsWithFriendlyTags);
      })
      .catch((err) => {
        console.error("Error fetching job post history:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  // Toggle details for only one job at a time
  function handleToggleDetails(jobId) {
    setExpandedJobId(jobId === expandedJobId ? null : jobId);
  }

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen">
        <p>Loading job post history...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Job Post History</h1>

      {errorMessage && (
        <div className="max-w-3xl mx-auto text-red-500 mb-4">{errorMessage}</div>
      )}

      {jobs.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <p>No job history found.</p>
        </div>
      ) : (
        // GRID LAYOUT for cards
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto place-items-center">
          {jobs.map((job) => {
            const jobId = job.jobId;
            const isExpanded = expandedJobId === jobId;

            return (
              <div
                key={jobId}
                // White card, light border, forced black text
                className="bg-white border border-gray-300 rounded-xl p-4 shadow flex flex-col justify-between w-full max-w-sm text-black"
              >
                {/* Card Header */}
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{job.description}</p>
                </div>

                {/* "View More Details" Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleToggleDetails(jobId)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    {isExpanded ? "Hide Details" : "View More Details"}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 bg-gray-100 text-black rounded-lg p-3 shadow-inner">
                    <p>
                      <strong>Job ID:</strong> {jobId}
                    </p>
                    <p>
                      <strong>Address ID:</strong> {job.addressId || "N/A"}
                    </p>
                    <p>
                      <strong>Max Applicants:</strong>{" "}
                      {job.maxApplicants || "N/A"}
                    </p>
                    {job.tags && job.tags.length > 0 && (
                      <p>
                        <strong>Tags:</strong> {job.tags.join(", ")}
                      </p>
                    )}
                    {job.status && (
                      <p>
                        <strong>Status:</strong> {job.status}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
