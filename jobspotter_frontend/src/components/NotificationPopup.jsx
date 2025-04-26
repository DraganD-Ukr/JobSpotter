import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaExclamationTriangle, FaCheckCircle, FaTimes, FaBell } from "react-icons/fa";
import { animated, useSpring, useTransition, config } from "react-spring";

function NotificationPopup({
  isNotificationPopupVisible,
  notifications,
  errorMessage,
  errorBoxAnimation,
  handleCloseNotificationPopup,
  handleMarkAllRead,
  handleMarkAsRead
}) {
  // Animation for the modal entrance/exit
  const modalAnimation = useSpring({
    opacity: isNotificationPopupVisible ? 1 : 0,
    transform: isNotificationPopupVisible ? 'scale(1)' : 'scale(0.9)',
    config: { ...config.gentle, tension: 280, friction: 20 }
  });
  
  // Animation for each notification item
  const notificationTransitions = useTransition(notifications || [], {
    from: { opacity: 0, transform: 'translateY(10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' },
    trail: 100,
    config: config.gentle
  });
  
  // Default error box animation if not provided
  const defaultErrorAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? 'translateY(0px)' : 'translateY(-20px)',
    config: config.gentle
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMinutes = Math.floor((now - createdAt) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes === 1) return "1 minute ago";
    return `${diffInMinutes} minutes ago`;
  };

  const { darkMode } = useContext(ThemeContext);

  if (!isNotificationPopupVisible) return null;

  return (
    <animated.div
      style={{ opacity: modalAnimation.opacity }}
      className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center p-2 xs:p-3 sm:p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-popup-title"
    >
      {/* Modal container */}
      <animated.div 
        style={{ 
          transform: modalAnimation.transform,
          opacity: modalAnimation.opacity
        }}
        className={`
          bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden 
          w-full max-w-[90%] xs:max-w-[85%] sm:max-w-2xl md:max-w-3xl 
          max-h-[60vh] xs:max-h-[65vh] sm:max-h-[70vh] overflow-y-auto
          border-2 border-green-400/30 dark:border-green-500/20
        `}
      >
        {/* Header */}
        <div className={`
          px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 
          bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700
        `}>
          <h3
            className="text-base xs:text-lg sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between"
            id="notification-popup-title"
          >
            Notifications
          </h3>
        </div>

        {/* Body */}
        <div className="p-4 xs:p-5 sm:p-6">
          {/* Optional error box */}
          {errorMessage && (
            <animated.div
              style={errorBoxAnimation || defaultErrorAnimation}
              className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md flex items-center shadow-md"
              role="alert"
            >
              <FaExclamationTriangle className="mr-1 xs:mr-2 sm:mr-2 text-red-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5 animate-pulse" />
              <div>
                <h3 className="font-bold text-xs xs:text-sm sm:text-sm">Error</h3>
                <p className="text-xs xs:text-sm sm:text-sm">{errorMessage}</p>
              </div>
            </animated.div>
          )}

          {/* If there are no notifications */}
          {(!notifications || notifications.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-6 xs:py-8 sm:py-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 xs:p-5 sm:p-6">
              <FaBell className="text-gray-400 dark:text-gray-500 text-4xl xs:text-5xl sm:text-5xl mb-2 xs:mb-3 sm:mb-4 opacity-60" />
              <p className="text-gray-800 dark:text-gray-200 font-medium text-sm xs:text-base sm:text-base">No notifications</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs xs:text-sm sm:text-sm mt-1 xs:mt-2 sm:mt-2">We'll notify you when something happens</p>
            </div>
          ) : (
            // Render notifications with animations
            <div className="space-y-2 xs:space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              {notificationTransitions((style, notif, _, index) => (
                <animated.div
                  style={style}
                  key={notif.notificationID || index}
                  className={`p-2 xs:p-3 sm:p-4 rounded-lg flex items-center justify-between transition-all duration-200 ${darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
                >
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-3">
                    <div className={`p-1 xs:p-2 sm:p-2 rounded-full shadow-md ${darkMode 
                      ? 'bg-gradient-to-br from-green-500 to-green-600' 
                      : 'bg-gradient-to-br from-green-400 to-green-500'}`}>
                      <FaCheckCircle className="text-white h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
                    </div>
                    <div>
                      {/* Timestamp */}
                      <span className="text-xs xs:text-xs sm:text-xs font-medium text-green-600 dark:text-green-400 block mb-0.5 xs:mb-1 sm:mb-1">
                        {notif.createdAt ? getTimeAgo(notif.createdAt) : "Just now"}
                      </span>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-sm sm:text-base">
                        {notif.title || "Notification Title"}
                      </p>
                      <p className="text-xs xs:text-sm sm:text-sm text-gray-600 dark:text-gray-300">
                        {notif.message || "Notification message text."}
                      </p>
                    </div>
                  </div>
                  {/* Mark as read button */}
                  <button
                    onClick={() => handleMarkAsRead(notif.notificationID)}
                    className={`text-xs xs:text-sm sm:text-sm px-2 xs:px-3 sm:px-3 py-1 xs:py-1.5 sm:py-1.5 rounded-md transition-all duration-200 ${darkMode 
                      ? 'bg-gray-700 text-gray-200 hover:bg-green-600 hover:text-white hover:shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700 hover:shadow-md'} ml-1 xs:ml-2 sm:ml-2 font-medium`}
                  >
                    Mark as Read
                  </button>
                </animated.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`
          px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 
          bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 
          text-right flex flex-col sm:flex-row justify-between items-center gap-2 xs:gap-3 sm:gap-4
        `}>
          <button
            onClick={handleMarkAllRead}
            type="button"
            className={`w-full sm:w-auto inline-flex justify-center px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm font-medium text-white border border-transparent rounded-md transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${darkMode 
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}`}
          >
            Mark All Read
          </button>
          <button
            onClick={handleCloseNotificationPopup}
            type="button"
            className={`w-full sm:w-auto inline-flex justify-center px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${darkMode 
              ? 'text-gray-200 bg-gray-800 border border-gray-700 hover:bg-gray-700' 
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
          >
            Close
          </button>
        </div>
      </animated.div>
    </animated.div>
  );
}

export default NotificationPopup;