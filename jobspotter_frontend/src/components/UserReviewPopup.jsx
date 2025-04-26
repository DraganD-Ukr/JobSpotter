import React, { useState, useContext, useEffect } from "react";
import { FaStar, FaTimes, FaExclamationTriangle, FaEdit, FaTrash } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";
import { useSpring, animated } from "react-spring";

function UserReviewPopup({
  isVisible,
  onClose,
  jobPostId,
  reviewerID,
  reviewedUserID,
  roleOfReviewer,
  existingReview 
}) {
  const { darkMode } = useContext(ThemeContext);

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reviewId, setReviewId] = useState(existingReview?.reviewId || null);

  // Animation for the modal
  const modalAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-50px)",
    config: { tension: 300, friction: 20 }
  });

  // Animation for error/success messages
  const messageAnimation = useSpring({
    opacity: errorMessage || successMessage ? 1 : 0,
    transform: errorMessage || successMessage ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 300, friction: 20 },
    reset: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validate required fields
    if (!reviewerID) {
      setErrorMessage("Reviewer user ID is required.");
      return;
    }
    if (!roleOfReviewer) {
      setErrorMessage("Reviewer role is required.");
      return;
    }
    if (!reviewedUserID) {
      setErrorMessage("Reviewed user ID is required.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setErrorMessage("Please select a rating between 1 and 5 stars.");
      return;
    }

    const payload = {
      jobPostId,
      reviewerID,
      reviewedUserID,
      roleOfReviewer,
      rating,
      comment
    };

    try {
      let response;
      if (reviewId) {
        // Update existing review
        response = await fetch(`/api/v1/reviews/${reviewId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload)
        });
      } else {
        // Create new review
        response = await fetch("/api/v1/reviews/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to ${reviewId ? "update" : "submit"} review: ${response.statusText}`);
      }

      const data = await response.json();
      if (!reviewId) {
        setReviewId(data.reviewId);
      }
      setSuccessMessage(`Review ${reviewId ? "updated" : "submitted"} successfully!`);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async () => {
    if (!reviewId) {
      setErrorMessage("No review to delete.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error(`Failed to delete review: ${response.statusText}`);
      }

      setSuccessMessage("Review deleted successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center p-2 xs:p-3 sm:p-4 z-50">
      <animated.div
        style={modalAnimation}
        className={`rounded-lg shadow-xl w-full max-w-[90%] xs:max-w-[80%] sm:max-w-md p-4 xs:p-5 sm:p-6 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
          <h2 className="text-xl xs:text-2xl sm:text-2xl font-semibold">
            {reviewId ? "Edit Review" : "Submit a Review"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <FaTimes className="h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
          </button>
        </div>

        {(errorMessage || successMessage) && (
          <animated.div
            style={messageAnimation}
            className={`mb-4 xs:mb-5 sm:mb-6 p-2 xs:p-3 sm:p-3 rounded-md flex items-center ${
              errorMessage
                ? "bg-red-100 border border-red-400 text-red-700"
                : "bg-green-100 border border-green-400 text-green-700"
            }`}
          >
            {errorMessage ? (
              <FaExclamationTriangle className="mr-1 xs:mr-2 sm:mr-2 text-red-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
            ) : (
              <FaStar className="mr-1 xs:mr-2 sm:mr-2 text-green-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
            )}
            <span className="text-xs xs:text-sm sm:text-sm">{errorMessage || successMessage}</span>
          </animated.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 xs:mb-5 sm:mb-6">
            <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base">
              Rating
            </label>
            <div className="flex space-x-1 xs:space-x-2 sm:space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6 ${
                    star <= rating
                      ? "text-yellow-400"
                      : darkMode
                      ? "text-gray-600"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 xs:mb-5 sm:mb-6">
            <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full p-2 xs:p-2 sm:p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-sm resize-none ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              rows="4"
            />
          </div>

          <div className="flex justify-end gap-2 xs:gap-3 sm:gap-4">
            {reviewId && (
              <button
                type="button"
                onClick={handleDelete}
                className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs xs:text-sm sm:text-sm flex items-center`}
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-xs xs:text-sm sm:text-sm`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs xs:text-sm sm:text-sm flex items-center`}
            >
              {reviewId ? (
                <>
                  <FaEdit className="mr-1" />
                  Update
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </animated.div>
    </div>
  );
}

export default UserReviewPopup;