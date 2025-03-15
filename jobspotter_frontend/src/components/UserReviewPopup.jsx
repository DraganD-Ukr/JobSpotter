import React, { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";

export default function UserReviewPopup({
  isVisible,
  onClose,
  jobPostId,
  reviewerID,
  reviewedUserID,
  roleOfReviewer
}) {
  const { darkMode } = useContext(ThemeContext);

  // Submits the user review to the server
  const handleSubmitReview = async () => {
    // Basic validations
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      setErrorMessage("Rating must be between 1 and 5.");
      return;
    }
    if (comment.trim().length < 5) {
      setErrorMessage("Comment must be at least 5 characters.");
      return;
    }

    const requestBody = {
      reviewerID,
      reviewedUserID,
      rating: parsedRating,
      comment,
      roleOfReviewer,
      jobPostId,
    };

    try {
      const response = await fetch("/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`Review submit failed: ${response.status} ${response.statusText}`);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Exit if popup is not visible
  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-colors duration-200
        ${darkMode ? "bg-black/50" : "bg-gray-700/50"}
      `}
    >
      <div
        className={`
          w-11/12 max-w-md p-6 sm:p-8 rounded-xl shadow-2xl border transition-all
          ${
            darkMode
              ? "bg-gray-900 text-green-200 border-green-700"
              : "bg-white text-gray-900 border-gray-200"
          }
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-green-300" : "text-gray-900"
            }`}
          >
            Write a Review
          </h2>
          <button
            onClick={onClose}
            className="text-xl hover:text-red-500 transition-colors"
            aria-label="Close popup"
          >
            <FaTimes />
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            className={`
              mb-4 p-3 border rounded-md
              ${
                darkMode
                  ? "bg-red-900 border-red-600 text-red-300"
                  : "bg-red-100 border-red-400 text-red-600"
              }
            `}
          >
            {errorMessage}
          </div>
        )}

        {/* Rating */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-sm">
            Rating (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="e.g. 4.5"
            className={`
              w-full rounded-md p-2.5 focus:outline-none focus:ring-2
              ${
                darkMode
                  ? "bg-gray-800 border border-green-700 text-green-200 focus:ring-green-500"
                  : "bg-white border border-gray-300 focus:ring-blue-500"
              }
            `}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-sm">
            Comment
          </label>
          <textarea
            placeholder="Share your experience..."
            className={`
              w-full rounded-md p-2.5 resize-none h-28 focus:outline-none focus:ring-2
              ${
                darkMode
                  ? "bg-gray-800 border border-green-700 text-green-200 focus:ring-green-500"
                  : "bg-white border border-gray-300 focus:ring-blue-500"
              }
            `}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={400}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">
            {comment.length}/400
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`
              px-4 py-2 rounded-md text-sm font-medium border transition-colors
              ${
                darkMode
                  ? "bg-gray-800 border-green-700 text-green-200 hover:bg-gray-700"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReview}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${
                darkMode
                  ? "bg-green-700 text-white hover:bg-green-600 focus:ring-green-500"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
              }
            `}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
