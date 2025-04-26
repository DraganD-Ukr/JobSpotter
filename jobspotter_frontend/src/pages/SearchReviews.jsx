import React, { useState, useContext } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";

export default function SearchReviews() {
  const { darkMode } = useContext(ThemeContext);

  const [searchUserId, setSearchUserId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState("");

  const [ratingsSummary, setRatingsSummary] = useState(null);

  // GET: Search reviews by reviewedUserId
  const handleSearch = async () => {
    setError("");
    try {
      const response = await fetch(
        `/api/v1/reviews/user/${searchUserId}/reviews`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch reviews: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setReviews(data.content || data);
      setRatingsSummary(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE: Remove a review by ID
  const handleDelete = async (reviewId) => {
    setError("");
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete review: ${response.status} ${response.statusText}`
        );
      }
      setReviews(reviews.filter((r) => r.reviewId !== reviewId));
    } catch (err) {
      setError(err.message);
    }
  };

  // EDIT: Enter "edit mode" for a review
  const startEditing = (review) => {
    setEditingReviewId(review.reviewId);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
  };

  // CANCEL: Stop editing a review
  const cancelEditing = () => {
    setEditingReviewId(null);
    setUpdatedComment("");
    setUpdatedRating("");
  };

  // PUT: Update an existing review
  const handleUpdate = async (reviewId) => {
    setError("");
    try {
      const requestBody = {
        comment: updatedComment,
        rating: updatedRating,
      };
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update review: ${response.status} ${response.statusText}`
        );
      }
      const updatedReviews = reviews.map((r) =>
        r.reviewId === reviewId
          ? { ...r, comment: updatedComment, rating: updatedRating }
          : r
      );
      setReviews(updatedReviews);
      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  };

  // GET: Retrieve ratings summary for a user
  const handleGetRatings = async () => {
    setError("");
    setRatingsSummary(null);
    try {
      const response = await fetch(
        `/api/v1/reviews/user/${searchUserId}/ratings`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user ratings: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setRatingsSummary(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 xs:p-6 sm:p-8 border border-green-500 rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode ? "bg-gray-900 text-green-200" : "bg-white text-black"
      } font-sans flex gap-6 xs:gap-8 sm:gap-10 md:gap-12`}
    >
      {/* LEFT COLUMN: Search & Controls */}
      <div className="w-1/4 pr-6 xs:pr-8 border-r border-green-500">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8 text-green-400">
          Search Reviews
        </h1>
        {error && (
          <p className={`${darkMode ? "text-red-400" : "text-red-500"} mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg font-medium`}>
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 mb-4 xs:mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Enter reviewed user ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className={`w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-sm xs:text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 text-green-200 border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <button
            onClick={handleSearch}
            className="w-full px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search Reviews
          </button>
          <button
            onClick={handleGetRatings}
            className="w-full px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Get Ratings Summary
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Ratings Summary & Reviews List */}
      <div className="flex-1">
        {ratingsSummary && (
          <div
            className={`mb-4 xs:mb-6 sm:mb-8 p-4 xs:p-6 sm:p-8 border rounded-lg transition-all duration-300 ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-green-300"
                : "border-gray-300 bg-white text-black"
            }`}
          >
            <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-2 xs:mb-3 sm:mb-4 text-green-400">
              Ratings Summary
            </h2>
            <p className="text-sm xs:text-base sm:text-lg">
              <strong>Seeker Rating Count:</strong> {ratingsSummary.seekerRatingCount}
            </p>
            <p className="text-sm xs:text-base sm:text-lg">
              <strong>Average Seeker Rating:</strong>{" "}
              {ratingsSummary.avgSeekerRating?.toFixed(2)}
            </p>
            <p className="text-sm xs:text-base sm:text-lg">
              <strong>Provider Rating Count:</strong> {ratingsSummary.providerRatingCount}
            </p>
            <p className="text-sm xs:text-base sm:text-lg">
              <strong>Average Provider Rating:</strong>{" "}
              {ratingsSummary.avgProviderRating?.toFixed(2)}
            </p>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-center text-base xs:text-lg sm:text-xl text-green-300">
            No reviews found.
          </p>
        ) : (
          <ul className="space-y-3 xs:space-y-4 sm:space-y-5">
            {reviews.map((review) => (
              <li
                key={review.reviewId}
                className={`p-4 xs:p-6 sm:p-8 border rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "border-gray-700 bg-gray-800 hover:border-green-500"
                    : "border-gray-300 bg-white hover:border-green-500"
                } hover:shadow-md hover:shadow-green-500/50`}
              >
                {editingReviewId === review.reviewId ? (
                  <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-sm xs:text-base sm:text-lg font-medium mb-1 xs:mb-1.5 sm:mb-2 text-green-400">
                        Comment:
                      </label>
                      <textarea
                        className={`w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-sm xs:text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-900 text-green-200 border-gray-700"
                            : "bg-white text-black border-gray-300"
                        }`}
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm xs:text-base sm:text-lg font-medium mb-1 xs:mb-1.5 sm:mb-2 text-green-400">
                        Rating (1-5):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={`w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-sm xs:text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-900 text-green-200 border-gray-700"
                            : "bg-white text-black border-gray-300"
                        }`}
                        value={updatedRating}
                        onChange={(e) => setUpdatedRating(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 xs:gap-3 sm:gap-4">
                      <button
                        onClick={() => handleUpdate(review.reviewId)}
                        className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 xs:gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaSave />
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 xs:gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm xs:text-base sm:text-lg text-green-400 mb-1 xs:mb-2">
                      <strong>Review ID:</strong> {review.reviewId}
                    </p>
                    <p className="text-sm xs:text-base sm:text-lg mb-1 xs:mb-2 text-green-200">
                      <strong>Comment:</strong> {review.comment}
                    </p>
                    <p className="text-sm xs:text-base sm:text-lg text-green-200 mb-2 xs:mb-3 sm:mb-4">
                      <strong>Rating:</strong> {review.rating}
                    </p>
                    <div className="flex gap-2 xs:gap-3 sm:gap-4">
                      <button
                        onClick={() => startEditing(review)}
                        className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 xs:gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review.reviewId)}
                        className="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 xs:gap-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}