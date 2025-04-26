import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export function UserReportFormPopup() {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Fields for the report
  const [reportedUserId, setReportedUserId] = useState("");
  const [reportedJobPostId, setReportedJobPostId] = useState("");
  const [reportedApplicantId, setReportedApplicantId] = useState("");
  const [reportedReviewId, setReportedReviewId] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportTags, setReportTags] = useState([]);

  // UI feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetched user details
  const [userDetails, setUserDetails] = useState(null);

  // Possible tags
  const possibleTags = [
    "IMPERSONATION",
    "SPAM",
    "INAPPROPRIATE_CONTENT",
    "DISCRIMINATION",
    "POLICY_VIOLATION",
    "OTHER",
  ];

  // 1) Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const jobId = params.get("jobId");
    const userId = params.get("reportedUserId"); // must be exactly ?reportedUserId=...
    const applicantId = params.get("applicantId");
    const reviewId = params.get("reviewId");

    console.log("Parsed reportedUserId:", userId);

    if (jobId) setReportedJobPostId(jobId);
    if (userId) setReportedUserId(userId);
    if (applicantId) setReportedApplicantId(applicantId);
    if (reviewId) setReportedReviewId(reviewId);
  }, [location]);

  // 2) Fetch user info
  useEffect(() => {
    if (!reportedUserId) {
      setUserDetails(null);
      return;
    }

    fetch(`/api/v1/users/${reportedUserId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching user details.");
        }
        return res.json();
      })
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error(error);
        setUserDetails(null);
      });
  }, [reportedUserId]);

  // Toggle selected tags
  const handleTagChange = (tag) => {
    setReportTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // 3) Submit => POST /api/v1/reports
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Build payload
    const payload = {
      reportedUserId,
      reportedJobPostId,
      reportedApplicantId,
      reportedReviewId,
      reportMessage,
      reportTitle,
      reportTags,
    };

    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch("/api/v1/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error creating report: ${response.statusText}`);
      }

      // Clear fields
      setReportedUserId("");
      setReportedJobPostId("");
      setReportedApplicantId("");
      setReportedReviewId("");
      setReportMessage("");
      setReportTags([]);
      setSuccessMessage("Report created successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  // 4: Redirect after success message is shown
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate(-1); // Go back to the previous page
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [successMessage, navigate]);

  return (
    <div
      className={`my-6 xs:my-8 sm:my-10 main-content min-h-screen p-2 xs:p-4 sm:p-6 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <h1
        className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-5 sm:mb-6 ${
          darkMode ? "text-green-400" : "text-green-600"
        }`}
      >
        Create a Report
      </h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
          <FaExclamationTriangle className="mr-1 xs:mr-2 sm:mr-2 text-red-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
          <div>
            <p className="font-bold text-xs xs:text-sm sm:text-sm">Error:</p>
            <p className="text-xs xs:text-sm sm:text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
          <FaCheckCircle className="mr-1 xs:mr-2 sm:mr-2 text-green-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
          <div className="text-xs xs:text-sm sm:text-sm">{successMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
        {/* reportedUserId */}
        <div>
          <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base" htmlFor="reportedUserId">
            reported UserId
          </label>
          <input
            type="text"
            id="reportedUserId"
            value={reportedUserId}
            readOnly={reportedUserId !== ""} 
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md focus:outline-none text-xs xs:text-sm sm:text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            } ${reportedUserId !== "" ? "cursor-not-allowed bg-gray-300 text-gray-500" : ""}`}
          />
          {userDetails && (
            <div className="mt-1 xs:mt-2 sm:mt-2 text-xs xs:text-sm sm:text-sm text-gray-500">
              <p>
                <strong>First Name:</strong> {userDetails.firstName || "N/A"}
              </p>
              <p>
                <strong>Last Name:</strong> {userDetails.lastName || "N/A"}
              </p>
              <p>
                <strong>Username:</strong> {userDetails.username || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email || "N/A"}
              </p>
            </div>
          )}
        </div>

        {/* reportedJobPostId */}
        <div>
          <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base" htmlFor="reportedJobPostId">
            reportedJobPostId
          </label>
          <input
            type="text"
            id="reportedJobPostId"
            value={reportedJobPostId}
            readOnly={reportedJobPostId !== ""} 
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md focus:outline-none text-xs xs:text-sm sm:text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            } ${reportedUserId !== "" ? "cursor-not-allowed caret-transparent bg-gray-300 text-gray-500" : ""}`}
          />
        </div>

        {/* reportedApplicantId */}
        <div>
          <label
            className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base"
            htmlFor="reportedApplicantId"
          >
            reportedApplicantId
          </label>
          <input
            type="text"
            id="reportedApplicantId"
            value={reportedApplicantId}
            readOnly
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md focus:outline-none text-xs xs:text-sm sm:text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            } ${reportedUserId !== "" ? "cursor-not-allowed caret-transparent bg-gray-300 text-gray-500" : ""}`}
          />
        </div>

        {/* reportedReviewId */}
        <div>
          <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base" htmlFor="reportedReviewId">
            reportedReviewId
          </label>
          <input
            type="text"
            id="reportedReviewId"
            value={reportedReviewId}
            readOnly
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md focus:outline-none text-xs xs:text-sm sm:text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            } ${reportedUserId !== "" ? "cursor-not-allowed caret-transparent bg-gray-300 text-gray-500" : ""}`}
          />
        </div>

        {/* Report Title */}
        <div>
          <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base" htmlFor="reportTitle">
            Report Title (Short description)
          </label>
          <textarea
            id="reportTitle"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            rows={4}
            required
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md focus:outline-none resize-none text-xs xs:text-sm sm:text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Report message */}
        <div>
          <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base" htmlFor="reportMessage">
            Report Message (Describe the issue)
          </label>
          <textarea
            id="reportMessage"
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
            rows={4}
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 border rounded-md focus:outline-none resize-none text-xs xs:text-sm sm:text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* reportTags */}
        <div>
          <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base">
            reportTags
          </label>
          <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-2">
            {possibleTags.map((tag) => (
              <label
                key={tag}
                className={`inline-flex items-center space-x-1 xs:space-x-2 sm:space-x-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-1 sm:py-1 border rounded-md cursor-pointer text-xs xs:text-sm sm:text-sm ${
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
        <div className="flex justify-end mt-2 xs:mt-3 sm:mt-4">
          <button
            type="submit"
            className="px-4 xs:px-5 sm:px-5 py-1 xs:py-2 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-sm"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserReportFormPopup;