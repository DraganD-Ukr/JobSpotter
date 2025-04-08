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

  //Send multipart/form-data instead of JSON
  const handleConfirmUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select an image before uploading.");
        return;
      }
      // Create a FormData object and append the raw file
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      const res = await fetch("/api/v1/users/me/profile-image", {
        method: "PUT",
        credentials: "include",
        body: formData, // Let fetch auto-set the Content-Type
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

  // handle drag & drop events
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

  // 3) Calculate completeness:
  function calculateCompleteness() {
    if (!user) return 0;
    const total = 6; // firstName, lastName, email, phoneNumber, about, addresses
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

  // Handle dark mode styling
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
            className={`relative w-full h-48 md:h-52 lg:h-56 flex items-center ${
              editing ? "border border-white border-dashed" : ""
            }`}
            style={{ background: bannerColor }}
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
                {/* Pass profileImageVersion as key to force reload of image */}
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                  <MyProfilePicture userId={user.userId} darkMode={darkMode} key={profileImageVersion} />
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

          {/* Profile Image Upload/Delete Section */}
          <div className={`mt-4 mb-8 p-4 rounded shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center gap-4">
              {/* Upload" & "Delete buttons outside the panel */}
              <button
                onClick={toggleUploadPanel}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                {showUploadPanel ? "Cancel" : "Upload"}
              </button>
              <button
                onClick={handleDeleteProfileImage}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {/* Concealed upload panel appears only after clicking "Upload" */}
            {showUploadPanel && (
              <div
                className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="text-sm mb-2 text-gray-700 dark:text-gray-200">
                  Drag and drop an image file here or click the box below.
                </div>

                {/* The "drop zone" or clickable area */}
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center 
                             border-2 border-dashed border-gray-400 dark:border-gray-500 
                             rounded p-4 cursor-pointer hover:bg-gray-200 
                             dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 
                             transition"
                >
                  {selectedFilePreview ? (
                    <img
                      src={selectedFilePreview}
                      alt="Preview"
                      className="max-h-32 object-contain"
                    />
                  ) : (
                    <span className="text-center text-xs md:text-sm">
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

                {/* Confirmation Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleConfirmUpload}
                    disabled={!selectedFile}
                    className={`px-4 py-2 rounded text-white text-sm ${
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
          <div className="flex flex-col items-start mb-8">
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
                  <p className="text-xs text-red-500">
                    Missing: {missingItems.join(", ")}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* My Information Section */}
          <div
            className={`border border-gray-300 hover:shadow-md hover:border-green-500 transition rounded-lg p-6 ${darkMode ? "bg-transparent" : "bg-white"}`}
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
                      isEdited
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
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
