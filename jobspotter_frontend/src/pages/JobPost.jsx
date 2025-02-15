import { useEffect, useState } from "react";
import thanosImage from "../assets/thanos.jpg";

// Returns an object with default values based on the user data.
const getDefaultFormData = (data) => ({
  firstName: data.firstName || "",
  lastName: data.lastName || "",
  email: data.email || "",
  phoneNumber: data.phoneNumber || "",
  about: data.about || "",
  profileImage: data.profileImage || "",
});

// Forward mapping (friendly -> enum)
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
  ["Other", "OTHER"],
]);

// Reverse mapping (enum -> friendly)
const reversedTagMapping = new Map();
for (const [friendly, enumVal] of tagMapping) {
  reversedTagMapping.set(enumVal, friendly);
}

export function JobPost() {
  // Job post form state
  const [jobData, setJobData] = useState({
    tags: [],
    title: "",
    description: "",
    addressId: 6,
    maxApplicants: 15,
  });
  const [newTag, setNewTag] = useState("");
  const [jobPostsData, setJobPostsData] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // Toggles for form and job list
  const [showForm, setShowForm] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);

  // User and loading/error states (like Profile)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // On mount, fetch user data and addresses
  useEffect(() => {
    fetchUserData();
    fetchUserAddresses();
  }, []);

  // Fetch signed-in user from API
  const fetchUserData = () => {
    setLoading(true);
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  // Fetch addresses from API
  const fetchUserAddresses = () => {
    fetch("/api/v1/users/addresses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch addresses");
        return res.json();
      })
      .then((data) => {
        setAddresses(data);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        setErrorMessage(err.message);
      });
  };

  // Fetch all job posts
  const fetchAllJobs = () => {
    setLoading(true);
    fetch("/api/v1/job-posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch all jobs");
        return res.json();
      })
      .then((jobs) => {
        const jobsWithFriendlyTags = jobs.map((job) => {
          const friendlyTags = job.tags.map(
            (tagEnum) => reversedTagMapping.get(tagEnum) || tagEnum
          );
          return { ...job, tags: friendlyTags };
        });

        // ADDED: Make sure we have jobId set (if the backend is using "id" instead).
        const finalJobs = jobsWithFriendlyTags.map((job) => {
          if (!job.jobId && job.id) {
            return { ...job, jobId: job.id };
          }
          return job;
        });

        setJobPostsData(finalJobs);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  // Fetch only my job posts
  const fetchMyJobs = () => {
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
        const jobsWithFriendlyTags = jobs.map((job) => {
          const friendlyTags = job.tags.map(
            (tagEnum) => reversedTagMapping.get(tagEnum) || tagEnum
          );
          return { ...job, tags: friendlyTags };
        });

        // ADDED: Again, ensure jobId is set if the server uses "id"
        const finalJobs = jobsWithFriendlyTags.map((job) => {
          if (!job.jobId && job.id) {
            return { ...job, jobId: job.id };
          }
          return job;
        });

        setJobPostsData(finalJobs);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  // Form handlers for job post creation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag !== "" && tagMapping.has(trimmedTag)) {
      setJobData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (index) => {
    setJobData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== index),
    }));
  };

  // Create a new job post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobData.tags.length === 0) return;
    const tagsAsEnums = jobData.tags.map((label) => tagMapping.get(label));
    const payload = { ...jobData, tags: tagsAsEnums };

    setSaving(true);
    fetch("/api/v1/job-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((newJob) => {
        setJobPostsData((prev) => [...prev, newJob]);
        setShowForm(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      })
      .finally(() => setSaving(false));
  };

  // Function to handle job application
  const handleApply = (jobId) => {
    const requestBody = { jobId };
    console.log("Request body:", requestBody);

    fetch(`/api/v1/job-posts/${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("Failed to apply for job");
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        alert("Successfully applied for the job!");
      })
      .catch((err) => {
        console.error("Error applying for job:", err);
        setErrorMessage(err.message);
      });
  };

  // ADDED: Define the handleRateJob function so the rating buttons don’t break
  const handleRateJob = (jobId, star) => {
    console.log(`Rated job ${jobId} with ${star} stars`);
    // You can add your own rating logic here.
  };

  // Toggle "View All Jobs"
  const toggleAllJobs = () => {
    if (!showAllJobs) {
      fetchAllJobs();
    }
    setShowAllJobs((prev) => !prev);
  };

  if (loading || saving) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Error loading user info. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR: same styling as Profile page */}
      <aside className="w-1/4 bg-white shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={user.profileImage || thanosImage}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500">{user.role || "USER"}</p>
          </div>
        </div>
        <nav className="space-y-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="block w-full text-left bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? "Hide Job Form" : "Create Job Post"}
          </button>
          <button
            onClick={fetchMyJobs}
            className="block w-full text-left bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
          >
            View My Jobs
          </button>
          <button
            onClick={toggleAllJobs}
            className="block w-full text-left bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
          >
            {showAllJobs ? "Hide All Jobs" : "View All Jobs"}
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT: Same as Profile page */}
      <main className="w-3/4 p-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Job Post Page</h1>
          <p className="text-gray-700 mb-6">
            Use the sidebar on the left to create a new job post, view your own
            job listings, or see all available jobs.
          </p>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}

          {/* Job Post Form */}
          {showForm && (
            <div className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="border p-2 w-full"
                />
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Job Description"
                  className="border p-2 w-full"
                />
                {/* Tags */}
                <div>
                  <label className="block mb-1">Tags</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter a valid tag"
                      className="border p-2"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {jobData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-200 px-2 py-1 mr-2 mb-2 rounded"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="ml-2 text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Address Dropdown */}
                <div>
                  <label className="block mb-1">Select Address</label>
                  <select
                    value={jobData.addressId}
                    onChange={(e) =>
                      setJobData((prev) => ({
                        ...prev,
                        addressId: parseInt(e.target.value, 10),
                      }))
                    }
                    className="border p-2 w-full"
                  >
                    <option value="">Select an address</option>
                    {addresses.map((addr) => (
                      <option key={addr.addressId} value={addr.addressId}>
                        {addr.streetAddress}, {addr.city}, {addr.county},{" "}
                        {addr.eirCode}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Create Job Post
                </button>
              </form>
            </div>
          )}

          {/* Toggle "View All Jobs" Button */}
          <button
            onClick={toggleAllJobs}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {showAllJobs ? "Hide All Jobs" : "View All Jobs"}
          </button>

          {/* All Jobs Listing */}
          {showAllJobs && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">All Jobs</h2>
              {jobPostsData.map((job) => (
                <div
                  key={job.jobId || job.title}
                  className="border rounded p-4 mb-4 flex justify-between items-center"
                  data-jobpostid={job.jobPostId} // ✅ Storing jobId in data attribute
                >
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm">{job.description}</p>
                    <p className="text-sm text-gray-600">
                      Tags:{" "}
                      {job.tags.map((tag, index) => (
                        <span key={`${job.jobPostId}-tag-${index}`} className="mr-1">
                          {typeof tag === "string" ? tag : tag.name}
                          {index < job.tags.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>

                    {/* Rating System */}
                    <div className="mt-2 flex items-center">
                      <span className="mr-2 text-gray-600">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={`${job.jobId}-star-${star}`}
                          onClick={() => handleRateJob(job.jobId, star)}
                          className="text-yellow-500 text-xl cursor-pointer"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <button
                    onClick={() => handleApply(job.jobPostId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
