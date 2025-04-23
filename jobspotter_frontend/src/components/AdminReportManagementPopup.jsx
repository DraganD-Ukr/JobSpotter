import { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaCircle } from "react-icons/fa";
import ReportActionsDropdown from "./ReportActionsDropDown";

export default function AdminReportManagementPopup() {
  const { darkMode } = useContext(ThemeContext);

  // ACTION FORM
  const [selectedAction, setSelectedAction] = useState("");
  const [isEditJobPostFormVisible, setIsEditJobPostFormVisible] = useState(false);
  const [isEditApplicantFormVisible, setIsEditApplicantFormVisible] = useState(false);
  const [isEditReviewFormVisible, setIsEditReviewFormVisible] = useState(false);
  const [isDeleteJobPostConfirmationVisible, setIsDeleteJobPostConfirmationVisible] = useState(false);
  const [isDeleteApplicantConfirmationVisible, setIsDeleteApplicantConfirmationVisible] = useState(false);
  const [isRemoveReviewConfirmationVisible, setIsRemoveReviewConfirmationVisible] = useState(false);

  // Additional state for success message
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setIsEditJobPostFormVisible(false);
    setIsEditApplicantFormVisible(false);
    setIsEditReviewFormVisible(false);
    setIsDeleteJobPostConfirmationVisible(false);
    setIsDeleteApplicantConfirmationVisible(false);
    setIsRemoveReviewConfirmationVisible(false);

    switch (action) {
      case "editJobPost":
        setIsEditJobPostFormVisible(true);
        break;
      case "editApplicant":
        setIsEditApplicantFormVisible(true);
        break;
      case "editReview":
        setIsEditReviewFormVisible(true);
        break;
      case "deleteJobPost":
        setIsDeleteJobPostConfirmationVisible(true);
        break;
      case "deleteApplicant":
        setIsDeleteApplicantConfirmationVisible(true);
        break;
      case "removeReview":
        setIsRemoveReviewConfirmationVisible(true);
        break;
      default:
        break;
    }
  };

  const handleEditJobPostSubmit = (e) => {
    if (!e.target) {
      console.error("Event target is undefined!");
      return;
    }
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());
    jsonData.maxApplicants = jobPostData.maxApplicants;

    console.log("Editing job post with data:", formData);
    fetch(`/api/v1/job-posts/${report.reportedJobPostId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update report status");
        console.log("Job post updated successfully.");
        setSuccessMessage("Job post updated successfully!");
        setIsSuccessMessageVisible(true);
        setIsEditJobPostFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating report status:", error.message);
        setErrorMessage("Error updating job post: " + error.message);
        setIsErrorMessageVisible(true);
      });
    setIsEditJobPostFormVisible(false);
  };

  const handleDeleteJobPost = () => {
    console.log("Deleting job post:", report.reportedJobPostId);
    fetch(`/api/v1/job-posts/${report.reportedJobPostId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete job post");
        console.log("Job post deleted successfully.");
        setSuccessMessage("Job post deleted successfully!");
        setIsSuccessMessageVisible(true);
        setIsDeleteJobPostConfirmationVisible(false);
      })
      .catch((error) => {
        console.error("Error deleting job post:", error.message);
        setErrorMessage("Error deleting job post: " + error.message);
        setIsErrorMessageVisible(true);
      });
    setIsDeleteJobPostConfirmationVisible(false);
  };

  const handleDeleteApplicant = () => {
    console.log("Deleting applicant:", report.reportedApplicantId);
    fetch(`/api/v1/job-posts/my-job-posts/${jobPostData.jobPostId}/applicants/${applicantData.applicantId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete applicant");
        console.log("Applicant deleted successfully.");
        setSuccessMessage("Applicant deleted successfully!");
        setIsSuccessMessageVisible(true);
        setIsDeleteApplicantConfirmationVisible(false);
      })
      .catch((error) => {
        console.error("Error deleting applicant:", error.message);
        setErrorMessage("Error deleting applicant: " + error.message);
        setIsErrorMessageVisible(true);
      });
    setIsDeleteApplicantConfirmationVisible(false);
  };

  const handleEditApplicantSubmit = (message) => {
    console.log("Editing applicant with data:", message);
    if (!jobPostData || !jobPostData.jobPostId || !applicantData || !applicantData.applicantId) {
      console.error("Missing job post or applicant data.");
      return;
    }
    fetch(`/api/v1/job-posts/job-post-worked-on/${jobPostData.jobPostId}/applicants/${applicantData.applicantId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update applicant");
        console.log("Applicant updated successfully.");
        setSuccessMessage("Applicant updated successfully!");
        setIsSuccessMessageVisible(true);
        setIsEditApplicantFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating applicant:", error.message);
        setErrorMessage("Error updating applicant: " + error.message);
        setIsErrorMessageVisible(true);
      });
    setIsEditApplicantFormVisible(false);
  };

  const handleEditReviewSubmit = (reviewData) => {
    console.log("Editing review with data:", reviewData);
    fetch(`/api/v1/reviews/${report.reportedReviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update review");
        console.log("Review updated successfully.");
        setSuccessMessage("Review updated successfully!");
        setIsSuccessMessageVisible(true);
        setIsEditReviewFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating review:", error.message);
        setErrorMessage("Error updating review: " + error.message);
        setIsErrorMessageVisible(true);
      });
    setIsEditReviewFormVisible(false);
  };

  const handleRemoveReview = () => {
    console.log("Removing review:", report.reportedReviewId);
    fetch(`/api/v1/reviews/${report.reportedReviewId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove review");
        console.log("Review removed successfully.");
        setSuccessMessage("Review removed successfully!");
        setIsSuccessMessageVisible(true);
        setIsRemoveReviewConfirmationVisible(false);
      })
      .catch((error) => {
        console.error("Error removing review:", error.message);
        setErrorMessage("Error removing review: " + error.message);
        setIsErrorMessageVisible(true);
      });
    setIsRemoveReviewConfirmationVisible(false);
  };

  const [searchParams] = useSearchParams();
  const [report, setReport] = useState({});
  const [userDetails, setUserDetails] = useState(null);

  const [username, setUsername] = useState("");
  const [jobPostData, setJobPostData] = useState(null);
  const [applicantData, setApplicantData] = useState(null);
  const [reportTags, setReportTags] = useState([]);
  const [status, setStatus] = useState("");

  const [reportedReview, setReportedReview] = useState(null);

  useEffect(() => {
    const parsedReport = {
      reportId: searchParams.get("reportId"),
      reportedUserId: searchParams.get("reportedUserId"),
      reportedJobPostId: searchParams.get("reportedJobPostId"),
      reportedApplicantId: searchParams.get("reportedApplicantId"),
      reportedReviewId: searchParams.get("reportedReviewId"),
      reportMessage: searchParams.get("reportMessage"),
      reportTags: searchParams.get("reportTags")?.split(",") || [],
      reportStatus: searchParams.get("reportStatus") || "",
      createdAt: searchParams.get("createdAt"),
      // ADDED: to show the reportTitle if present
      reportTitle: searchParams.get("reportTitle"),
    };
    setReport(parsedReport);
    setStatus(parsedReport.reportStatus || "open");
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username || "");
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (report?.reportedJobPostId) {
      fetch(`/api/v1/job-posts/${report.reportedJobPostId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch job post");
          return res.json();
        })
        .then((data) => setJobPostData(data))
        .catch((error) => console.error(error));
    }
  }, [report.reportedJobPostId]);

  useEffect(() => {
    if (report?.reportedUserId) {
      fetch(`/api/v1/users/${report.reportedUserId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => setUserDetails(data))
        .catch((error) => console.error(error));
    }
  }, [report.reportedUserId]);

  useEffect(() => {
    fetch("/api/v1/reports/report-tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch report tags");
        return res.json();
      })
      .then((data) => setReportTags(data))
      .catch((error) => console.error(error));
  }, []);

  function handleUpdateReportStatus() {
    if (!report?.reportId || !status) return;
    fetch(`/api/v1/reports/${report.reportId}?status=${status.toUpperCase()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update report status");
        setReport((prevReport) => ({
          ...prevReport,
          reportStatus: status.toUpperCase(),
        }));
        setStatus(status.toUpperCase());
        console.log("Status updated successfully (frontend state updated).");
      })
      .catch((error) => {
        console.error("Error updating report status:", error);
      });
  }

  function handleUserDisable() {
    let userId = report?.reportedUserId;
    if (!userId) return;
    fetch(`/api/v1/users/${userId}/disable`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to disable user");
        return res.json();
      })
      .then(() => {
        console.log("Disabled user:", userId);
        setSuccessMessage("User disabled successfully!");
        setIsSuccessMessageVisible(true);
      })
      .catch((error) => {
        console.error("Error disabling user:", error);
        setErrorMessage("Error disabling user: " + error.message);
        setIsErrorMessageVisible(true);
      });
  }

  useEffect(() => {
    if (report?.reportedReviewId) {
      fetch(`/api/v1/reviews/${report.reportedReviewId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch reported review");
          return res.json();
        })
        .then((data) => setReportedReview(data))
        .catch((error) => console.error(error));
    }
  }, [report.reportedReviewId]);

  useEffect(() => {
    if (report?.reportedApplicantId) {
      fetch(`/api/v1/job-posts/applicants/${report.reportedApplicantId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch reported applicant");
          return res.json();
        })
        .then((data) => setApplicantData(data))
        .catch((error) => console.error(error));
    }
  }, [report.reportedApplicantId]);

  function getReportStatusInfo(reportStatus) {
    let statusColor = "text-gray-400";
    let statusText = "N/A";
    let StatusIcon = FaCircle;

    switch (reportStatus) {
      case "OPEN":
      case "Open":
        statusColor = "text-green-500";
        statusText = "Open";
        break;
      case "UNDER_REVIEW":
      case "Under Review":
      case "under_review":
        statusColor = "text-yellow-500";
        statusText = "Under Review";
        break;
      case "PENDING_RESPONSE":
      case "Pending Response":
        statusColor = "text-orange-500";
        statusText = "Pending Response";
        break;
      case "RESOLVED":
      case "Resolved":
        statusColor = "text-blue-500";
        statusText = "Resolved";
        break;
      case "REJECTED":
      case "Rejected":
        statusColor = "text-red-500";
        statusText = "Rejected";
        break;
      case "ACTION_TAKEN":
      case "Action Taken":
        statusColor = "text-green-600";
        statusText = "Action Taken";
        break;
      case "ESCALATED":
      case "Escalated":
        statusColor = "text-purple-500";
        statusText = "Escalated";
        break;
      case "ON_HOLD":
      case "On Hold":
        statusColor = "text-indigo-500";
        statusText = "On Hold";
        break;
      case "AUTO_RESOLVED":
      case "Auto Resolved":
        statusColor = "text-teal-500";
        statusText = "Auto Resolved";
        break;
      default:
        statusColor = "text-gray-400";
        statusText = "N/A";
    }
    return { statusColor, statusText, StatusIcon };
  }

  const { statusColor, statusText, StatusIcon } = getReportStatusInfo(report.reportStatus);
  const createdAtReadable = report?.createdAt
    ? new Date(report.createdAt).toLocaleString()
    : "N/A";

  const jobTitle = jobPostData?.title || "N/A";
  const jobDescription = jobPostData?.description || "N/A";
  const jobStatus = jobPostData?.status || "N/A";

  return (
    <div
      className={`
        my-10 main-content min-h-screen p-4 border rounded-4xl 
        transition-all ease-in-out duration-500
        ${darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700"
          : "bg-gradient-to-br from-white to-gray-100 text-black border-gray-200"
        }
      `}
    >
      {isSuccessMessageVisible && (
        <div
          className="
            fixed top-4 left-1/2 transform -translate-x-1/2 
            bg-green-600 text-white py-3 px-6 rounded-md shadow-lg z-50
          "
        >
          {successMessage || "Action completed successfully!"}
        </div>
      )}

      {isErrorMessageVisible && (
        <div
          className="
            fixed top-4 left-1/2 transform -translate-x-1/2 
            bg-red-600 text-white py-3 px-6 rounded-md shadow-lg z-50
          "
        >
          {errorMessage || "Error completing action!"}
        </div>
      )}

      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
        REPORT MANAGER
      </h1>
      <p className="mb-6 text-lg">
        Welcome, {username || "User"}, manage your reports here.
      </p>

      <div
        className={`
          p-6 rounded-xl transition-all ease-in-out duration-500 shadow-md
          ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}
        `}
      >
        {/* Current Status */}
        <div className="mb-4">
          <p className="flex items-center text-md mb-2">
            <strong className="mr-1">Status:</strong>
            <StatusIcon className={`${statusColor} mr-1`} />
            <span className={`${statusColor}`}>{statusText}</span>
          </p>
          <p className="text-sm text-gray-500">
            <strong>Created At:</strong> {createdAtReadable}
          </p>
        </div>

        {/* Title Box */}
        <div className="mb-4">
          <h2 className="text-center font-bold text-xl">
            Title
          </h2>
        </div>

        {/* User report message box */}
        <div
          className={`
            rounded p-4 mb-6
            ${darkMode ? "border border-gray-700 bg-gray-900" : "border border-gray-300 bg-gray-50"}
          `}
        >
          {/* The Title is back here above the message */}
          {report.reportTitle && (
            <div className="text-center font-extrabold mb-3 text-2xl">
              {report.reportTitle}
            </div>
          )}
          <p className="text-sm">
            <span className="font-bold">User report message:</span>{" "}
            {report && report.reportMessage ? report.reportMessage : "No message provided"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {jobPostData ? (
            <div
              className={`
                rounded p-4 
                ${darkMode
                  ? "border border-gray-700 bg-gray-900"
                  : "border border-gray-300 bg-gray-50"
                }
              `}
            >
              <h2 className="font-bold mb-2 text-lg">Details Of JobPost</h2>
              <p className="text-sm mb-2">
                <strong>Title:</strong> {jobTitle}
                <br />
                <strong>Description:</strong> {jobDescription}
                <br />
                <strong>Status:</strong> {jobStatus}
                <br />
                <strong>Job Post ID:</strong> {jobPostData?.jobPostId ?? "N/A"}
              </p>
            </div>
          ) : (
            <div className="rounded p-4 border border-gray-300 bg-gray-50 text-red-600 text-center">
              <h2 className="font-bold text-lg">Job Post Not Found</h2>
              <p className="text-sm">The requested job post could not be found.</p>
            </div>
          )}

          <div
            className={`
              rounded p-4 
              ${darkMode
                ? "border border-gray-700 bg-gray-900"
                : "border border-gray-300 bg-gray-50"
              }
            `}
          >
            <h2 className="font-bold mb-2 text-lg">Details of reported user</h2>
            {userDetails ? (
              <>
                <div className="mb-2 text-sm text-gray-400">
                  <p>
                    <strong>Reported User ID:</strong> {userDetails.userId || "N/A"}
                  </p>
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

                <div className="flex justify-start mt-2">
                  <button
                    className="
                      bg-red-600 text-white px-4 py-2 rounded 
                      hover:opacity-90 transition
                    "
                    onClick={handleUserDisable}
                  >
                    Disable
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm mb-2 text-red-600">No user data found.</p>
            )}
          </div>
        </div>

        {report?.reportedReviewId && reportedReview && (
          <div
            className={`
              rounded p-4 mt-4 
              ${darkMode
                ? "border border-gray-700 bg-gray-900"
                : "border border-gray-300 bg-gray-50"
              }
            `}
          >
            <h2 className="font-bold mb-2 text-lg">Details of Reported Review</h2>
            <p className="text-sm mb-2">
              <strong>Review ID:</strong> {reportedReview.reviewId || "N/A"}
              <br />
              <strong>Content:</strong> {reportedReview.content || "N/A"}
              <br />
              {reportedReview.rating && (
                <>
                  <strong>Rating:</strong> {reportedReview.rating}
                  <br />
                </>
              )}
              {reportedReview.createdAt && (
                <>
                  <strong>Created At:</strong>{" "}
                  {new Date(reportedReview.createdAt).toLocaleString()}
                  <br />
                </>
              )}
              {reportedReview.updatedAt && (
                <>
                  <strong>Updated At:</strong>{" "}
                  {new Date(reportedReview.updatedAt).toLocaleString()}
                </>
              )}
            </p>
          </div>
        )}

        {report?.reportedApplicantId && applicantData && (
          <div
            className={`
              rounded p-4 mt-4 
              ${darkMode
                ? "border border-gray-700 bg-gray-900"
                : "border border-gray-300 bg-gray-50"
              }
            `}
          >
            <h2 className="font-bold mb-2 text-lg">Details of Reported Applicant</h2>
            <p className="text-sm mb-2">
              <strong>Applicant ID:</strong> {applicantData.applicantId || "N/A"}
              <br />
              <strong>Applicant Message:</strong> {applicantData.message || "N/A"}
              <br />
              <strong>Applicant Status:</strong> {applicantData.status || "N/A"}
              {applicantData.dateApplied && (
                <>
                  <br />
                  <strong>Created At:</strong>{" "}
                  {new Date(applicantData.dateApplied).toLocaleString()}
                </>
              )}
              {applicantData.dateUpdated && (
                <>
                  <br />
                  <strong>Updated At:</strong>{" "}
                  {new Date(applicantData.dateUpdated).toLocaleString()}
                </>
              )}
            </p>
          </div>
        )}

        <ReportActionsDropdown report={report} onActionSelect={handleActionSelect} />

        {/* Edit JobPost form */}
        {isEditJobPostFormVisible ? (
          jobPostData ? (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <h3 className="mb-6 text-xl font-semibold">Edit Job Post</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditJobPostSubmit(e);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title:
                  </label>
                  <input
                    className="
                      shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                    "
                    id="title"
                    type="text"
                    defaultValue={jobPostData?.title}
                    name="title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description:
                  </label>
                  <textarea
                    className="
                      shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none
                    "
                    id="description"
                    defaultValue={jobPostData?.description}
                    name="description"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="
                      px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                    "
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="
                      px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                    "
                    onClick={() => setIsEditJobPostFormVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white text-red-600 text-center">
              <h3 className="text-lg font-semibold">Job Post Not Found</h3>
              <p className="text-gray-700">The requested job post could not be found.</p>
            </div>
          )
        ) : null}

        {/* Delete JobPost confirmation */}
        {isDeleteJobPostConfirmationVisible && (
          jobPostData ? (
            <div className="rounded-md shadow with-shadow-md p-6 mt-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete Job Post
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete job post ID: {report.reportedJobPostId}?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="
                    px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                  "
                  onClick={handleDeleteJobPost}
                >
                  Yes, Delete
                </button>
                <button
                  className="
                    px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                  "
                  onClick={() => setIsDeleteJobPostConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white text-red-600 text-center">
              <h3 className="text-lg font-semibold">Job Post Not Found </h3>
              <p className="text-gray-700">The requested job post could not be found.</p>
            </div>
          )
        )}

        {/* Edit applicant form */}
        {isEditApplicantFormVisible ? (
          applicantData ? (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Applicant Message
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditApplicantSubmit(/* Form Data */);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="applicant-message"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Message:
                  </label>
                  <textarea
                    id="applicant-message"
                    className="
                      shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none
                    "
                    defaultValue={applicantData?.message}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="
                      px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                    "
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="
                      px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                    "
                    onClick={() => setIsEditApplicantFormVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <p className="text-red-500 font-semibold">
                The applicant could not be found.
              </p>
            </div>
          )
        ) : null}

        {/* Delete applicant confirmation */}
        {isDeleteApplicantConfirmationVisible ? (
          applicantData ? (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete Applicant
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete applicant ID: {report.reportedApplicantId}?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="
                    px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                  "
                  onClick={handleDeleteApplicant}
                >
                  Yes, Delete
                </button>
                <button
                  className="
                    px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                  "
                  onClick={() => setIsDeleteApplicantConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <p className="text-red-500 font-semibold">
                The applicant could not be found.
              </p>
            </div>
          )
        ) : null}

        {/* Edit review form */}
        {isEditReviewFormVisible ? (
          reportedReview ? (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Review
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditReviewSubmit(/* Form Data */);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="review-content"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Content:
                  </label>
                  <textarea
                    id="review-content"
                    className="
                      shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none
                    "
                    defaultValue={reportedReview?.content}
                  />
                </div>
                <div>
                  <label
                    htmlFor="review-rating"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Rating:
                  </label>
                  <input
                    type="number"
                    id="review-rating"
                    className="
                      shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                    "
                    defaultValue={reportedReview?.rating}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="
                      px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                    "
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="
                      px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                    "
                    onClick={() => setIsEditReviewFormVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <p className="text-red-500 font-semibold">
                The review could not be found.
              </p>
            </div>
          )
        ) : null}

        {/* Remove review confirmation */}
        {isRemoveReviewConfirmationVisible ? (
          report.reportedReviewId ? (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Remove Review
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to remove review ID: {report.reportedReviewId}?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="
                    px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                  "
                  onClick={handleRemoveReview}
                >
                  Yes, Remove
                </button>
                <button
                  className="
                    px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                  "
                  onClick={() => setIsRemoveReviewConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 mt-6 bg-white">
              <p className="text-red-500 font-semibold">
                The review could not be found.
              </p>
            </div>
          )
        ) : null}

        {/* Update Status Dropdown */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold text-lg">Status Update</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`
              rounded w-full px-3 py-2 focus:outline-none
              ${darkMode
                ? "bg-gray-900 border border-gray-700 text-white"
                : "bg-white border border-gray-300"
              }
            `}
          >
            <option value="open">Open</option>
            <option value="under_review">Under Review</option>
            <option value="pending_response">Pending Response</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
            <option value="action_taken">Action Taken</option>
            <option value="escalated">Escalated</option>
            <option value="on_hold">On Hold</option>
            <option value="auto_resolved">Auto Resolved</option>
          </select>

          <button
            onClick={handleUpdateReportStatus}
            className={`
              mt-2 px-4 py-2 rounded hover:opacity-90 transition
              ${darkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              }
            `}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}