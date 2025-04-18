import React, { useState, useEffect } from "react";
import NotificationPopup from "./NotificationPopup";
import { Bell } from "lucide-react";

/* Get all unread notifications currently stored in sessionStorage. */
function getStoredUnreadNotifications() {
  const stored = sessionStorage.getItem("unreadNotifications");
  return stored ? JSON.parse(stored) : [];
}

/* Write the entire array of unread notifications to sessionStorage. */
function storeUnreadNotifications(notifications) {
  sessionStorage.setItem("unreadNotifications", JSON.stringify(notifications));
}

export default function Notification({ variant = "icon" }) {
  const [notifications, setNotifications] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // The number of unread notifications is just the length of our array
  const unreadCount = notifications.length;

  useEffect(() => {
    // 1) Load existing unread notific
    // ations from sessionStorage
    let existingUnread = getStoredUnreadNotifications();

    // 2) Fetch fresh notifications from your backend
    fetch("/api/v1/notifications", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error fetching notifications: ${res.status} ${res.statusText}`);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.warn("Notifications endpoint did not return an array. Using empty array.");
          data = [];
        }

        /**
         * For each notification from the server, add it to our unread
         * list if it's not already there. We do not rely on the server
         * continuing to return old notifications. We keep them in sessionStorage
         * until explicitly marked read.
         */
        const merged = [...existingUnread];
        for (let notif of data) {
          // Only add if we don't already have it (check ID)
          const alreadyInList = merged.some(
            (n) => n.notificationID === notif.notificationID
          );
          if (!alreadyInList) {
            merged.push(notif);
          }
        }

        // Update state and sessionStorage
        setNotifications(merged);
        storeUnreadNotifications(merged);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        // If fetch fails, we just keep our existing unread from session storage
        setNotifications(existingUnread);
      });

    // 3) Set up Server-Sent Events for real-time notifications
    const eventSource = new EventSource("/api/v1/notifications/stream", {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log("Connected to notifications stream via SSE.");
    };

    /*
     * When we get a new SSE notification, we union it with existing ones
     * if it's not already present. Then we store them again in sessionStorage.
     */
    eventSource.addEventListener("notification", (event) => {
      const newNotification = JSON.parse(event.data);

      setNotifications((prev) => {
        // If we already have it in state, do nothing
        const alreadyExists = prev.some(
          (n) => n.notificationID === newNotification.notificationID
        );
        if (alreadyExists) {
          return prev;
        }

        // Otherwise, add it
        const merged = [...prev, newNotification];
        storeUnreadNotifications(merged);
        return merged;
      });
    });

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      eventSource.close();
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, []);

  /**
   * Toggle popup
   */
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  /**
   * Mark one notification as read:
   * - Remove it from state
   * - Remove it from session storage
   */
  const handleMarkAsRead = (notificationID) => {
    setNotifications((prev) => {
      const filtered = prev.filter((n) => n.notificationID !== notificationID);
      storeUnreadNotifications(filtered);
      return filtered;
    });
  };

  /**
   * Mark all as read:
   * - Clear them from state
   * - Clear them from session storage
   */
  const handleMarkAllRead = () => {
    setNotifications([]);
    storeUnreadNotifications([]);
  };

  // 4) Render logic
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
          notifications={notifications}
          handleCloseNotificationPopup={() => setIsPopupVisible(false)}
          handleMarkAllRead={handleMarkAllRead}
          handleMarkAsRead={handleMarkAsRead}
        />
      </div>
    );
  }

  // Default icon variant
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
        notifications={notifications}
        handleCloseNotificationPopup={() => setIsPopupVisible(false)}
        handleMarkAllRead={handleMarkAllRead}
        handleMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}
