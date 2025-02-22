  import { useEffect, useState, useMemo } from "react";

  // The mapping from user-friendly tag labels to enum values
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

  // Array of Tailwind color classes for random tag backgrounds
  const colorPool = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-orange-200",
    "bg-indigo-200",
  ];

  function getRandomColorClass() {
    return colorPool[Math.floor(Math.random() * colorPool.length)];
  }

  export function CreateJobPost() {
    const [jobData, setJobData] = useState({
      // We store objects: { name: string, color: string } for each tag
      tags: [],
      title: "",
      description: "",
      addressId: 6,
      maxApplicants: 15,
    });

    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Convert our Map to an array of strings
    const allTags = useMemo(() => Array.from(tagMapping.keys()), []);

    useEffect(() => {
      fetchUserData();
      fetchUserAddresses();
    }, []);

    function fetchUserData() {
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
        .then((data) => setUser(data))
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setErrorMessage(err.message);
        })
        .finally(() => setLoading(false));
    }

    function fetchUserAddresses() {
      fetch("/api/v1/users/addresses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch addresses");
          return res.json();
        })
        .then((data) => setAddresses(data))
        .catch((err) => {
          console.error("Error fetching addresses:", err);
          setErrorMessage(err.message);
        });
    }

    function handleChange(e) {
      const { name, value } = e.target;
      setJobData((prev) => ({ ...prev, [name]: value }));
    }

    // When a user clicks on a tag from the all-tags list
    function handleSelectTag(tagName) {
      // Check if it's already selected
      const alreadySelected = jobData.tags.some((tagObj) => tagObj.name === tagName);
      if (alreadySelected) return;

      // Otherwise, add it with a random color
      const newTagObj = {
        name: tagName,
        color: getRandomColorClass(),
      };
      setJobData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTagObj],
      }));
    }

    function handleRemoveTag(index) {
      setJobData((prev) => ({
        ...prev,
        tags: prev.tags.filter((_, idx) => idx !== index),
      }));
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (jobData.tags.length === 0) {
        alert("Please add at least one tag.");
        return;
      }
      // Convert the selected tags to enum values
      const tagsAsEnums = jobData.tags.map((tagObj) => tagMapping.get(tagObj.name));
      const payload = {
        ...jobData,
        tags: tagsAsEnums,
      };

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
        })
        .then(() => {
          alert("Job post created successfully!");
          // Reset form
          setJobData({
            tags: [],
            title: "",
            description: "",
            addressId: 6,
            maxApplicants: 15,
          });
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(err.message);
        })
        .finally(() => setSaving(false));
    }

    if (loading) {
      return (
        <div className="main-content flex items-center justify-center min-h-screen">
          <p>Loading user...</p>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="main-content flex items-center justify-center min-h-screen">
          <p>Error loading user. Please try again later.</p>
        </div>
      );
    }

    return (
      <div className="main-content min-h-screen p-6">
        <div className="card max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Job Title"
              // Force black text in both modes
              className="border p-2 w-full rounded text-black dark:text-black dark:bg-gray-300"
            />

            {/* Description */}
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Job Description"
              className="border p-2 w-full rounded text-black dark:text-black dark:bg-gray-300"
            />

            {/* Tag Selection */}
            <div>
              <label className="block mb-2 font-semibold">Available Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tagName) => (
                  <button
                    key={tagName}
                    type="button"
                    onClick={() => handleSelectTag(tagName)}
                    // Force black text
                    className="bg-gray-300 text-black dark:bg-gray-300 dark:text-black 
                              px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    {tagName}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Selected Tags with random color backgrounds */}
            <div className="mt-4">
              <label className="block mb-2 font-semibold">Selected Tags</label>
              <div className="flex flex-wrap">
                {jobData.tags.map((tagObj, index) => (
                  <div
                    key={index}
                    // Keep the background color from colorPool, but force text black
                    className={`flex items-center px-2 py-1 mr-2 mb-2 rounded text-black dark:text-black ${tagObj.color}`}
                  >
                    <span>{tagObj.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-2 text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Dropdown */}
            <div>
              <label className="block mb-1 font-semibold">Select Address</label>
              <select
                value={jobData.addressId}
                onChange={(e) =>
                  setJobData((prev) => ({
                    ...prev,
                    addressId: parseInt(e.target.value, 10),
                  }))
                } 
                className="border p-2 w-full rounded text-black dark:text-black dark:bg-gray-300"
              >
                <option value="">Select an address</option>
                {addresses.map((addr) => (
                  <option key={addr.addressId} value={addr.addressId}>
                    {addr.streetAddress}, {addr.city}, {addr.county}, {addr.eirCode}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {saving ? "Creating..." : "Create Job Post"}
            </button>
          </form>
        </div>
      </div>
    );
  }
