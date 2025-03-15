import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";

export function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Toggle for the "Add Address" form
  const [showAddForm, setShowAddForm] = useState(false);

  const [formValues, setFormValues] = useState({
    streetAddress: "",
    city: "",
    county: "",
    eirCode: "",
    addressType: "HOME",
    default: false,
  });

  // Pull darkMode from your ThemeContext
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/v1/users/addresses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch addresses. Status: ${response.status}`);
      }
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Unable to load addresses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/v1/users/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        let errorMessage = "Failed to create address";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Non-JSON error response
        }
        throw new Error(errorMessage);
      }

      setSuccessMessage("Address added successfully!");
      await fetchAddresses();
      // Reset form and hide it again
      setFormValues({
        streetAddress: "",
        city: "",
        county: "",
        eirCode: "",
        addressType: "OTHER",
        default: false,
      });
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating address:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (addressId) => {
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch(`/api/v1/users/addresses/${addressId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        let errorMessage = "Failed to remove address";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Non-JSON error response
        }
        throw new Error(errorMessage);
      }
      setAddresses((prev) => prev.filter((addr) => addr.addressId !== addressId));
      setSuccessMessage("Address removed successfully!");
    } catch (err) {
      console.error("Error removing address:", err);
      setError(err.message || "An error occurred while removing the address.");
    }
  };

  const handleEdit = (address) => {
    setSuccessMessage(null);
    setError(null);
    setEditingAddress(address);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        `/api/v1/users/addresses/${editingAddress.addressId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editingAddress),
        }
      );
      if (!response.ok) {
        let errorMessage = "Failed to update address";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Non-JSON error response
        }
        throw new Error(errorMessage);
      }

      setSuccessMessage("Address updated successfully!");
      await fetchAddresses();
      setEditingAddress(null);
    } catch (err) {
      console.error("Error updating address:", err);
      setError(err.message || "An error occurred while updating the address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`my-10 border-1 rounded-4xl main-content min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">My Addresses</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          {/* LOADING OR RENDER ADDRESSES */}
          {loading ? (
            <p>Loading addresses...</p>
          ) : addresses.length === 0 ? (
            <p>No addresses found. Please add one below.</p>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.addressId} className="card p-4">
                  <p>{addr.streetAddress}</p>
                  <p>
                    {addr.city}, {addr.county}
                  </p>
                  <p>{addr.eirCode}</p>
                  <p>Type: {addr.addressType}</p>
                  <p>{addr.default ? "Default Address" : "Secondary Address"}</p>

                  {/* Buttons for Remove & Update */}
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(addr)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleRemove(addr.addressId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Update Address Form (only shown when editingAddress is set) */}
          {editingAddress && (
            <div className="card mt-6 p-6">
              <h3 className="text-lg font-semibold mb-2">Update Address</h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <InputField
                  name="streetAddress"
                  value={editingAddress.streetAddress}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      streetAddress: e.target.value,
                    })
                  }
                  placeholder="Street Address"
                  required
                />
                <InputField
                  name="city"
                  value={editingAddress.city}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      city: e.target.value,
                    })
                  }
                  placeholder="City"
                  required
                />
                <InputField
                  name="county"
                  value={editingAddress.county}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      county: e.target.value,
                    })
                  }
                  placeholder="County"
                  required
                />
                <InputField
                  name="eirCode"
                  value={editingAddress.eirCode}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      eirCode: e.target.value,
                    })
                  }
                  placeholder="Eir Code"
                  required
                />

                <select
                  name="addressType"
                  value={editingAddress.addressType}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      addressType: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg 
                             bg-white text-black 
                             dark:bg-gray-700 dark:text-white"
                >
                  <option value="HOME">Home</option>
                  <option value="WORK">Work</option>
                  <option value="OTHER">Other</option>
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="default"
                    checked={editingAddress.default}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        default: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label className="text-sm">Set as default address</label>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Updating..." : "Update Address"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingAddress(null)}
                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ADD ADDRESS SECTION */}
          <div className="card mt-6 p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add a New Address</h3>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1 bg-green-600 text-white font-bold rounded hover:bg-green-700"
              >
                {showAddForm ? "Cancel" : "Add Address"}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <InputField
                  name="streetAddress"
                  value={formValues.streetAddress}
                  onChange={handleChange}
                  placeholder="Street Address"
                  required
                />
                <InputField
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
                <InputField
                  name="county"
                  value={formValues.county}
                  onChange={handleChange}
                  placeholder="County"
                  required
                />
                <InputField
                  name="eirCode"
                  value={formValues.eirCode}
                  onChange={handleChange}
                  placeholder="Eir Code"
                  required
                />
                <select
                  name="addressType"
                  value={formValues.addressType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg
                             bg-white text-black
                             dark:bg-gray-700 dark:text-white"
                >
                  <option value="HOME">Home</option>
                  <option value="WORK">Work</option>
                  <option value="OTHER">Other</option>
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="default"
                    checked={formValues.default}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-sm">Set as default address</label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Saving..." : "Add Address"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable input component
function InputField({ name, value, onChange, placeholder, required }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg"
      placeholder={placeholder}
      required={required}
    />
  );
}
