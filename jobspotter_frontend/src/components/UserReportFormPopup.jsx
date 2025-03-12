import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext"; 
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export function UserReportFormPopup() {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();

  // Form fields
  const [reportSubjectType, setReportSubjectType] = useState("");
  const [reportSubjectId, setReportSubjectId] = useState("");
  const [reportedUserId, setReportedUserId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [reportTags, setReportTags] = useState([]);

  // Possible tags (adjust as needed)
  const possibleTags = [
    "IMPERSONATION",
    "SPAM",
    "INAPPROPRIATE_CONTENT",
    "DISCRIMINATION",
    "POLICY_VIOLATION",
    "OTHER",
  ];

  // UI feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // On mount, parse query params (jobId, creatorId, etc.) and lock them in
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobId = params.get("jobId");
    const creatorId = params.get("creatorId");

    // If we're reporting a job post, set these fields:
    setReportSubjectType("JOB_POST");  // locked to "JOB_POST"
    if (jobId) setReportSubjectId(jobId);
    if (creatorId) setReportedUserId(creatorId);

  }, [location]);

  // Toggle tags in state
  const handleTagChange = (tag) => {
    setReportTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Build payload
    const payload = {
      reportSubjectType,
      reportSubjectId: reportSubjectId ? parseInt(reportSubjectId, 10) : undefined,
      reportedUserId: reportedUserId ? parseInt(reportedUserId, 10) : undefined,
      reviewId: reviewId ? parseInt(reviewId, 10) : undefined,
      reviewMessage,
      reportMessage,
      reportTags,
    };

    try {
      const response = await fetch("/api/v1/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error creating report: ${response.statusText}`);
      }

      // Clear the form upon success
      setReportSubjectType("");
      setReportSubjectId("");
      setReportedUserId("");
      setReviewId("");
      setReviewMessage("");
      setReportMessage("");
      setReportTags([]);
      setSuccessMessage("Report created successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-green-400" : "text-green-600"
        }`}
      >
        Create a Report
      </h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
          <FaExclamationTriangle className="mr-2 text-red-500 h-5 w-5" />
          <div>
            <p className="font-bold">Error:</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
          <FaCheckCircle className="mr-2 text-green-500 h-5 w-5" />
          <div>{successMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* reportSubjectType - locked to "JOB_POST" */}
        <div>
          <label className="block font-medium mb-1" htmlFor="reportSubjectType">
            Report Subject Type
          </label>
          <input
            type="text"
            id="reportSubjectType"
            value={reportSubjectType}
            readOnly // user can't edit
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* reportSubjectId - readOnly */}
        <div>
          <label className="block font-medium mb-1" htmlFor="reportSubjectId">
            Report Subject ID (Job Post ID)
          </label>
          <input
            type="number"
            id="reportSubjectId"
            value={reportSubjectId}
            readOnly // user can't edit
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
            placeholder="Job ID"
          />
        </div>

        {/* reportedUserId - readOnly */}
        <div style={{ display: "none" }}>
          <label className="block font-medium mb-1" htmlFor="reportedUserId">
            Job Creator ID (cannot change)
          </label>
          <input
            type="number"
            id="reportedUserId"
            value={reportedUserId}
            readOnly // user can't edit
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
            placeholder="Creator ID"
          />
        </div>

        {/* reviewId (optional) */}
        <div style={{ display: "none" }}>
          <label className="block font-medium mb-1" htmlFor="reviewId">
            Review ID (Optional)
          </label>
          <input
            type="number"
            id="reviewId"
            value={reviewId}
            onChange={(e) => setReviewId(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="If applicable"
          />
        </div>

        {/* reviewMessage (optional) */}
        <div style={{ display: "none" }}>
          <label className="block font-medium mb-1" htmlFor="reviewMessage">
            Review Message (Optional)
          </label>
          <textarea
            id="reviewMessage"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none resize-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Paste the review content or summary here (if relevant)"
          />
        </div>

        {/* reportMessage */}
        <div>
          <label className="block font-medium mb-1" htmlFor="reportMessage">
            Report Message
          </label>
          <textarea
            id="reportMessage"
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none resize-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Explain why you are creating this report..."
            required
          />
        </div>

        {/* reportTags */}
        <div>
          <span className="block font-medium mb-1">
            Report Tags (select any that apply):
          </span>
          <div className="flex flex-wrap gap-2">
            {possibleTags.map((tag) => (
              <label
                key={tag}
                className={`inline-flex items-center space-x-2 px-3 py-1 border rounded-md cursor-pointer ${
                  darkMode
                    ? reportTags.includes(tag)
                      ? "bg-blue-900 border-blue-700 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    : reportTags.includes(tag)
                    ? "bg-blue-50 border-blue-700 text-blue-800"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={reportTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="hidden"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
