import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";
import MyProfilePicture from "../components/MyProfilePicture";
import { FaCheckCircle } from "react-icons/fa";

const LoadingSkeleton = () => (
  <div className="flex min-h-screen items-center justify-center">
    <p>Loading...</p>
  </div>
);

// Only the 5 textual fields for editing
const getDefaultFormData = (data) => ({
  firstName: data.firstName || "",
  lastName: data.lastName || "",
  email: data.email || "",
  phoneNumber: data.phoneNumber || "",
  about: data.about || "",
});

export default function Profile() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Banner color state
  const [bannerColor, setBannerColor] = useState("#4f46e5");

  // Progress bar states
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(true);

  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Fetch user info & addresses on mount
  useEffect(() => {
    fetchUserData();
    fetchUserAddresses();
  }, []);

  // Recalculate completeness whenever user or addresses change
  useEffect(() => {
    setProfileCompleteness(calculateCompleteness());
  }, [user, addresses]);

  // Check if textual form data is edited
  useEffect(() => {
    if (!originalData) return;
    setIsEdited(checkEdited(formData));
  }, [formData]);

  // 1) Fetch user info
  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setUser(data);
      setOriginalData(data);
      setFormData(getDefaultFormData(data));
    } catch (err) {
      console.error("Error fetching user info:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2) Fetch addresses (read-only for completeness)
  const fetchUserAddresses = async () => {
    try {
      const res = await fetch("/api/v1/users/addresses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch addresses. Status: ${res.status}`);
      }
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  // 3) Calculate completeness:
  function calculateCompleteness() {
    if (!user) return 0;
    const total = 6; // (firstName, lastName, email, phoneNumber, about, addresses)
    let filled = 0;

    if (user.firstName?.trim()) filled++;
    if (user.lastName?.trim()) filled++;
    if (user.email?.trim()) filled++;
    if (user.phoneNumber?.trim()) filled++;
    if (user.about?.trim()) filled++;

    // Check if user has at least 1 address
    if (addresses.length > 0) {
      filled++;
    }

    return Math.round((filled / total) * 100);
  }

  // Missing items for textual fields + addresses
  function getMissingItems() {
    if (!user) return [];
    const missing = [];
    if (!user.firstName?.trim()) missing.push("First Name");
    if (!user.lastName?.trim()) missing.push("Last Name");
    if (!user.email?.trim()) missing.push("Email");
    if (!user.phoneNumber?.trim()) missing.push("Phone Number");
    if (!user.about?.trim()) missing.push("About");
    if (addresses.length === 0) missing.push("Address");
    return missing;
  }
  const missingItems = getMissingItems();

  // Compare current form data with originalData 
  function checkEdited(newData) {
    return (
      newData.firstName !== (originalData.firstName || "") ||
      newData.lastName !== (originalData.lastName || "") ||
      newData.email !== (originalData.email || "") ||
      newData.phoneNumber !== (originalData.phoneNumber || "") ||
      newData.about !== (originalData.about || "")
    );
  }

  // Handle input changes for the 5 textual fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    if (!originalData) return;
    setFormData(getDefaultFormData(originalData));
    setIsEdited(false);
  };

  const handleCancel = () => {
    resetForm();
    setEditing(false);
  };

  // Save changes for the 5 textual fields
  const handleSave = async () => {
    if (!originalData) return;

    const changedData = {};
    ["firstName", "lastName", "email", "phoneNumber", "about"].forEach((field) => {
      if (formData[field] !== originalData[field]) {
        changedData[field] = formData[field];
      }
    });

    if (Object.keys(changedData).length === 0) {
      setEditing(false);
      return;
    }

    setSaving(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedData),
      });
      if (res.status === 204) {
        setSaving(false);
        setEditing(false);
      } else {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to save changes");
        setUser(data);
        setOriginalData(data);
        setFormData(getDefaultFormData(data));
      }
    } catch (err) {
      console.error("Error saving user profile:", err);
      setErrorMessage(err.message || "An error occurred while saving the profile.");
    } finally {
      setSaving(false);
      fetchUserData();
    }
  };

  // If complete show "Proceed" button
  const handleDismissProgressBar = () => {
    setShowProgressBar(false);
    navigate("/searchjobpost");
  };

  if (loading || saving) {
    return <LoadingSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error loading user profile. Please try again later.</p>
      </div>
    );
  }

  const renderField = (label, name, type = "text") => (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      {editing ? (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300"
        />
      ) : (
        <p className="mt-1">
          {formData[name] || (name === "phoneNumber" ? "Not provided" : "")}
        </p>
      )}
    </div>
  );

  // For dark mode, use container classes normally
  const containerClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-black";

  return (
    <div className={`my-10 border-1 rounded-4xl main-content min-h-screen p-4 ${containerClasses}`}>
      <div className="flex">
        <Sidebar />
        <div className="w-4/5 p-4 ml-4 mr-30">
          {/* Banner */}
          <div
            className={`relative w-full h-48 md:h-52 lg:h-56 flex items-center ${editing ? "border border-white border-dashed" : ""}`}
            style={{
              background: bannerColor,
            }}
          >
            {editing && (
              <div className="absolute top-4 right-4 flex items-center space-x-2 text-white">
                <label htmlFor="bannerColor" className="text-sm">
                  Banner Color:
                </label>
                <input
                  id="bannerColor"
                  type="color"
                  value={bannerColor}
                  onChange={(e) => setBannerColor(e.target.value)}
                  className="w-8 h-8 p-0 border-none cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Profile Picture + Basic Info */}
          <div className="relative px-4 -mt-28 flex items-end">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                  <MyProfilePicture userId={user.userId} darkMode={darkMode} />
                </div>
              </div>
            </div>
            <div className="ml-4 mb-2">
              <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                {formData.firstName} {formData.lastName}
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                {formData.email}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col items-start mb-8 mt-6">
            <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
            {showProgressBar && (
              <div className="mt-2 w-full space-y-1">
                <div className="flex items-center gap-2">
                  {/* Progress bar */}
                  <div className="relative flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${profileCompleteness}%` }}
                    ></div>
                  </div>
                  {/* Proceed button if 100% */}
                  {profileCompleteness === 100 && (
                    <button
                      onClick={handleDismissProgressBar}
                      className="px-3 py-1 bg-green-500 text-white rounded flex items-center text-xs hover:bg-green-600 shadow-md"
                    >
                      <FaCheckCircle className="mr-1" />
                      Proceed
                    </button>
                  )}
                </div>
                <p className="text-sm">Profile completion: {profileCompleteness}%</p>
                {profileCompleteness < 100 && missingItems.length > 0 && (
                  <p className="text-xs text-red-500">Missing: {missingItems.join(", ")}</p>
                )}
              </div>
            )}
          </div>

          {/* My Information Section */}
          <div
            className={`border border-gray-300 hover:shadow-md hover:border-green-500 transition rounded-lg p-6 ${
              darkMode ? "bg-transparent" : "bg-white"
            }`}
          >
            <h2 className="font-semibold text-lg mb-4">My Information</h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <div className="grid grid-cols-2 gap-6">
              {renderField("First Name", "firstName")}
              {renderField("Last Name", "lastName")}
              {renderField("Email", "email", "email")}
              {renderField("Phone Number", "phoneNumber")}
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">About</label>
                {editing ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300"
                  />
                ) : (
                  <p className="mt-1">
                    {formData.about || "No description available"}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={!isEdited}
                    className={`px-6 py-2 rounded text-white ${
                      isEdited ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
