import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  ["ERRANDS/SHOPPING", "ERRANDS_SHOPPING"],
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
  const [viewType, setViewType] = useState("card"); // "card" or "list"
  const navigate = useNavigate();

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
      .then((data) => {
        // Handle both paginated and non-paginated responses
        const jobsArray = Array.isArray(data) ? data : data.content || [];
        const jobsWithFriendlyTags = jobsArray.map((job, index) => {
          const finalJobId = String(job.jobPostId || job.jobId || job.id || index);
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

  function toggleView() {
    setViewType((prev) => (prev === "card" ? "list" : "card"));
  }

  // Navigate to the slug page with jobId in the URL
  function handleViewDetails(jobId) {
    navigate(`/myJob/${jobId}`);
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
          <div className="max-w-6xl mx-auto mb-4">
            <button
              onClick={toggleView}
              className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
            >
              {viewType === "card" ? "Switch to List View" : "Switch to Card View"}
            </button>
          </div>

          {viewType === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {myJobs.map((job) => {
                const { jobId, title, description, tags } = job;
                return (
                  <div
                    key={jobId}
                    className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition w-full max-w-sm flex flex-col p-4 rounded-md bg-white"
                  >
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-2">{description}</p>
                    {tags && tags.length > 0 && (
                      <p className="mt-2 text-sm">
                        <strong>Tags:</strong> {tags.join(", ")}
                      </p>
                    )}
                    <div className="mt-4">
                      <button
                        onClick={() => handleViewDetails(jobId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                      >
                        View More Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto space-y-4">
              {myJobs.map((job) => {
                const { jobId, title, description, tags } = job;
                return (
                  <div
                    key={jobId}
                    className="card border border-gray-300 rounded-lg p-4 shadow flex flex-col sm:flex-row justify-between bg-white"
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
                        onClick={() => handleViewDetails(jobId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        View More Details
                      </button>
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
