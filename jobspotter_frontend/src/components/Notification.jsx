import React, { useState, useEffect, useContext } from "react";
import NotificationPopup from "./NotificationPopup";
import { Bell } from "lucide-react";
import { ThemeContext } from "./ThemeContext";
import { useSpring, animated, config } from "react-spring";

function getStoredUnreadNotifications() {
  const stored = sessionStorage.getItem("unreadNotifications");
  return stored ? JSON.parse(stored) : [];
}

function storeUnreadNotifications(notifications) {
  sessionStorage.setItem("unreadNotifications", JSON.stringify(notifications));
}

function getReadNotificationIds() {
  const stored = localStorage.getItem("readNotifications");
  return stored ? JSON.parse(stored) : [];
}

function storeReadNotificationId(notificationId) {
  const readIds = getReadNotificationIds();
  if (!readIds.includes(notificationId)) {
    readIds.push(notificationId);
    localStorage.setItem("readNotifications", JSON.stringify(readIds));
  }
}

export default function Notification({ variant = "icon", isLoggedIn = true }) {
  const [notifications, setNotifications] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const unreadCount = notifications.length;
  const { darkMode } = useContext(ThemeContext);

  // Clear notifications when logged out
  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      sessionStorage.removeItem("unreadNotifications");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    let existingUnread = getStoredUnreadNotifications();
    const readNotificationIds = getReadNotificationIds();

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

        // Filter out notifications that have been marked as read
        const filteredData = data.filter(notif => !readNotificationIds.includes(notif.notificationID));
        
        const merged = [...existingUnread];
        for (let notif of filteredData) {
          const alreadyInList = merged.some(
            (n) => n.notificationID === notif.notificationID
          );
          if (!alreadyInList) {
            merged.push(notif);
          }
        }

        setNotifications(merged);
        storeUnreadNotifications(merged);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setNotifications(existingUnread);
      });

    const eventSource = new EventSource("/api/v1/notifications/stream", {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log("Connected to notifications stream via SSE.");
    };

    eventSource.addEventListener("notification", (event) => {
      const newNotification = JSON.parse(event.data);
      const readNotificationIds = getReadNotificationIds();

      // Check if notification has been marked as read before
      if (readNotificationIds.includes(newNotification.notificationID)) {
        return; 
      }

      setNotifications((prev) => {
        const alreadyExists = prev.some(
          (n) => n.notificationID === newNotification.notificationID
        );
        if (alreadyExists) return prev;

        const merged = [...prev, newNotification];
        storeUnreadNotifications(merged);
        return merged;
      });
    });

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn]);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const handleMarkAsRead = (notificationID) => {
    // Update the UI by removing the notification
    setNotifications((prev) => {
      const filtered = prev.filter((n) => n.notificationID !== notificationID);
      storeUnreadNotifications(filtered);
      return filtered;
    });
    
    // Store the notification ID as read in localStorage to prevent it from reappearing
    storeReadNotificationId(notificationID);
    
    // Send a request to the backend to permanently mark as read
    fetch(`/api/v1/notifications/${notificationID}/read`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(error => {
      console.error("Error marking notification as read:", error);
    });
  };

  const handleMarkAllRead = () => {
    // Get all notification IDs before clearing the state
    const notificationIds = notifications.map(n => n.notificationID);
    
    // Update UI first
    setNotifications([]);
    storeUnreadNotifications([]);
    
    // Store all notification IDs as read in localStorage
    notificationIds.forEach(id => storeReadNotificationId(id));
    
    // Then send request to mark all as read
    if (notificationIds.length > 0) {
      fetch(`/api/v1/notifications/read-all`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notificationIds })
      })
      .catch(error => {
        console.error("Error marking all notifications as read:", error);
      });
    }
  };

  if (variant === "text") {
    return (
      <div>
        <animated.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            togglePopup();
          }}
          className={`block text-sm relative transition-all duration-200 ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'}`}
          style={{
            transform: unreadCount > 0 ? 'translateX(0)' : 'translateX(0)',
            fontWeight: unreadCount > 0 ? 500 : 400
          }}
        >
          Notifications {unreadCount > 0 && (
            <animated.span 
              style={counterAnimation}
              className={`ml-1 font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              ({unreadCount})
            </animated.span>
          )}
        </animated.a>
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

  // Animation for the bell icon when new notifications arrive
  const bellAnimation = useSpring({
    transform: unreadCount > 0 ? 'rotate(12deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 10 }
  });

  // Animation for the notification counter
  const counterAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: unreadCount > 0 ? 1 : 0, transform: unreadCount > 0 ? 'scale(1)' : 'scale(0.5)' },
    config: config.wobbly
  });

  // Hover animation for the bell button
  const [isHovered, setIsHovered] = useState(false);
  const hoverAnimation = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered 
      ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
      : '0 2px 5px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <div className="relative group inline-block">
      <animated.button
        onClick={togglePopup}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={hoverAnimation}
        className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full text-white"
      >
        <animated.div style={bellAnimation}>
          <Bell size={24} className="text-white" />
        </animated.div>
        {unreadCount > 0 && (
          <animated.span 
            style={counterAnimation} 
            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount}
          </animated.span>
        )}
      </animated.button>
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