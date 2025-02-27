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

export function ViewMoreDetails() {
  const { jobId } = useParams(); 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Helper to parse responses with no content (204)
  function parseNoContent(res) {
    if (!res.ok) throw new Error("Request failed");
    if (res.status === 204 || !res.headers.get("content-length")) {
      return null;
    }
    return res.json();
  }

  useEffect(() => {
    if (!jobId) {
      setErrorMessage("No job ID provided in the URL.");
      setLoading(false);
      return;
    }

    // Fetch job details from your API endpoint, e.g. /api/v1/job-posts/{jobId}
    fetch(`/api/v1/job-posts/${jobId}`, {
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

  // Action functions (Start, Finish, Cancel) can be added here if needed

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
    <div className="main-content min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Extended Job Details</h1>
      <p><strong>Job ID:</strong> {job.jobPostId}</p>
      <p><strong>Title:</strong> {job.title}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Status:</strong> {job.status}</p>
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

      {/* Action Buttons: Start, Finish, Cancel (if needed) */}
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
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
