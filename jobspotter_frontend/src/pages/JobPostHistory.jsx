import { useEffect, useState } from "react";

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
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [viewType, setViewType] = useState("card"); // "card" or "list"

  useEffect(() => {
    fetchJobPostHistory();
  }, []);

  function fetchJobPostHistory() {
    setLoading(true);
    fetch("/api/v1/job-posts/history", {
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
          return { ...job, jobId, tags: friendlyTags };
        });
        setJobs(jobsWithFriendlyTags);
      })
      .catch((err) => {
        console.error("Error fetching job post history:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  function handleToggleDetails(jobId) {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  }

  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  if (loading) {
    return (
      <div className="main-content min-h-screen flex items-center justify-center">
        <p>Loading job post history...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Job Post History
      </h1>

      {errorMessage && (
        <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
      )}

      {jobs.length === 0 ? (
        <p className="text-center">No job history found.</p>
      ) : (
        <>
          {/* Toggle View Button */}
          <div className="max-w-6xl mx-auto mb-4">
            <button
              onClick={toggleView}
              className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
            >
              {viewType === "card"
                ? "Switch to List View"
                : "Switch to Card View"}
            </button>
          </div>

          {viewType === "card" ? (
            /* ====== CARD VIEW ====== */
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {jobs.map((job) => {
                const jobId = job.jobId;
                const isExpanded = expandedJobId === jobId;
                return (
                  <div
                    key={jobId}
                    className="
                      card
                      border border-gray-300
                      hover:shadow-md
                      hover:border-green-500
                      transition
                      w-full
                      max-w-sm
                      flex
                      flex-col
                    "
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
                        onClick={() => handleToggleDetails(jobId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                      >
                        {isExpanded ? "Hide Details" : "View More Details"}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-inner">
                        <p>
                          <strong>Job ID:</strong> {jobId}
                        </p>
                        <p>
                          <strong>Address ID:</strong>{" "}
                          {job.addressId || "N/A"}
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
          ) : (
            /* ====== LIST VIEW ====== */
            <div className="max-w-6xl mx-auto space-y-4">
              {jobs.map((job) => {
                const jobId = job.jobId;
                const isExpanded = expandedJobId === jobId;
                return (
                  <div
                    key={jobId}
                    className="
                      card
                      border border-gray-300
                      rounded-lg p-4
                      shadow
                      flex
                      flex-col
                      sm:flex-row
                      justify-between
                    "
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
                    <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end justify-between">
                      <button
                        onClick={() => handleToggleDetails(jobId)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        {isExpanded ? "Hide Details" : "View More Details"}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-inner">
                          <p>
                            <strong>Job ID:</strong> {jobId}
                          </p>
                          <p>
                            <strong>Address ID:</strong>{" "}
                            {job.addressId || "N/A"}
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
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
