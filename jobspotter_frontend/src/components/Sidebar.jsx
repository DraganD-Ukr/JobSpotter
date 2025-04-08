import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { Link } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import Notification from "../components/Notification";

export default function Sidebar() {
  // User info state
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("Guest");
  const [lastName, setLastName] = useState("User");
  const [userType, setUserType] = useState("User");
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Fetch user data when component mounts
  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUserId(data.userId || "");
        setFirstName(data.firstName || "Guest");
        setLastName(data.lastName || "User");
        setUserType(data.userType || "User");
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [setDarkMode]);

  // Logout function
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

  // Delete Account function
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      if (!userId) throw new Error("No userId found. Cannot delete account.");

      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete account");

      alert("Account deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was a problem deleting your account.");
    }
  };

  return (
    <aside className="p-4 border-r">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-6">
        <ProfilePicture userId={userId} darkMode={darkMode} />
        <div>
          <h3 className="text-lg font-semibold">
            {firstName} {lastName}
          </h3>
          <p className="text-sm">{userType}</p>
        </div>
      </div>


      {/* Nav links */}
      <nav className="space-y-3">
        <Link to="/Profile" className="block text-sm hover:text-green-400">
          Profile
        </Link>
        <Link to="#" className="block text-sm hover:text-green-400">
          Job Preferences
        </Link>
        <Link to="#" className="block text-sm hover:text-green-400">
          Account Settings
        </Link>
        <Link to="/Address" className="block text-sm hover:text-green-400">
          Manage Address
        </Link>
              {/* Notification component with variant "text" for Sidebar */}
      <div className="mb-4">
        <Notification variant="text" />
      </div>
        <Link
          to="#"
          onClick={handleLogout}
          className="block text-sm hover:text-green-400"
        >
          Sign Out
        </Link>
        <Link
          to="#"
          onClick={handleDeleteAccount}
          className="block text-sm hover:text-red-400"
        >
          Delete Account
        </Link>
      </nav>
    </aside>
  );
}
