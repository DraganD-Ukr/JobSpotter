import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationPopup from "./NotificationPopup";

function Notification() {
  // Controls whether the popup is visible
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize the EventSource connection to listen for notifications
    const eventSource = new EventSource("/api/v1/notifications/stream", {
      withCredentials: true, // Ensure cookies are sent with the request if necessary
    });

    eventSource.onopen = () => {
      console.log("Connection to notification stream established.");
    };

    eventSource.addEventListener("notification", (event) => {
      const newNotification = JSON.parse(event.data); // Parse the incoming notification data
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]); // Add the new notification to the state
    });

    // Handle any errors during the connection
    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    // Clean up when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, []);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  // Close the notification popup
  const handleCloseNotificationPopup = () => {
    setIsPopupVisible(false);
  };

  // Mark all notifications as read
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
