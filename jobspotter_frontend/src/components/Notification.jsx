import React, { useState, useEffect } from "react";
import NotificationPopup from "./NotificationPopup";
import { Bell } from "lucide-react";

// Utility to get read notifications from localStorage
const getReadNotifications = () => {
  const stored = localStorage.getItem("readNotifications");
  return stored ? JSON.parse(stored) : [];
};

// Utility to mark a notification as read in localStorage
const markNotificationAsReadLocal = (id) => {
  const readNotifications = getReadNotifications();
  if (!readNotifications.includes(id)) {
    readNotifications.push(id);
    localStorage.setItem("readNotifications", JSON.stringify(readNotifications));
  }
};

function Notification({ variant = "icon" }) {
  const [notifications, setNotifications] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Filter notifications to only include unread ones
  const filteredNotifications = notifications.filter(
    (notif) => !getReadNotifications().includes(notif.notificationID)
  );

  // Count unread notifications
  const unreadCount = filteredNotifications.length;

  useEffect(() => {
    // 1) Fetch existing notifications from the backend
    fetch("/api/v1/notifications", { credentials: "include" })
      .then((res) => {

        if (!res.ok) {
          console.error(`Error fetching notifications: ${res.status} ${res.statusText}`);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.warn("Notifications endpoint didn't return an array. Using empty array.");
          data = [];
        }
        const unread = data.filter(
          (notif) => !getReadNotifications().includes(notif.notificationID)
        );
        setNotifications(unread);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      });

    // 2) Set up Server-Sent Events (SSE) for real-time notifications
    const eventSource = new EventSource("/api/v1/notifications/stream", {
      withCredentials: true,
    });
    eventSource.onopen = () => {
      console.log("Connected to notifications stream.");
    };
    eventSource.addEventListener("notification", (event) => {
      const newNotification = JSON.parse(event.data);
      if (!getReadNotifications().includes(newNotification.notificationID)) {
        setNotifications((prev) => [...prev, newNotification]);
      }
    });
    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Toggle the popup visibility
  const togglePopup = () => setIsPopupVisible((prev) => !prev);

  // Mark an individual notification as read
  const handleMarkAsRead = (notificationID) => {
    markNotificationAsReadLocal(notificationID);
    setNotifications((prev) =>
      prev.filter((notif) => notif.notificationID !== notificationID)
    );
  };

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    filteredNotifications.forEach((notif) => {
      markNotificationAsReadLocal(notif.notificationID);
    });
    setNotifications([]);
  };

  // If variant="text", display a plain text link
  if (variant === "text") {
    return (
      <div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            togglePopup();
          }}
          className="block text-sm hover:text-green-400"
        >
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </a>
        <NotificationPopup
          isNotificationPopupVisible={isPopupVisible}
          notifications={filteredNotifications}
          handleCloseNotificationPopup={() => setIsPopupVisible(false)}
          handleMarkAllRead={handleMarkAllRead}
          handleMarkAsRead={handleMarkAsRead}
        />
      </div>
    );
  }

  // Default (icon variant) display
  return (
    <div className="relative group inline-block">
      <button
        onClick={togglePopup}
        className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300 text-white"
      >
        <Bell size={24} className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      <NotificationPopup
        isNotificationPopupVisible={isPopupVisible}
        notifications={filteredNotifications}
        handleCloseNotificationPopup={() => setIsPopupVisible(false)}
        handleMarkAllRead={handleMarkAllRead}
        handleMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}

export default Notification;
