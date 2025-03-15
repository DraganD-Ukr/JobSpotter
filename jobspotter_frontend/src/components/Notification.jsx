import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationPopup from "./NotificationPopup";
import axios from 'axios'; 


function Notification() {
  // Controls whether the popup is visible
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [notifications, setNotifications] = useState([]);

  // Track unread notifications count
  const unreadNotifications = notifications.filter(notif => !notif.read);
  const unreadCount = unreadNotifications.length;

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
    // Mark notifications as read when the user opens the popup
    if (!isPopupVisible) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    }
  };

  // Close the notification popup
  const handleCloseNotificationPopup = () => {
    setIsPopupVisible(false);
  };

  // Mark notification as read and send an API request to update status
  const handleMarkAsRead = async (notificationID) => {
    console.log(notifications);

    try {
      // API request to mark the notification as read on the server
      await axios.get(`/api/v1/notifications/${notificationID}/mark-read-or-unread`, {
        read: true,
      });

      // Remove the notification from the state after marking as read
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.notificationID !== notificationID)
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <div className="relative group inline-block">
      {/* Bell Button */}
      <button
        onClick={togglePopup}
        className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
      >
        <Bell size={24} className="text-white" />
        {/* Unread Notifications Badge */}
        {unreadCount > 0 && (
          <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </button>

      {/* Notification Popup */}
      <NotificationPopup
        isNotificationPopupVisible={isPopupVisible}
        notifications={notifications}
        errorMessage=""
        errorBoxAnimation={{}}
        handleCloseNotificationPopup={handleCloseNotificationPopup}
        handleMarkAllRead={() => setNotifications([])}
        handleMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}

export default Notification;
