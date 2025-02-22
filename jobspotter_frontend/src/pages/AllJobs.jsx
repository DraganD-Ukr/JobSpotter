import { useEffect, useState } from "react";

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

export function AllJobs() {
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // For searching by tag (defaulting to "Delivery Services" as an example)
  const [searchTag, setSearchTag] = useState("Delivery Services");

  useEffect(() => {
    // Immediately fetch jobs by this default tag on mount.
    fetchJobsByTag(searchTag);
  }, []);

  // Fetch jobs from /api/v1/job-posts/by-tag?tag=...
  function fetchJobsByTag(tagValue) {
    const trimmedTag = tagValue.trim();
    if (!trimmedTag) {
      alert("Please enter a tag to search.");
      return;
    }

    setLoading(true);
    fetch(`/api/v1/job-posts/by-tag?tag=${encodeURIComponent(trimmedTag)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs by tag");
        return res.json();
      })
      .then((jobs) => {
        const finalJobs = processJobs(jobs);
        setJobPostsData(finalJobs);
      })
      .catch((err) => {
        console.error("Error fetching jobs by tag:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  // Process jobs to use friendly tag names and consistent IDs
  function processJobs(jobs) {
    return jobs.map((job) => {
      let friendlyTags = [];
      if (Array.isArray(job.tags)) {
        friendlyTags = job.tags.map((tagObj) => {
          const enumVal = tagObj.tagName || tagObj.name || tagObj.value;
          return reversedTagMapping.get(enumVal) || enumVal;
        });
      }
      const jobPostId = job.jobPostId || job.jobId || job.id;
      return { ...job, jobPostId, tags: friendlyTags };
    });
  }

  // Handle applying for a job
  function handleApply(jobPostId) {
    const requestBody = { jobId: jobPostId };
    console.log("Request body:", requestBody);

    fetch(`/api/v1/job-posts/${jobPostId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("Failed to apply for job");
      })
      .then(() => {
        alert("Successfully applied for the job!");
      })
      .catch((err) => {
        console.error("Error applying for job:", err);
        setErrorMessage(err.message);
      });
  }

  // Simple rating function
  function handleRateJob(jobPostId, star) {
    console.log(`Rated job ${jobPostId} with ${star} stars`);
  }

  if (loading) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen p-6 text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Jobs by Tag</h2>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        {/* Tag search input */}
        <div className="mb-4 flex">
          <input
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder='Enter a tag (e.g., "Cleaning Services")'
            className="border p-2 rounded mr-2 flex-grow text-black bg-gray-200"
          />
          <button
            onClick={() => fetchJobsByTag(searchTag)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Search by Tag
          </button>
        </div>

        {/* GRID layout for job cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 place-items-center">
          {jobPostsData.map((job) => (
            <div
              key={job.jobPostId}
              // White card with a light border, forced black text, minimal pastel style
              className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-md w-full max-w-sm flex flex-col text-black"
            >
              {/* Card Content */}
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm mt-1">{job.description}</p>
                <p className="text-sm mt-2">
                  <strong>Tags:</strong> {job.tags.join(", ")}
                </p>

                {/* Rating System */}
                <div className="mt-3 flex items-center">
                  <span className="mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateJob(job.jobPostId, star)}
                      className="text-yellow-500 text-xl cursor-pointer mr-1"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* "Apply Now" Button */}
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
      </div>
    </div>
  );
}
