import React, { useState, useContext } from 'react';
import { FaExclamationTriangle, FaStar } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { ThemeContext } from './ThemeContext';

const UserReviewPopup = React.memo(({ isVisible, onClose, jobPostId, reviewerID, reviewedUserID, roleOfReviewer }) => {
  const { darkMode } = useContext(ThemeContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorBoxAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 },
    reset: true,
  });

  const successBoxAnimation = useSpring({
    opacity: successMessage ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 },
    reset: true,
  });

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitReview = async () => {
    if (rating < 1 || rating > 5) {
      setErrorMessage('Please select a rating between 1 and 5.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('Please provide a comment for the review.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const reviewData = {
        reviewedUserId: reviewedUserID,
        jobPostId: jobPostId,
        reviewerRole: 'PROVIDER', // Hardcoded as per requirement
        rating: rating,
        comment: comment.trim(),
      };

      const response = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again.');
        }
        throw new Error(`Failed to submit review: ${response.status}`);
      }

      setSuccessMessage('Review submitted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center p-2 xs:p-3 sm:p-4"
      aria-labelledby="review-popup-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          rounded-lg shadow-xl overflow-hidden 
          w-full max-w-[90%] xs:max-w-[85%] sm:max-w-md 
          ${darkMode ? 'bg-gray-900 text-white border border-gray-700' : 'bg-gray-50 text-gray-900 border border-gray-200'}
        `}
      >
        {/* Header */}
        <div
          className={`
            px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 
            ${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'}
          `}
        >
          <h3 className="text-base xs:text-lg sm:text-lg font-semibold" id="review-popup-title">
            Submit Review
          </h3>
        </div>

        {/* Body */}
        <div className="p-4 xs:p-5 sm:p-6">
          {errorMessage && (
            <animated.div
              style={errorBoxAnimation}
              className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
              role="alert"
            >
              <FaExclamationTriangle className="mr-1 xs:mr-2 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
              <div>
                <h3 className="font-bold text-xs xs:text-sm sm:text-sm">Error</h3>
                <p className="text-xs xs:text-sm sm:text-sm">{errorMessage}</p>
              </div>
            </animated.div>
          )}

          {successMessage && (
            <animated.div
              style={successBoxAnimation}
              className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center"
              role="alert"
            >
              <p className="text-xs xs:text-sm sm:text-sm">{successMessage}</p>
            </animated.div>
          )}

          <div className="mb-4 xs:mb-5 sm:mb-6">
            <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`
                    h-5 xs:h-6 sm:h-6 w-5 xs:w-6 sm:w-6 cursor-pointer
                    ${star <= rating ? 'text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}
                  `}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 xs:mb-5 sm:mb-6">
            <label
              className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              className={`
                w-full p-2 xs:p-2 sm:p-2 border rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-sm
                ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}
              `}
              rows="4"
              placeholder="Write your review here..."
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`
            px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 flex flex-col sm:flex-row justify-between items-center gap-2 xs:gap-3 sm:gap-4
            ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-200'}
          `}
        >
          <button
            onClick={onClose}
            type="button"
            className={`
              w-full sm:w-auto inline-flex justify-center px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2
              text-xs xs:text-sm sm:text-sm font-medium rounded-md border focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${darkMode ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
            `}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReview}
            type="button"
            className={`
              w-full sm:w-auto inline-flex justify-center px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2
              text-xs xs:text-sm sm:text-sm font-medium text-white bg-blue-600 border border-transparent
              rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
});

export default UserReviewPopup;