import { useEffect, useState } from "react";

// Map your enum values to friendly strings
const tagMapping = new Map([
  ["GENERAL_HELP", "General Help"],
  ["HANDYMAN_SERVICES", "Handyman Services"],
  ["SKILLED_TRADES", "Skilled Trades"],
  ["CLEANING_SERVICES", "Cleaning Services"],
  ["DELIVERY_SERVICES", "Delivery Services"],
  ["CAREGIVING", "Caregiving"],
  ["PET_CARE", "Pet Care"],
  ["TUTORING_MENTORING", "Tutoring/Mentoring"],
  ["EVENT_STAFF", "Event Staff"],
  ["ADMINISTRATIVE_SUPPORT", "Administrative Support"],
  ["VIRTUAL_ASSISTANCE", "Virtual Assistance"],
  ["FOOD_SERVICES", "Food Services"],
  ["GARDENING_LANDSCAPING", "Gardening/Landscaping"],
  ["COMMUNITY_OUTREACH", "Community Outreach"],
  ["IT_SUPPORT", "IT Support"],
  ["CREATIVE_SERVICES", "Creative Services"],
  ["PERSONAL_SERVICES", "Personal Services"],
  ["TUTORING_LANGUAGES", "Tutoring Languages"],
  ["MUSIC_INSTRUCTION", "Music Instruction"],
  ["HOME_MAINTENANCE", "Home Maintenance"],
  ["TRANSPORTATION_ASSISTANCE", "Transportation Assistance"],
  ["ERRANDS/SHOPPING", "Errands/Shopping"],
  ["VOLUNTEER_WORK", "Volunteer Work"],
  ["COMMUNITY_EVENTS", "Community Events"],
  ["FUNDRAISING", "Fundraising"],
  ["ANIMAL_WELFARE", "Animal Welfare"],
  ["Mentoring (Community)", "Mentoring (Community)"],
  ["HEALTH_SUPPORT", "Health Support"],
  ["COUNSELING_SUPPORT", "Counseling Support"],
  ["DISASTER_RELIEF", "Disaster Relief"],
  ["ENVIRONMENTAL_CONSERVATION", "Environmental Conservation"],
  ["OTHER", "Other"],
]);

export function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // Only one job can be expanded at a time
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  function fetchMyJobs() {
    setLoading(true);
    fetch("/api/v1/job-posts/my-job-posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch my jobs");
        }
        return res.json();
      })
      .then((jobs) => {
        const jobsWithFriendlyTags = jobs.map((job, index) => {
          // Ensure each job has a unique string ID
          const finalJobId = String(job.jobPostId || job.jobId || job.id || index);

          // Convert enum tags to friendly labels
          let friendlyTags = [];
          if (Array.isArray(job.tags)) {
            friendlyTags = job.tags.map((tagObj) => {
              const enumVal =
                typeof tagObj === "string"
                  ? tagObj
                  : tagObj.tagName || tagObj.name || tagObj.value;
              return tagMapping.get(enumVal) || enumVal;
            });
          }

          return { ...job, jobId: finalJobId, tags: friendlyTags };
        });
        setMyJobs(jobsWithFriendlyTags);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  // Toggle which job is expanded
  function handleToggleDetails(jobId) {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  }

  // --- Example job actions below ---
  function handleStartJob(jobId) {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/start`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to start job");
        }
        return res.json();
      })
      .then(() => {
        alert("Job started successfully!");
        fetchMyJobs();
      })
      .catch((err) => {
        console.error("Error starting job:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  function handleFinishJob(jobId) {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/finish`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to finish job");
        }
      })
      .then(() => {
        alert("Job finished successfully!");
        fetchMyJobs();
      })
      .catch((err) => {
        console.error("Error finishing job:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  function handleCancelJob(jobId) {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/cancel`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to cancel job");
        }
      })
      .then(() => {
        alert("Job canceled successfully!");
        fetchMyJobs();
      })
      .catch((err) => {
        console.error("Error canceling job:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">My Jobs</h1>

      {errorMessage && (
        <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
      )}

      {myJobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
      ) : (
        // Similar grid styling to your Job Post History
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto place-items-center">
          {myJobs.map((job) => {
            const { jobId, title, description, addressId, maxApplicants, tags, status } = job;
            const isExpanded = expandedJobId === jobId;

            return (
              <div
                key={jobId}
                // White card, light border, forced black text
                className="bg-white border border-gray-300 rounded-xl p-4 shadow flex flex-col justify-between w-full max-w-sm text-black"
              >
                {/* Card Header */}
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{description}</p>
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
                      <strong>Address ID:</strong> {addressId || "N/A"}
                    </p>
                    <p>
                      <strong>Max Applicants:</strong> {maxApplicants || "N/A"}
                    </p>
                    {tags && tags.length > 0 && (
                      <p>
                        <strong>Tags:</strong> {tags.join(", ")}
                      </p>
                    )}
                    {status && (
                      <p>
                        <strong>Status:</strong> {status}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2 justify-end">
                      <button
                        onClick={() => handleStartJob(jobId)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => handleFinishJob(jobId)}
                        className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                      >
                        Finish
                      </button>
                      <button
                        onClick={() => handleCancelJob(jobId)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
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
