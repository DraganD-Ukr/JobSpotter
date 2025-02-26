import { useEffect, useState } from "react";

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
  ["ERRANDS/SHOPPING", "ERRANDS/SHOPPING"],
  ["VOLUNTEER_WORK", "Volunteer Work"],
  ["COMMUNITY_EVENTS", "Community Events"],
  ["FUNDRAISING", "Fundraising"],
  ["ANIMAL_WELFARE", "Animal Welfare"],
  ["Mentoring (Community)", "MENTORING"],
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
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [viewType, setViewType] = useState("card");

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
        if (!res.ok) throw new Error("Failed to fetch my jobs");
        return res.json();
      })
      .then((jobs) => {
        const jobsWithFriendlyTags = jobs.map((job, index) => {
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

  // Expand/collapse job details
  function handleToggleDetails(jobId) {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  }

  // Switch between "card" and "list" view
  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // Handle "Apply Now" 
  function handleApply(jobId) {
    alert(`Applying for job: ${jobId}`);
  }

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Jobs</h1>

      {errorMessage && (
        <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
      )}

      {myJobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
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
            /* ========== CARD VIEW ========== */
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {myJobs.map((job) => {
                const {
                  jobId,
                  title,
                  description,
                  addressId,
                  maxApplicants,
                  tags,
                  status,
                } = job;
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
                    {/* Title/Description */}
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-2">{description}</p>
                    {tags && tags.length > 0 && (
                      <p className="mt-2 text-sm">
                        <strong>Tags:</strong> {tags.join(", ")}
                      </p>
                    )}

                    {/* Toggle details button */}
                    <div className="mt-4">
                      <button
                        onClick={() => handleToggleDetails(jobId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                      >
                        {isExpanded ? "Hide Details" : "View More Details"}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-inner">
                        <p>
                          <strong>Job ID:</strong> {jobId}
                        </p>
                        <p>
                          <strong>Address ID:</strong> {addressId || "N/A"}
                        </p>
                        <p>
                          <strong>Max Applicants:</strong> {maxApplicants || "N/A"}
                        </p>
                        {status && (
                          <p>
                            <strong>Status:</strong> {status}
                          </p>
                        )}
                        {/* "Apply Now" or other actions if */}
                        <button
                          onClick={() => handleApply(jobId)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-3"
                        >
                          Apply Now
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /*List View*/
            <div className="max-w-6xl mx-auto space-y-4">
              {myJobs.map((job) => {
                const {
                  jobId,
                  title,
                  description,
                  addressId,
                  maxApplicants,
                  tags,
                  status,
                } = job;
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
                      <h3 className="text-xl font-semibold">{title}</h3>
                      <p className="mt-2">{description}</p>
                      {tags && tags.length > 0 && (
                        <p className="mt-2 text-sm">
                          <strong>Tags:</strong> {tags.join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end justify-between">
                      <button
                        onClick={() => handleToggleDetails(jobId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        {isExpanded ? "Hide Details" : "View More Details"}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-inner">
                          <p>
                            <strong>Job ID:</strong> {jobId}
                          </p>
                          <p>
                            <strong>Address ID:</strong> {addressId || "N/A"}
                          </p>
                          <p>
                            <strong>Max Applicants:</strong> {maxApplicants || "N/A"}
                          </p>
                          {status && (
                            <p>
                              <strong>Status:</strong> {status}
                            </p>
                          )}
                          {/*"Apply Now"*/}
                          <button
                            onClick={() => handleApply(jobId)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-3"
                          >
                            Apply Now
                          </button>
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
