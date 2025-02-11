import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import thanosImage from "../assets/thanos.jpg";

// Returns an object with default values based on the user data.
const getDefaultFormData = (data) => ({
  firstName: data.firstName || "",
  lastName: data.lastName || "",
  email: data.email || "",
  phoneNumber: data.phoneNumber || "",
  about: data.about || "",
  address: data.address || "",
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

  // New states for addresses
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressError, setAddressError] = useState(null);
  const [addressForm, setAddressForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [addressCreating, setAddressCreating] = useState(false);
  const [addressCreateError, setAddressCreateError] = useState(null);
  const [addressCreateSuccess, setAddressCreateSuccess] = useState(null);

  // Fetch user data. Cookies will be sent automatically.
  useEffect(() => {
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
  }, []);

  // Fetch addresses on mount.
  useEffect(() => {
    fetch("/api/v1/users/addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch addresses");
        return res.json();
      })
      .then((data) => {
        setAddresses(data);
        setAddressLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        setAddressError(err.message);
        setAddressLoading(false);
      });
  }, []);

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
    // Build an object containing only the fields that have changed.
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
  
    // Use the absolute URL so that the PATCH request goes to port 8080.
    fetch("/api/v1/users/me", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedData),
    })


      .then((res) => {
        console.log("Response:", res);
        if (!res.ok) throw new Error("Failed to save changes");
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        setOriginalData(updatedUser);
        setFormData(getDefaultFormData(updatedUser));
        resetForm();
        setEditing(false);
      })
      .catch((err) => {
        console.error("Error saving user profile:", err);
      });
  };
  
  
  
  
  // Handlers for address form
  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();
    setAddressCreating(true);
    setAddressCreateError(null);
    setAddressCreateSuccess(null);

    // Build the address payload.
    const payload = {
      addressLine1: addressForm.addressLine1,
      addressLine2: addressForm.addressLine2,
      city: addressForm.city,
      state: addressForm.state,
      country: addressForm.country,
      postalCode: addressForm.postalCode,
    };

    console.log("Address Payload:", payload);

    fetch("/api/v1/users/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            console.error("Error response from API:", text);
            throw new Error(text || "Failed to create address");
          });
        }
        return res.json();
      })
      .then((data) => {
        setAddressCreateSuccess("Address added successfully!");
        // Clear the address form
        setAddressForm({
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        });
        // Refresh addresses
        fetch("/api/v1/users/addresses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setAddresses(data))
          .catch((err) =>
            console.error("Error refreshing addresses:", err)
          );
        setAddressCreating(false);
      })
      .catch((err) => {
        console.error("Error creating address:", err);
        setAddressCreateError(err.message);
        setAddressCreating(false);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
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
            Manage Address
          </a>
          <a href="#" className="block text-gray-700 hover:text-green-500 text-sm">
            Notifications
          </a>
          <a href="/Login" className="block text-gray-700 hover:text-green-500 text-sm">
            Sign Out
          </a>
        </nav>
      </aside>




      

      {/*My information Profile Content */}
      <main className="w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Information</h2>
          <div className="grid grid-cols-2 gap-6">
            {renderField("First Name", "firstName")}
            {renderField("Last Name", "lastName")}
            {renderField("Email", "email", "email")}
            {renderField("Manage Address", "address")}
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
 

















        {/* New Section: Manage Addresses */}
        <div className="bg-white shadow rounded-lg p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Addresses</h2>
          {addressLoading ? (
            <p>Loading addresses...</p>
          ) : addressError ? (
            <p className="text-red-500">{addressError}</p>
          ) : addresses.length === 0 ? (
            <p>No addresses found. Please add one below.</p>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr, idx) => (
                <div key={idx} className="border p-4 rounded">
                  <p>{addr.addressLine1}</p>
                  {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                  <p>
                    {addr.city}, {addr.state}
                  </p>
                  <p>
                    {addr.country} - {addr.postalCode}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Add a New Address</h3>
            {addressCreateError && (
              <p className="text-red-500 text-sm mb-2">{addressCreateError}</p>
            )}
            {addressCreateSuccess && (
              <p className="text-green-500 text-sm mb-2">{addressCreateSuccess}</p>
            )}
            <form onSubmit={handleAddressFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={addressForm.addressLine1}
                  onChange={handleAddressFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. 123 Main St"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={addressForm.addressLine2}
                  onChange={handleAddressFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. Apt 4B (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. Dublin"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={addressForm.state}
                  onChange={handleAddressFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. Dublin"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={addressForm.country}
                  onChange={handleAddressFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. Ireland"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={addressForm.postalCode}
                  onChange={handleAddressFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. D01 AB2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={addressCreating}
                className={`px-6 py-3 text-white rounded-lg transition ${
                  addressCreating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {addressCreating ? "Saving..." : "Add Address"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
