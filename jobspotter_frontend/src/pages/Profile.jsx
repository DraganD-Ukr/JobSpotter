  import { useEffect, useState } from "react";
  import Sidebar from "../components/Sidebar"; 

  const LoadingSkeleton = () => (
    <div className="flex min-h-screen">
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

    // If you handle images:
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

      if (selectedImage) {
        console.warn("Image changes are not supported in this snippet.");
      }

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
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="main-content w-3/4 p-8">
          <h1 className="font-bold text-xl mb-4">Profile</h1>

          <div className="card p-6">
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
            </div>

            {/* Buttons */}
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
        </main>
      </div>
    );
  }
