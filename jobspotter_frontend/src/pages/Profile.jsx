import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import thanosImage from "../assets/thanos.jpg";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="flex min-h-screen bg-gray-100">
    <aside className="w-1/4 bg-white shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
        <div>
          <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <nav className="space-y-3">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
      </nav>
    </aside>
    <main className="w-3/4 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="w-1/2 h-6 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>
          <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>
          <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>
          <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>
          <div className="col-span-2 w-full h-24 bg-gray-300 rounded mb-4"></div>
        </div>
        <div className="mt-6 flex gap-4">
          <div className="w-24 h-10 bg-gray-300 rounded"></div>
          <div className="w-24 h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </main>
  </div>
);

// Returns an object with default values based on the user data.
const getDefaultFormData = (data) => ({
  firstName: data.firstName || "",
  lastName: data.lastName || "",
  email: data.email || "",
  phoneNumber: data.phoneNumber || "",
  about: data.about || "",
  profileImage: data.profileImage || "",
});

export default function Profile() {
  // Existing user/profile state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user data. Cookies will be sent automatically.
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
    return Object.keys(originalData || {}).some(
      (key) => (newData[key] || "") !== (originalData[key] || "")
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    setIsEdited(checkEdited(newData) || selectedImage !== null);
  };

  // Handle image selection (from gallery or camera)
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
    const fieldsToCheck = ["firstName", "lastName", "email", "username", "phoneNumber", "about"];
    const changedData = {};

    fieldsToCheck.forEach((field) => {
      if (formData[field] !== originalData[field]) {
        changedData[field] = formData[field];
      }
    });

    if (selectedImage) {
      console.warn("Image changes are not supported; the image will not be updated.");
    }

    if (Object.keys(changedData).length === 0) {
      console.log("No changes detected.");
      setEditing(false);
      return;
    }

    console.log("Changed Data:", changedData); // Log the changed data

    const requestOptions = {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedData),
    };

    console.log("Request Options:", requestOptions); // Log the request options

    setSaving(true);
    setErrorMessage(""); // Clear any previous error messages

    fetch("/api/v1/users/me", requestOptions)
      .then((res) => {
        console.log("Response:", res);
        if (res.status === 204) {
          // No content, no changes
          setSaving(false);
          setEditing(false);
          return null;
        }
        return res.json().then((data) => {
          console.log("Response Body:", data); // Log the response body
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
        fetchUserData(); // Fetch the updated user data
      });
  };

  if (loading || saving) {
    return <LoadingSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Error loading user profile. Please try again later.</p>
      </div>
    );
  }

  // Helper to render a field label and value/input.
  const renderField = (label, name, type = "text", placeholder = "") => (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      {editing ? (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      ) : (
        <p className="mt-1 text-gray-800">
          {formData[name] || (name === "phoneNumber" ? "Not provided" : "")}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <img
              src={
                editing
                  ? previewImage || formData.profileImage || thanosImage
                  : formData.profileImage || thanosImage
              }
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            {editing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                <label htmlFor="profileImageInput" className="text-white text-xs">
                  Change Photo
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-500 text-sm">
              {user.userType || "User"}
            </p>
          </div>
        </div>

        <nav className="space-y-3">
          <a href="#" className="block text-gray-700 hover:text-green-500 text-sm">
            Job Preferences
          </a>
          <a href="#" className="block text-gray-700 hover:text-green-500 text-sm">
            Account Settings
          </a>
          <a href="#" className="block text-gray-700 hover:text-green-500 text-sm">
            Notifications
          </a>
          <a href="/Login" className="block text-gray-700 hover:text-green-500 text-sm">
            Sign Out
          </a>
        </nav>
      </aside>

      {/* My information Profile Content */}
      <main className="w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Information</h2>
          {errorMessage && (
            <div className="mb-4 text-red-500">
              {errorMessage}
            </div>
          )}
          <div className="grid grid-cols-2 gap-6">
            {renderField("First Name", "firstName")}
            {renderField("Last Name", "lastName")}
            {renderField("Email", "email", "email")}
            {renderField("Phone Number", "phoneNumber")}
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">About</p>
              {editing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ) : (
                <p className="mt-1 text-gray-800">
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
                  className={`px-6 py-2 rounded-lg text-white ${
                    isEdited
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
