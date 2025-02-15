import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    streetAddress: "",
    city: "",
    county: "",
    eirCode: "",
    addressType: "HOME",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    console.log("Fetching addresses...");
    try {
      const response = await fetch("/api/v1/users/addresses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      console.log("GET Response Status:", response.status);
      if (!response.ok) throw new Error(`Failed to fetch addresses. Status: ${response.status}`);

      const data = await response.json();
      console.log("Received addresses:", JSON.stringify(data, null, 2));
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

    console.log("Sending address data:", JSON.stringify(formValues, null, 2));

    try {
      const response = await fetch("/api/v1/users/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formValues),
      });

      console.log("POST Response Status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create address");
      }

      const newAddress = await response.json();
      console.log("Received new address response:", JSON.stringify(newAddress, null, 2));

      setSuccessMessage("Address added successfully!");
      setAddresses([...addresses, newAddress]);

      // Reset form
      setFormValues({
        streetAddress: "",
        city: "",
        county: "",
        eirCode: "",
        addressType: "OTHER",
        default: false,
      });
    } catch (err) {
      console.error("Error creating address:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="w-3/4 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Addresses</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading ? (
          <p>Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p>No addresses found. Please add one below.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr, idx) => (
              <div key={idx} className="border p-4 rounded bg-gray-50">
                <p>{addr.streetAddress}</p>
                <p>{addr.city}, {addr.county}</p>
                <p>{addr.eirCode}</p>
                <p>Type: {addr.addressType}</p>
                <p>{addr.default ? "Default Address" : "Secondary Address"}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Add a New Address</h3>
          {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="streetAddress" value={formValues.streetAddress} onChange={handleChange} placeholder="Street Address" required />
            <InputField name="city" value={formValues.city} onChange={handleChange} placeholder="City" required />
            <InputField name="county" value={formValues.county} onChange={handleChange} placeholder="County" required />
            <InputField name="eirCode" value={formValues.eirCode} onChange={handleChange} placeholder="Eir Code" required />

            <select name="addressType" value={formValues.addressType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="HOME">Home</option>
              <option value="WORK">Work</option>
              <option value="OTHER">Other</option>
            </select>

            <div className="flex items-center">
              <input type="checkbox" name="default" checked={formValues.default} onChange={handleChange} className="mr-2" />
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
        </div>
      </main>
    </div>
  );
}

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
