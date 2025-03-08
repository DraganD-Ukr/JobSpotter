import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../components/ThemeContext"; // <-- bring in dark mode context if you have it

import MyProfilePicture from "../components/MyProfilePicture";
import ProfilePicture from "../components/ProfilePicture";

const LoadingSkeleton = () => (
  <div className="flex min-h-screen items-center justify-center">
    <p>Loading...</p>
  </div>
);

const getDefaultFormData = (data) => ({
  firstName: data.firstName || "",
  lastName: data.lastName || "",
  email: data.email || "",
  phoneNumber: data.phoneNumber || "",
  about: data.about || "",
  profileImage: data.profileImage || "",
});

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [editing, setEditing] = useState(false);

  // --- Image upload states ---
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 1) Add bannerColor state
  const [bannerColor, setBannerColor] = useState("#4f46e5");

  // Grab darkMode from context (like you do in SearchJobPost)
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setOriginalData(data);
        setFormData(getDefaultFormData(data));
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      })
      .finally(() => setLoading(false));
  };

  const checkEdited = (newData) => {
    if (!originalData) return false;
    return Object.keys(originalData).some(
      (key) => (newData[key] || "") !== (originalData[key] || "")
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    setIsEdited(checkEdited(newData) || selectedImage !== null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEdited(true);
    }
  };

  const resetForm = () => {
    const defaults = getDefaultFormData(originalData);
    setFormData(defaults);
    setSelectedImage(null);
    setPreviewImage(null);
    setIsEdited(false);
  };

  const handleCancel = () => {
    resetForm();
    setEditing(false);
  };

  const handleSave = () => {
    const fieldsToCheck = ["firstName", "lastName", "email", "phoneNumber", "about"];
    const changedData = {};

    fieldsToCheck.forEach((field) => {
      if (formData[field] !== originalData[field]) {
        changedData[field] = formData[field];
      }
    });

    // If an image is selected, you'd handle the upload here
    if (selectedImage) {
      console.warn("Image changes are not supported in this snippet.");
    }

    // If nothing changed, just exit editing
    if (Object.keys(changedData).length === 0) {
      setEditing(false);
      return;
    }

    setSaving(true);
    setErrorMessage("");

    fetch("/api/v1/users/me", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changedData),
    })
      .then((res) => {
        if (res.status === 204) {
          setSaving(false);
          setEditing(false);
          return null;
        }
        return res.json().then((data) => {
          if (!res.ok) throw new Error(data.message || "Failed to save changes");
          return data;
        });
      })
      .then((updatedUser) => {
        if (updatedUser) {
          setUser(updatedUser);
          setOriginalData(updatedUser);
          setFormData(getDefaultFormData(updatedUser));
        }
        resetForm();
        setEditing(false);
      })
      .catch((err) => {
        console.error("Error saving user profile:", err);
        setErrorMessage(err.message || "An error occurred while saving the profile.");
      })
      .finally(() => {
        setSaving(false);
        fetchUserData();
      });
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
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      ) : (
        <p className="mt-1">
          {formData[name] || (name === "phoneNumber" ? "Not provided" : "")}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={`main-content min-h-screen p-4 ${darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black" /* Slightly gray background in light mode */
        }`}
    >
      {/* Use a flex layout similar to SearchJobPost */}
      <div className="flex">
        {/* Left side: your existing Sidebar */}
        <Sidebar />

        {/* Right side: the main profile card/content */}
        <div className="w-4/5 p-4 ml-4 mr-30">
          {/* Banner */}
          <div
            className={`relative h-48 md:h-52 lg:h-56 flex items-center rounded-4xl 
              ${darkMode ? 'bg-gradient-to-l from-green-500 via-emerald-700 to-cyan-400 opacity-50' : ''} `}
          // style={{ backgroundColor: bannerColor }}
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

          {/* Profile Pic + Basic Info */}
          <div className="relative px-4 -mt-28 flex items-end">


            {/* Profile Pic */}
            <div className="relative w-24 h-24">
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {/* Inner Circle (Background Mask) */}
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                  <MyProfilePicture userId={user.userId} darkMode={darkMode} />
                </div>
              </div>
            </div>



            <div className="ml-4 mb-2">
              <h1
                className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-black"
                  }`}
              >
                {formData.firstName} {formData.lastName}
              </h1>
              <p
                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                {formData.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start mb-8 mt-6">
            <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
          </div>

          <div
            className={`border border-gray-300 hover:shadow-md hover:border-green-500 transition rounded-lg p-6 ${darkMode ? "" : "bg-white"
              }`}
          >
            <h2 className="font-semibold text-lg mb-4">My Information</h2>
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}

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
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : (
                  <p className="mt-1">
                    {formData.about || "No description available"}
                  </p>
                )}
              </div>

              {editing && (
                <div className="col-span-2 mt-2">
                  <label className="text-sm font-medium mb-1 block">
                    Change Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  {previewImage && (
                    <div className="mt-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-full border border-gray-400"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-4">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={!isEdited}
                    className={`px-6 py-2 rounded text-white ${isEdited
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
