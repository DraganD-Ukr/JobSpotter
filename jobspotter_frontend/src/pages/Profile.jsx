import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";
import MyProfilePicture from "../components/MyProfilePicture";
import { FaCheckCircle } from "react-icons/fa";

const LoadingSkeleton = () => (
  <div className="flex min-h-screen items-center justify-center p-4 xs:p-6 sm:p-8">
    <p className="text-sm xs:text-base sm:text-lg">Loading...</p>
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

  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState("");
  const [profileImageVersion, setProfileImageVersion] = useState(Date.now());

  // Toggle the upload panel
  const toggleUploadPanel = () => {
    if (showUploadPanel) {
      setSelectedFile(null);
      setSelectedFilePreview("");
    }
    setShowUploadPanel(!showUploadPanel);
  };

  // Convert file to Base64 for local preview
  const handleFileChange = (file) => {
    if (!file) {
      setSelectedFile(null);
      setSelectedFilePreview("");
      return;
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFilePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Send multipart/form-data instead of JSON
  const handleConfirmUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select an image before uploading.");
        return;
      }
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      const res = await fetch("/api/v1/users/me/profile-image", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Failed to update profile image. Status: ${res.status}`);
      }

      alert("Profile image updated successfully.");
      setProfileImageVersion(Date.now());
      setSelectedFile(null);
      setSelectedFilePreview("");
      setShowUploadPanel(false);
      fetchUserData();
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Error updating profile image: " + error.message);
    }
  };

  // DELETE to remove the existing profile image
  const handleDeleteProfileImage = async () => {
    try {
      const res = await fetch("/api/v1/users/me/profile-image", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete profile image. Status: ${res.status}`);
      }

      alert("Profile image deleted successfully.");
      setProfileImageVersion(Date.now());
      setSelectedFile(null);
      setSelectedFilePreview("");
      fetchUserData();
    } catch (error) {
      console.error("Error deleting profile image:", error);
      alert("Error deleting profile image: " + error.message);
    }
  };

  // Handle drag & drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Fetch user info & addresses on mount
  useEffect(() => {
    fetchUserData();
    fetchUserAddresses();
  }, []);

  // Recompute completeness whenever user or addresses change
  useEffect(() => {
    setProfileCompleteness(calculateCompleteness());
  }, [user, addresses]);

  // Track if textual form data is edited
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

  // 2) Fetch addresses
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

  // 3) Calculate completeness
  function calculateCompleteness() {
    if (!user) return 0;
    const total = 6; 
    let filled = 0;
    if (user.firstName?.trim()) filled++;
    if (user.lastName?.trim()) filled++;
    if (user.email?.trim()) filled++;
    if (user.phoneNumber?.trim()) filled++;
    if (user.about?.trim()) filled++;
    if (addresses.length > 0) filled++;
    return Math.round((filled / total) * 100);
  }

  // Which fields are missing
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

  // Handle changes to the textual fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    if (!originalData) return;
    setFormData(getDefaultFormData(originalData));
    setIsEdited(false);
  };

  const handleCancel = () => {
    resetForm();
    setEditing(false);
  };

  // Save changes for textual fields
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

  // If complete, show "Proceed" button
  const handleDismissProgressBar = () => {
    setShowProgressBar(false);
    navigate("/searchjobpost");
  };

  if (loading || saving) {
    return <LoadingSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 xs:p-6 sm:p-8">
        <p className="text-sm xs:text-base sm:text-lg">
          Error loading user profile. Please try again later.
        </p>
      </div>
    );
  }

  const renderField = (label, name, type = "text") => (
    <div>
      <label className="text-xs xs:text-sm sm:text-base font-medium mb-1 block">
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 text-sm xs:text-base sm:text-lg"
        />
      ) : (
        <p className="mt-1 text-sm xs:text-base sm:text-lg">
          {formData[name] || (name === "phoneNumber" ? "Not provided" : "")}
        </p>
      )}
    </div>
  );

  // Handle dark mode styling
  const containerClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-black";

  return (
    <div className={`my-6 xs:my-8 sm:my-10 border-1 rounded-4xl main-content min-h-screen p-4 xs:p-6 sm:p-8 ${containerClasses}`}>
      <div className="flex flex-col xl:flex-row">
        <Sidebar />
        <div className="w-full xl:w-4/5 p-4 xs:p-6 sm:p-8 ml-0 xl:ml-4 mr-0 xl:mr-30">
          {/* Banner */}
          <div
            className={`relative w-full h-32 xs:h-36 sm:h-40 md:h-48 lg:h-52 xl:h-56 flex items-center ${
              editing ? "border border-white border-dashed" : ""
            }`}
            style={{ background: bannerColor }}
          >
            {editing && (
              <div className="absolute top-1 xs:top-2 sm:top-3 md:top-4 right-1 xs:right-2 sm:right-3 md:right-4 flex items-center space-x-1 xs:space-x-2 text-white">
                <label htmlFor="bannerColor" className="text-xs xs:text-sm sm:text-base">
                  Banner Color:
                </label>
                <input
                  id="bannerColor"
                  type="color"
                  value={bannerColor}
                  onChange={(e) => setBannerColor(e.target.value)}
                  className="w-5 xs:w-6 sm:w-7 md:w-8 h-5 xs:h-6 sm:h-7 md:h-8 p-0 border-none cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Profile Picture + Basic Info */}
          <div className="relative px-2 xs:px-3 sm:px-4 -mt-20 xs:-mt-22 sm:-mt-24 md:-mt-26 lg:-mt-28 flex items-end">
            <div className="relative w-16 xs:w-18 sm:w-20 md:w-22 lg:w-24 h-16 xs:h-18 sm:h-20 md:h-22 lg:h-24">
              <div className="absolute inset-0 rounded-full p-0.5 xs:p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5 xs:p-1">
                  <MyProfilePicture userId={user.userId} darkMode={darkMode} key={profileImageVersion} />
                </div>
              </div>
            </div>
            <div className="ml-2 xs:ml-3 sm:ml-4 mb-1 xs:mb-2 sm:mb-2">
              <h1 className={`text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                {formData.firstName} {formData.lastName}
              </h1>
              <p className={`text-xs xs:text-sm sm:text-base ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                {formData.email}
              </p>
            </div>
          </div>

          {/* Profile Image Upload/Delete Section */}
          <div className={`mt-2 xs:mt-3 sm:mt-4 mb-4 xs:mb-6 sm:mb-8 p-4 xs:p-6 sm:p-8 rounded shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex flex-col sm:flex-row items-center gap-2 xs:gap-3 sm:gap-4">
              <button
                onClick={toggleUploadPanel}
                className="w-full sm:w-auto px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-blue-600 text-white text-xs xs:text-sm sm:text-base rounded hover:bg-blue-700"
              >
                {showUploadPanel ? "Cancel" : "Upload"}
              </button>
              <button
                onClick={handleDeleteProfileImage}
                className="w-full sm:w-auto px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-red-500 text-white text-xs xs:text-sm sm:text-base rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {showUploadPanel && (
              <div
                className="mt-2 xs:mt-3 sm:mt-4 p-4 xs:p-6 sm:p-8 bg-gray-100 dark:bg-gray-700 rounded relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="text-xs xs:text-sm sm:text-base mb-1 xs:mb-2 sm:mb-2 text-gray-700 dark:text-gray-200">
                  Drag and drop an image file here or click the box below.
                </div>

                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-500 rounded p-4 xs:p-6 sm:p-8 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition"
                >
                  {selectedFilePreview ? (
                    <img
                      src={selectedFilePreview}
                      alt="Preview"
                      className="max-h-20 xs:max-h-24 sm:max-h-28 md:max-h-32 object-contain"
                    />
                  ) : (
                    <span className="text-center text-xs xs:text-sm sm:text-base">
                      Click to select a file
                    </span>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileChange(file);
                    }}
                  />
                </label>

                <div className="mt-2 xs:mt-3 sm:mt-4 flex justify-end">
                  <button
                    onClick={handleConfirmUpload}
                    disabled={!selectedFile}
                    className={`w-full sm:w-auto px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 rounded text-white text-xs xs:text-sm sm:text-base ${
                      selectedFile
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Confirm Upload
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col items-start mb-4 xs:mb-6 sm:mb-8">
            {showProgressBar && (
              <div className="mt-1 xs:mt-2 sm:mt-2 w-full space-y-1">
                <div className="flex flex-col sm:flex-row items-center gap-1 xs:gap-2 sm:gap-2">
                  <div className="relative w-full sm:flex-1 bg-gray-200 rounded-full h-2 xs:h-2.5 sm:h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 xs:h-2.5 sm:h-2.5 rounded-full"
                      style={{ width: `${profileCompleteness}%` }}
                    ></div>
                  </div>
                  {profileCompleteness === 100 && (
                    <button
                      onClick={handleDismissProgressBar}
                      className="w-full sm:w-auto mt-2 sm:mt-0 px-2 xs:px-3 sm:px-3 py-1 bg-green-500 text-white rounded flex items-center text-xs xs:text-sm sm:text-base hover:bg-green-600 shadow-md"
                    >
                      <FaCheckCircle className="mr-1" />
                      Proceed
                    </button>
                  )}
                </div>
                <p className="text-xs xs:text-sm sm:text-base">
                  Profile completion: {profileCompleteness}%
                </p>
                {profileCompleteness < 100 && missingItems.length > 0 && (
                  <p className="text-xs xs:text-sm sm:text-base text-red-500">
                    Missing: {missingItems.join(", ")}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* My Information Section */}
          <div
            className={`border border-gray-300 hover:shadow-md hover:border-green-500 transition rounded-lg p-4 xs:p-6 sm:p-8 ${darkMode ? "bg-transparent" : "bg-white"}`}
          >
            <h2 className="font-semibold text-base xs:text-lg sm:text-xl mb-2 xs:mb-3 sm:mb-4">
              My Information
            </h2>
            {errorMessage && (
              <div className="text-red-500 mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base sm:text-lg">
                {errorMessage}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
              {renderField("First Name", "firstName")}
              {renderField("Last Name", "lastName")}
              {renderField("Email", "email", "email")}
              {renderField("Phone Number", "phoneNumber")}
              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs xs:text-sm sm:text-base font-medium mb-1 block">
                  About
                </label>
                {editing ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 text-sm xs:text-base sm:text-lg"
                  />
                ) : (
                  <p className="mt-1 text-sm xs:text-base sm:text-lg">
                    {formData.about || "No description available"}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 xs:mt-6 sm:mt-6 flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={!isEdited}
                    className={`w-full sm:w-auto px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-2 rounded text-white text-xs xs:text-sm sm:text-base ${
                      isEdited
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs xs:text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 text-xs xs:text-sm sm:text-base"
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