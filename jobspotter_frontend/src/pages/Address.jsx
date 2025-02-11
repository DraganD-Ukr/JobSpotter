
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