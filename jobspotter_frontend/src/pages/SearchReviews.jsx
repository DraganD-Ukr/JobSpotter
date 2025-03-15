import React, { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function SearchReviews() {
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
        `/api/v1/reviews?reviewedUserId=${searchUserId}`,
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
      className="
        my-10 main-content min-h-screen p-6 
        border border-green-700 rounded-4xl transition-all ease-in-out duration-500
        bg-gray-900 text-green-200 flex gap-8
      "
    >
      {/* LEFT COLUMN: Search & Controls */}
      <div className="w-1/4 pr-8 border-r border-green-700">
        <h1 className="text-3xl font-bold mb-6 text-green-300">Search Reviews</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter reviewed user ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="
              border border-green-700 bg-gray-800 text-green-200 
              rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />
          <button
            onClick={handleSearch}
            className="
              bg-green-600 text-white px-4 py-2 rounded 
              hover:bg-green-500 transition-colors
            "
          >
            Search Reviews
          </button>
          <button
            onClick={handleGetRatings}
            className="
              bg-green-700 text-white px-4 py-2 rounded 
              hover:bg-green-600 transition-colors
            "
          >
            Get Ratings Summary
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Ratings Summary & Reviews List */}
      <div className="flex-1">
        {ratingsSummary && (
          <div className="mb-6 p-4 border border-green-600 rounded bg-gray-800 text-green-300">
            <h2 className="font-semibold text-lg mb-2 text-green-400">Ratings Summary</h2>
            <p>Total Ratings: {ratingsSummary.ratingCount}</p>
            <p>Average Rating: {ratingsSummary.averageRating}</p>
            <p>Role: {ratingsSummary.role}</p>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-lg text-green-300">No reviews found.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li
                key={review.reviewId}
                className="
                  p-4 border border-green-700 rounded 
                  hover:shadow-md hover:shadow-green-700
                  transition-colors bg-gray-800
                "
              >
                {editingReviewId === review.reviewId ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-green-300">
                        Comment:
                      </label>
                      <textarea
                        className="
                          w-full border border-green-700 rounded p-2 
                          bg-gray-900 text-green-200 
                          focus:outline-none focus:ring-2 focus:ring-green-500
                        "
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-green-300">
                        Rating (1-5):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className="
                          w-full border border-green-700 rounded p-2 
                          bg-gray-900 text-green-200
                          focus:outline-none focus:ring-2 focus:ring-green-500
                        "
                        value={updatedRating}
                        onChange={(e) => setUpdatedRating(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(review.reviewId)}
                        className="
                          bg-green-600 text-white px-3 py-2 rounded 
                          hover:bg-green-500 flex items-center gap-1 transition-colors
                        "
                      >
                        <FaSave />
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="
                          bg-gray-600 text-white px-3 py-2 rounded 
                          hover:bg-gray-500 flex items-center gap-1 transition-colors
                        "
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-green-400 mb-1">
                      <strong>Review ID:</strong> {review.reviewId}
                    </p>
                    <p className="mb-1 text-green-200">
                      <strong>Comment:</strong> {review.comment}
                    </p>
                    <p className="text-green-200">
                      <strong>Rating:</strong> {review.rating}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEditing(review)}
                        className="
                          bg-green-600 text-white px-3 py-2 rounded 
                          hover:bg-green-500 flex items-center gap-1 transition-colors
                        "
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review.reviewId)}
                        className="
                          bg-red-600 text-white px-3 py-2 rounded 
                          hover:bg-red-500 flex items-center gap-1 transition-colors
                        "
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
