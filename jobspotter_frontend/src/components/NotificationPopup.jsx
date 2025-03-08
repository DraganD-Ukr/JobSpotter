import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { animated } from "react-spring";

function NotificationPopup({
  isNotificationPopupVisible,
  notifications,
  errorMessage,
  errorBoxAnimation,
  handleCloseNotificationPopup,
  handleMarkAllRead
}) {
  const { darkMode } = useContext(ThemeContext);

  if (!isNotificationPopupVisible) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-popup-title"
    >
      {/* Modal container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden sm:max-w-3xl sm:w-full">
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between"
            id="notification-popup-title"
          >
            Notifications
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Optional error box */}
          {errorMessage && (
            <animated.div
              style={errorBoxAnimation}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
              role="alert"
            >
              <FaExclamationTriangle className="mr-2 text-red-500 h-5 w-5" />
              <div>
                <h3 className="font-bold">Error</h3>
                <p>{errorMessage}</p>
              </div>
            </animated.div>
          )}

          {/* If there are no notifications */}
          {(!notifications || notifications.length === 0) ? (
            <p className="text-gray-600 dark:text-gray-400">No notifications</p>
          ) : (
            // Render notifications
            <div className="space-y-4">
              {notifications.map((notif, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {notif.title || "Notification Title"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {notif.message || "Notification message text."}
                      </p>
                    </div>
                  </div>
                  {/* Example timestamp */}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notif.time || "Just now"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 sm:px-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-right flex justify-between items-center">
          <button
            onClick={handleMarkAllRead}
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Mark All Read
          </button>
          <button
            onClick={handleCloseNotificationPopup}
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopup;
