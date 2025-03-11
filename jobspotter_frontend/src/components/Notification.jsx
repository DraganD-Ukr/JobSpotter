import React, { useState } from "react";
import { Bell } from "lucide-react";
import NotificationPopup from "./NotificationPopup";

function Notification() {
  // Controls whether the popup is visible
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      title: "Welcome to JobSpotter!",
      message: "Thanks for joining us!",
      time: "2 min ago"
    },
    {
      title: "Job Alert",
      message: "A new job post matches your skills.",
      time: "5 min ago"
    }
  ]);

  // Toggle popup
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  // Close popup
  const handleCloseNotificationPopup = () => {
    setIsPopupVisible(false);
  };

  // Mark all as read 
  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <div className="relative group inline-block">
      {/* Bell Button */}
      <button
        onClick={togglePopup}
        className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
      >
        <Bell size={24} className="text-white" />
      </button>

      {/* Notification Popup */}
      <NotificationPopup
        isNotificationPopupVisible={isPopupVisible}
        notifications={notifications}
        errorMessage=""               
        errorBoxAnimation={{}}        
        handleCloseNotificationPopup={handleCloseNotificationPopup}
        handleMarkAllRead={handleMarkAllRead}
      />
    </div>
  );
}

export default Notification;
