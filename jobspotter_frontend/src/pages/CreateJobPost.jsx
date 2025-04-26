import { useEffect, useState, useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../components/ThemeContext";

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
  const { darkMode } = useContext(ThemeContext);

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
      <div
        className={`main-content min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-50"} font-sans`}
      >
        <section
          className="fade-in max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto p-4 xs:p-6 sm:p-8 flex items-center justify-center"
        >
          <p className={`text-base xs:text-lg sm:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} font-semibold`}>
            {t("loadingUser", { defaultValue: "Loading user..." })}
          </p>
        </section>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className={`main-content min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-50"} font-sans`}
      >
        <section
          className="fade-in max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto p-4 xs:p-6 sm:p-8 flex items-center justify-center"
        >
          <p className={`text-base xs:text-lg sm:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} font-semibold`}>
            {t("errorLoadingUser", {
              defaultValue: "Error loading user. Please try again later.",
            })}
          </p>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`main-content min-h-screen p-4 xs:p-6 sm:p-8 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"} font-sans`}
    >
      <main
        className="@container max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-10 py-10 xs:py-12 sm:py-16"
      >
        <section className="fade-in max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div
            className={`enhanced-card feature-card ${
              darkMode
                ? "border-gray-700 bg-gray-800 hover:border-emerald-500"
                : "border-gray-200 bg-white hover:border-emerald-500"
            } p-4 xs:p-6 sm:p-8 rounded-lg transition-all duration-300`}
          >
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8">
              {t("createJobPost", { defaultValue: "Create Job Post" })}
            </h1>
            {errorMessage && (
              <div className={`${darkMode ? "text-rose-400" : "text-rose-500"} mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg font-medium`}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
              {/* Title */}
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder={t("jobTitle", { defaultValue: "Job Title" })}
                className={`w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-sm xs:text-base sm:text-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />

              {/* Description */}
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder={t("jobDescription", { defaultValue: "Job Description" })}
                rows={3}
                className={`w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-sm xs:text-base sm:text-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />

              {/* Tag Selection */}
              <div>
                <label className="block mb-1 xs:mb-1.5 sm:mb-2 text-sm xs:text-base sm:text-lg font-semibold">
                  {t("availableTags", { defaultValue: "Available Tags" })}
                </label>
                <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-3">
                  {allTags.map((tagName) => (
                    <button
                      key={tagName}
                      type="button"
                      onClick={() => handleSelectTag(tagName)}
                      className={`px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-md border text-xs xs:text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                          : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                      } transition focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                      {tagName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Selected Tags */}
              <div>
                <label className="block mb-1 xs:mb-1.5 sm:mb-2 text-sm xs:text-base sm:text-lg font-semibold">
                  {t("selectedTags", { defaultValue: "Selected Tags" })}
                </label>
                <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-3">
                  {jobData.tags.map((tagObj, index) => (
                    <div
                      key={index}
                      className={`flex items-center px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 sm:py-1.5 mr-1 xs:mr-2 mb-1 xs:mb-2 rounded text-black text-xs xs:text-sm sm:text-base ${tagObj.color}`}
                    >
                      <span>{tagObj.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-1 xs:ml-2 text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Dropdown */}
              <div>
                <label className="block mb-1 xs:mb-1.5 sm:mb-2 text-sm xs:text-base sm:text-lg font-semibold">
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
                  className={`w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-sm xs:text-base sm:text-lg ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">
                    {t("selectAnAddress", { defaultValue: "Select an address" })}
                  </option>
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
                className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-green-500 text-white rounded-full font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                {saving
                  ? t("creating", { defaultValue: "Creating..." })
                  : t("createJobPost", { defaultValue: "Create Job Post" })}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}