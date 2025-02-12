import { useEffect, useState } from "react";
import thanosImage from "../assets/thanos.jpg";

const Sidebar = ({ editing, previewImage, handleImageChange }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  return (
    <aside className="w-1/4 bg-white shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <img
            src={previewImage || user.profileImage || thanosImage}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          {editing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
              <label htmlFor="profileImageInput" className="text-white text-xs cursor-pointer">
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
            {user.firstName || "Guest"} {user.lastName || "User"}
          </h3>
          <p className="text-gray-500 text-sm">
            {user.userType || "User"}
          </p>
        </div>
      </div>

      <nav className="space-y-3">
        <a href="/Profile" className="block text-gray-700 hover:text-green-500 text-sm">
          Profile
        </a>
        <a href="#" className="block text-gray-700 hover:text-green-500 text-sm">
          Job Preferences
        </a>
        <a href="#" className="block text-gray-700 hover:text-green-500 text-sm">
          Account Settings
        </a>
        <a href="/Address" className="block text-gray-700 hover:text-green-500 text-sm">
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
  );
};

export default Sidebar;
