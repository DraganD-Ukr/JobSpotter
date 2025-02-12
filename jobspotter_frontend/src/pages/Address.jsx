import Sidebar from "../components/Sidebar"; 
import { useState, useEffect } from "react";



export function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch addresses when the component mounts
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateForm({ ...formValues, [name]: value });
  };

  // Validation function
  const validateForm = (values) => {
    let errors = {};

    if (!values.addressLine1.trim()) errors.addressLine1 = "Address Line 1 is required.";
    if (!values.city.trim()) errors.city = "City is required.";
    if (!values.state.trim()) errors.state = "State is required.";
    if (!values.country.trim()) errors.country = "Country is required.";
    if (!values.postalCode.trim()) errors.postalCode = "Postal Code is required.";

    setFormErrors(errors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(formValues);

    if (Object.keys(formErrors).length > 0) return; // Stop if errors exist

    setIsSubmitting(true);
    setSuccessMessage(null);
    setError(null);

    fetch("/api/v1/users/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create address");
        return res.json();
      })
      .then((data) => {
        setSuccessMessage("Address added successfully!");
        setAddresses([...addresses, data]);
        setFormValues({
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        });
      })
      .catch((err) => {
        console.error("Error creating address:", err);
        setError("An error occurred. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="bg-white shadow-md rounded-2xl p-8 w-3/5 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Addresses</h2>
        
        {/* Display error message if fetching fails */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Display loading message */}
        {loading ? (
          <p>Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p>No addresses found. Please add one below.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr, idx) => (
              <div key={idx} className="border p-4 rounded bg-gray-50">
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

        {/* Address Form */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Add a New Address</h3>

          {/* Display success message */}
          {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
              <input
                name="addressLine1"
                value={formValues.addressLine1}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. 123 Main St"
                required
              />
              {formErrors.addressLine1 && <p className="text-red-500 text-sm">{formErrors.addressLine1}</p>}
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
              <input
                name="addressLine2"
                value={formValues.addressLine2}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. Apt 4B (optional)"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                name="city"
                value={formValues.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. Dublin"
                required
              />
              {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                name="state"
                value={formValues.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. Dublin"
                required
              />
              {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                name="country"
                value={formValues.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. Ireland"
                required
              />
              {formErrors.country && <p className="text-red-500 text-sm">{formErrors.country}</p>}
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                name="postalCode"
                value={formValues.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. D01 AB2"
                required
              />
              {formErrors.postalCode && <p className="text-red-500 text-sm">{formErrors.postalCode}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
              {isSubmitting ? "Saving..." : "Add Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
