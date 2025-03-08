import { useEffect, useState, useContext } from "react";
import thanosImage from "../assets/thanos.jpg";
import { ThemeContext } from "../components/ThemeContext";

export default function Sidebar() {
  const [user, setUser] = useState({});
  const { setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  // Logout function added for Sign Out link
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/users/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <aside>
      <div className="flex items-center gap-3 mb-6">
        <img
          src={user.profileImage || thanosImage}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {user.firstName || "Guest"} {user.lastName || "User"}
          </h3>
          <p className="text-sm">
            {user.userType || "User"}
          </p>
        </div>
      </div>

      <nav className="space-y-3">
        <a href="/Profile" className="block text-sm hover:text-green-400">
          Profile
        </a>
        <a href="#" className="block text-sm hover:text-green-400">
          Job Preferences
        </a>
        <a href="#" className="block text-sm hover:text-green-400">
          Account Settings
        </a>
        <a href="/Address" className="block text-sm hover:text-green-400">
          Manage Address
        </a>
        <a href="#" className="block text-sm hover:text-green-400">
          Notifications
        </a>
        <a
          href="#"
          onClick={handleLogout}
          className="block text-sm hover:text-green-400"
        >
          Sign Out
        </a>
      </nav>
    </aside>
  );
}
