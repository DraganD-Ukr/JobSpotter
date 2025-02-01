import thanosImage from "../assets/thanos.jpg"; 

export default function Profile() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl">
        
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={thanosImage}
            alt="Thanos"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Thanos from Squid Game</h2>
            <p className="text-gray-600">johntroll@trolly.com</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value="John Troll"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value="johntroll@trolly.com"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value="+353 123 4567"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              readOnly
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
