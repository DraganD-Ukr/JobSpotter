import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import thanosImage from "../assets/thanos.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("AccessToken");
    
    if (accessToken) {
      fetch("/api/v1/users/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user profile");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={user.profileImage || thanosImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-500">{user.userType || "User"}</p>
          </div>
        </div>

        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-green-500">Job Preferences</a>
          <a href="#" className="block text-gray-700 hover:text-green-500">Account Settings</a>
          <a href="#" className="block text-gray-700 hover:text-green-500">Notifications</a>
          <a href="#" className="block text-gray-700 hover:text-green-500">Sign Out</a>
        </nav>
      </aside>

      {/* Profile Content */}
      <main className="w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">My Information</h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={user.phoneNumber || "Not provided"}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* About Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">About</label>
              <input
                type="text"
                value={user.about || "No description available"}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <input
                type="text"
                value={new Date(user.createdAt).toLocaleDateString()}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Last Updated At */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Updated At</label>
              <input
                type="text"
                value={new Date(user.lastUpdatedAt).toLocaleDateString()}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
