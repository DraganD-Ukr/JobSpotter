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
]);

export function CreateJobPost() {
  const [jobData, setJobData] = useState({
    tags: [],
    title: "",
    description: "",
    addressId: 6,
    maxApplicants: 15,
  });
  const [newTag, setNewTag] = useState("");
  const [addresses, setAddresses] = useState([]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      .then((data) => {
        setUser(data);
      })
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
      .then((data) => {
        setAddresses(data);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        setErrorMessage(err.message);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTag() {
    const trimmedTag = newTag.trim();
    if (trimmedTag !== "" && tagMapping.has(trimmedTag)) {
      if (!jobData.tags.includes(trimmedTag)) {
        setJobData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
      }
      setNewTag("");
    }
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
      })
      .then(() => {
        alert("Job post created successfully!");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Error loading user. Please try again later.</p>
      </div>
    );
  }

  const allTags = Array.from(tagMapping.keys());

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow mt-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border p-2 w-full rounded-lg"
        />

        {/* Description */}
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="border p-2 w-full rounded-lg"
        />

        {/* Tags */}
        <div>
          <label className="block mb-1">Tags</label>
          <div className="flex items-center">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter or select a tag"
              className="border p-2 rounded-lg"
              list="all-tags" 
            />
            {/* The datalist shows all possible tags */}
            <datalist id="all-tags">
              {allTags.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>

            <button
              type="button"
              onClick={handleAddTag}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg"
            >
              +
            </button>
          </div>

          {/* Display selected tags */}
          <div className="mt-2 flex flex-wrap">
            {jobData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-2 py-1 mr-2 mb-2 rounded-lg"
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
            className="border p-2 w-full rounded-lg"
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
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          {saving ? "Creating..." : "Create Job Post"}
        </button>
      </form>
    </div>
  );
}
