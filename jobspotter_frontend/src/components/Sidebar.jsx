import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { Link } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";

export default function Sidebar() {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("Guest");
  const [lastName, setLastName] = useState("User");
  const [userType, setUserType] = useState("User");

  const { darkMode, setDarkMode } = useContext(ThemeContext);

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
        console.log("Sidebar user data:", data);
        // Set each piece of data like in the Navbar
        setUserId(data.userId || "");
        setFirstName(data.firstName || "Guest");
        setLastName(data.lastName || "User");
        setUserType(data.userType || "User");
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [setDarkMode]);

  // Logout function for Sign Out link
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
        {/* Use ProfilePicture just like in Navbar, passing userId and darkMode */}
        <ProfilePicture userId={userId} darkMode={darkMode} />
        <div>
          <h3 className="text-lg font-semibold">
            {firstName} {lastName}
          </h3>
          <p className="text-sm">{userType}</p>
        </div>
      </div>

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
        <Link to="#" className="block text-sm hover:text-green-400">
          Notifications
        </Link>
        <Link
          to="#"
          onClick={handleLogout}
          className="block text-sm hover:text-green-400"
        >
          Sign Out
        </Link>
      </nav>
    </aside>
  );
}
