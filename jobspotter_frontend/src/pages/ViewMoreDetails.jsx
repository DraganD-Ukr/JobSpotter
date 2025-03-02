import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  ["Mentoring (Community)", "Mentoring (Community)"],
  ["HEALTH_SUPPORT", "Health Support"],
  ["COUNSELING_SUPPORT", "Counseling Support"],
  ["DISASTER_RELIEF", "Disaster Relief"],
  ["ENVIRONMENTAL_CONSERVATION", "Environmental Conservation"],
  ["OTHER", "Other"],
]);

export function ViewMoreDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  // Helper to parse responses that might have no content (204)
  function parseNoContent(res) {
    if (!res.ok) throw new Error("Request failed");
    if (res.status === 204 || !res.headers.get("content-length")) {
      return null;
    }
    return res.json();
  }

  // Fetch job details from /api/v1/job-posts/{jobId}/job-post-details
  useEffect(() => {
    if (!jobId) {
      setErrorMessage("No job ID provided in the URL.");
      setLoading(false);
      return;
    }

    fetch(`/api/v1/job-posts/${jobId}/job-post-details`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => {
        // Convert tags to friendly names if present
        if (Array.isArray(data.tags)) {
          data.tags = data.tags.map((tagObj) => {
            const enumVal =
              typeof tagObj === "string"
                ? tagObj
                : tagObj.name || tagObj.value || tagObj.tagName;
            return tagMapping.get(enumVal) || enumVal;
          });
        }
        setJob(data);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  // Approve or reject an applicant
  function handleApplicantAction(applicantId, action) {
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/applicants/approve-reject`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ applicantId, action }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to perform applicant action");
        return res.json();
      })
      .then(() => {
        setActionMessage(
          `Applicant action '${action}' for applicant ${applicantId} was successful.`
        );
        // Optionally refresh or update the local job/applicants data here
      })
      .catch((err) => {
        console.error("Error performing applicant action:", err);
        setActionMessage(`Error: ${err.message}`);
      });
  }

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="main-content min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="main-content min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p>No job data found for ID: {jobId}</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-6 flex gap-6">
      {/* LEFT: Job Details */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Extended Job Details</h1>
        <p>
          <strong>Job ID:</strong> {job.jobPostId}
        </p>
        <p>
          <strong>Title:</strong> {job.title}
        </p>
        <p>
          <strong>Description:</strong> {job.description}
        </p>
        <p>
          <strong>Status:</strong> {job.status}
        </p>
        {job.tags && job.tags.length > 0 && (
          <p>
            <strong>Tags:</strong> {job.tags.join(", ")}
          </p>
        )}
        {job.address && (
          <p>
            <strong>Address:</strong> {job.address}
          </p>
        )}
        {job.datePosted && (
          <p>
            <strong>Date Posted:</strong> {job.datePosted}
          </p>
        )}

        {/* Additional Action Buttons (if needed) */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={() => console.log("Start action")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Start
          </button>
          <button
            onClick={() => console.log("Finish action")}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Finish
          </button>
          <button
            onClick={() => console.log("Cancel action")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* RIGHT: Applicants in a sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col">
        <h2 className="text-xl font-bold mb-4">Applicants for Job {job.jobPostId}</h2>

        {Array.isArray(job.applicants) && job.applicants.length > 0 ? (
          <div className="space-y-4">
            {job.applicants.map((applicant) => (
              <div key={applicant.applicantId} className="border-b pb-2">
                <p>
                  <strong>Name:</strong> {applicant.name || `ID ${applicant.applicantId}`}
                </p>
                {applicant.email && (
                  <p>
                    <strong>Email:</strong> {applicant.email}
                  </p>
                )}
                {applicant.status && (
                  <p>
                    <strong>Status:</strong> {applicant.status}
                  </p>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleApplicantAction(applicant.applicantId, "approve")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApplicantAction(applicant.applicantId, "reject")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">No applicants found.</p>
        )}

        {actionMessage && (
          <div className="mt-4 text-sm text-blue-500">{actionMessage}</div>
        )}
      </div>
    </div>
  );
}
