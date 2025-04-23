import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [jobData, setJobData] = useState({
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

  // Dynamic tag mapping fetched from API (friendly name -> enum)
  const [tagMapping, setTagMapping] = useState(new Map());
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/v1/job-posts/tags", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(
            `${t("failedToLoadJobTags", {
              defaultValue: "Failed to load job tags.",
            })}: ${res.status} ${res.statusText}`
          );
        }
        const tagsData = await res.json();
        const newTagMap = new Map();
        Object.keys(tagsData).forEach((enumVal) => {
          const friendlyName = tagsData[enumVal];
          newTagMap.set(friendlyName, enumVal);
        });
        setTagMapping(newTagMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, [t]);

  // Convert dynamic Map to an array of friendly tag strings
  const allTags = useMemo(() => Array.from(tagMapping.keys()), [tagMapping]);

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
        if (!res.ok) {
          throw new Error(
            t("failedToFetchUser", { defaultValue: "Failed to fetch user info" })
          );
        }
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
        if (!res.ok) {
          throw new Error(
            t("failedToFetchAddresses", {
              defaultValue: "Failed to fetch addresses",
            })
          );
        }
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
    const alreadySelected = jobData.tags.some(
      (tagObj) => tagObj.name === tagName
    );
    if (alreadySelected) return;

    if (jobData.tags.length >= 5) {
      alert(
        t("maxTagsAlert", {
          defaultValue: "You can select up to 5 tags only.",
        })
      );
      return;
    }

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
      alert(t("noTagAlert", { defaultValue: "Please add at least one tag." }));
      return;
    }
    // Convert the selected tags to enum values
    const tagsAsEnums = jobData.tags.map((tagObj) =>
      tagMapping.get(tagObj.name)
    );
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
        alert(
          t("jobPostCreated", {
            defaultValue: "Job post created successfully!",
          })
        );
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
        <p>{t("loadingUser", { defaultValue: "Loading user..." })}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="main-content flex items-center justify-center min-h-screen">
        <p>
          {t("errorLoadingUser", {
            defaultValue: "Error loading user. Please try again later.",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 border-1 rounded-4xl main-content min-h-screen p-6 bg-white text-black">
      <div className="max-w-2xl mx-auto border border-gray-300 rounded-md shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          {t("createJobPost", { defaultValue: "Create Job Post" })}
        </h1>
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
            placeholder={t("jobTitle", { defaultValue: "Job Title" })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Description */}
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder={t("jobDescription", { defaultValue: "Job Description" })}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Tag Selection */}
          <div>
            <label className="block mb-2 font-semibold">
              {t("availableTags", { defaultValue: "Available Tags" })}
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tagName) => (
                <button
                  key={tagName}
                  type="button"
                  onClick={() => handleSelectTag(tagName)}
                  className="px-2 py-1 rounded-md border border-gray-300 bg-gray-100 text-black hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {tagName}
                </button>
              ))}
            </div>
          </div>

          {/* Display Selected Tags */}
          <div className="mt-4">
            <label className="block mb-2 font-semibold">
              {t("selectedTags", { defaultValue: "Selected Tags" })}
            </label>
            <div className="flex flex-wrap">
              {jobData.tags.map((tagObj, index) => (
                <div
                  key={index}
                  className={`flex items-center px-2 py-1 mr-2 mb-2 rounded text-black ${tagObj.color}`}
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
            <label className="block mb-1 font-semibold">
              {t("selectAddress", { defaultValue: "Select Address" })}
            </label>
            <select
              value={jobData.addressId}
              onChange={(e) =>
                setJobData((prev) => ({
                  ...prev,
                  addressId: parseInt(e.target.value, 10),
                }))
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">
                {t("selectAnAddress", { defaultValue: "Select an address" })}
              </option>
              {addresses.map((addr) => (
                <option key={addr.addressId} value={addr.addressId}>
                  {addr.streetAddress}, {addr.city}, {addr.county},{" "}
                  {addr.eirCode}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {saving
              ? t("creating", { defaultValue: "Creating..." })
              : t("createJobPost", { defaultValue: "Create Job Post" })}
          </button>
        </form>
      </div>
    </div>
  );
}
