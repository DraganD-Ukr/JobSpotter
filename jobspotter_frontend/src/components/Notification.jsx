import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationPopup from "./NotificationPopup";

// Custom hook to get a value from session storage and update if it changes
function useSessionStorage(key, pollInterval = 1000) {
  const [value, setValue] = useState(() => sessionStorage.getItem(key));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newValue = sessionStorage.getItem(key);
      if (newValue !== value) {
        setValue(newValue);
      }
    }, pollInterval);
    return () => clearInterval(intervalId);
  }, [key, value, pollInterval]);

  return value;
}

function Notification() {
  // Controls whether the popup is visible
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Notifications state (initially empty; will be updated via SSE)
  const [notifications, setNotifications] = useState([]);

  // Get userId from session storage using our custom hook
  const userId = useSessionStorage("userId");

  useEffect(() => {
    // If no userId exists, skip opening SSE connection
    if (!userId) {
      console.log("[Notification] No userId found, skipping SSE connection.");
      return;
    }

    console.log("[Notification] Detected userId:", userId, " - opening SSE connection...");

    // Create a new EventSource for the notifications stream
    const eventSource = new EventSource("/api/v1/notifications/stream", {
      withCredentials: true, // include cookies if needed
    });

    eventSource.onopen = () => {
      console.log("[Notification] SSE connection opened successfully!");
    };

    eventSource.onmessage = (event) => {
      console.log("[Notification] SSE message received:", event.data);
      try {
        const newNotification = JSON.parse(event.data);
        console.log("[Notification] Parsed notification:", newNotification);
        setNotifications((prev) => [newNotification, ...prev]);
      } catch (error) {
        console.error("[Notification] Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("[Notification] SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      console.log("[Notification] Component unmounting. Closing SSE connection.");
      eventSource.close();
    };
  }, [userId]); // re-run this effect whenever userId changes

  // Toggle popup
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  // Close popup
  const handleCloseNotificationPopup = () => {
    setIsPopupVisible(false);
  };

  // Mark all as read (clear notifications)
  const handleMarkAllRead = () => {
    console.log("[Notification] Marking all notifications as read.");
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
