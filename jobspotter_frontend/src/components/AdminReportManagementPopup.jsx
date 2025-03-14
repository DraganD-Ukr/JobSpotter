import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaCircle } from "react-icons/fa";
import ReportActionsDropdown from "./ReportActionsDropDown";

export default function AdminReportManagementPopup() {
  const { darkMode } = useContext(ThemeContext);


  // ACTION FORM 
  const [selectedAction, setSelectedAction] = useState(""); // State to track selected action
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
    // Reset visibility of all forms
    setIsEditJobPostFormVisible(false);
    setIsEditApplicantFormVisible(false);
    setIsEditReviewFormVisible(false);
    setIsDeleteJobPostConfirmationVisible(false);
    setIsDeleteApplicantConfirmationVisible(false);
    setIsRemoveReviewConfirmationVisible(false);

    // Show the appropriate form based on the selected action
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

  // Function to handle submitting the edit job post form (will be a separate component later)
  const handleEditJobPostSubmit = (e) => {


    // Ensure event target exists
    if (!e.target) {
      console.error("Event target is undefined!");
      return;
    }
    // Create a FormData object and extract values
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());
    jsonData.maxApplicants = jobPostData.maxApplicants; // Add maxApplicants to the JSON data


    console.log("Editing job post with data:", formData);
    // Make API PUT request to update job post
    fetch(`/api/v1/job-posts/${report.reportedJobPostId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update report status");

        console.log("Job post updated successfully.");

        // Set success message
        setSuccessMessage("Job post updated successfully!");
        setIsSuccessMessageVisible(true);
        setIsEditJobPostFormVisible(false); // Hide the form


      })
      .catch((error) => {
        console.error("Error updating report status:", error.message);
        setErrorMessage("Error updating job post: " + error.message);
        setIsErrorMessageVisible(true);
        // Handle the error appropriately, e.g., show an error message to the user
      });


    // After success, reset form visibility
    setIsEditJobPostFormVisible(false);
  };

  // Function to handle deleting the job post (will be a separate component later)
  const handleDeleteJobPost = () => {
    console.log("Deleting job post:", report.reportedJobPostId);
    // Make API request to delete job post
    fetch(`/api/v1/job-posts/${report.reportedJobPostId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete job post");

        console.log("Job post deleted successfully.");
        // Set success message
        setSuccessMessage("Job post deleted successfully!");
        setIsSuccessMessageVisible(true);
        setIsDeleteJobPostConfirmationVisible(false); // Hide the confirmation
      })
      .catch((error) => {
        console.error("Error deleting job post:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
        setErrorMessage("Error deleting job post: " + error.message);
        setIsErrorMessageVisible(true);
      });
    // After success, reset confirmation visibility
    setIsDeleteJobPostConfirmationVisible(false);
  };

  const handleDeleteApplicant = () => {
    console.log("Deleting applicant:", report.reportedApplicantId);
    // Make API request to delete applicant

    fetch(`/api/v1/job-posts/my-job-posts/${jobPostData.jobPostId}/applicants/${applicantData.applicantId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete applicant");
        console.log("Applicant deleted successfully.");
        // Set success message
        setSuccessMessage("Applicant deleted successfully!");
        setIsSuccessMessageVisible(true);
        setIsDeleteApplicantConfirmationVisible(false); // Hide the confirmation
      })
      .catch((error) => {
        console.error("Error deleting applicant:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
        setErrorMessage("Error deleting applicant: " + error.message);
        setIsErrorMessageVisible(true);
      });
    // After success, reset confirmation visibility
    setIsDeleteApplicantConfirmationVisible(false);
  };

  const handleEditApplicantSubmit = (message) => {
    console.log("Editing applicant with data:", message);
    // Make API request to update applicant
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

        successMessage("Applicant updated successfully!");
        setIsSuccessMessageVisible(true);
        setIsEditApplicantFormVisible(false); // Hide the form
      })
      .catch((error) => {
        console.error("Error updating applicant:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
        setErrorMessage("Error updating applicant: " + error.message);
        setIsErrorMessageVisible(true);
      });

    // After success, reset form visibility
    setIsEditApplicantFormVisible(false);
  };

  const handleEditReviewSubmit = (reviewData) => {
    console.log("Editing review with data:", reviewData);
    // Make API request to update review
    fetch(`/api/v1/reviews/${report.reportedReviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
      credentials: "include",
    })

      .then((res) => {
        if (!res.ok) throw new Error("Failed to update review");
        console.log("Review updated successfully.");
        // Set success message
        setSuccessMessage("Review updated successfully!");
        setIsSuccessMessageVisible(true);
        setIsEditReviewFormVisible(false); // Hide the form
      })
      .catch((error) => {
        console.error("Error updating review:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
        setErrorMessage("Error updating review: " + error.message);
        setIsErrorMessageVisible(true);
      });

    // After success, reset form visibility
    setIsEditReviewFormVisible(false);
  };

  const handleRemoveReview = () => {
    console.log("Removing review:", report.reportedReviewId);
    // Make API request to remove review
    fetch(`/api/v1/reviews/${report.reportedReviewId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove review");
        console.log("Review removed successfully.");
        // Set success message
        setSuccessMessage("Review removed successfully!");
        setIsSuccessMessageVisible(true);
        setIsRemoveReviewConfirmationVisible(false); // Hide the confirmation
      })
      .catch((error) => {
        console.error("Error removing review:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
        setErrorMessage("Error removing review: " + error.message);
        setIsErrorMessageVisible(true);
      });

    // After success, reset confirmation visibility
    setIsRemoveReviewConfirmationVisible(false);
  };












  // We’ll build a local "report" object from the query string
  const [searchParams] = useSearchParams();
  const [report, setReport] = useState({});

  // Store fetched user info here
  const [userDetails, setUserDetails] = useState(null);

  // Additional state
  const [username, setUsername] = useState("");
  const [jobPostData, setJobPostData] = useState(null);
  const [applicantData, setApplicantData] = useState(null); // New state for reported applicant
  const [reportTags, setReportTags] = useState([]);
  const [status, setStatus] = useState(""); // For updating the report’s status

  // 1) Parse the query params
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
    };
    setReport(parsedReport);
    setStatus(parsedReport.reportStatus || "open");
  }, [searchParams]);

  // 2) Fetch logged-in admin info
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

  // 3) If we have a `reportedJobPostId`, fetch that job post
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

  // 4) If we have a `reportedUserId`, fetch that user => store in `userDetails`
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

  // 5) Fetch available report tags
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

  // 6) Update Report Status
  function handleUpdateReportStatus() {
    if (!report?.reportId || !status) return;
    fetch(`/api/v1/reports/${report.reportId}?status=${status.toUpperCase()}`, { // Assuming your backend expects uppercase status
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update report status");
        // Backend doesn't return the updated report, so we update the frontend state directly
        setReport((prevReport) => ({
          ...prevReport,
          reportStatus: status.toUpperCase(), // Use the 'status' from the dropdown
        }));
        setStatus(status.toUpperCase()); // Keep the local 'status' state in sync
        console.log("Status updated successfully (frontend state updated).");
        // You might want to show a success message to the user here
      })
      .catch((error) => {
        console.error("Error updating report status:", error);
        // Handle the error appropriately, e.g., show an error message to the user
      });
  }

  // 7)  Handle User Ban (Disable)
  function handleUserBan() {
    let userId = report?.reportedUserId;
    if (!userId) return;
    fetch(`/api/v1/users/${userId}/disable`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to ban user");
        return res.json();
      })
      .then(() => {
        console.log("Disabled(banned) user:", userId);
      })
      .catch((error) => console.error(error));
  }

  // 8) Fetch reported review if reportedReviewId is present
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

  // 9) Fetch reported applicant if reportedApplicantId is present
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


  // Status colors
  // Helper function to determine icon/color/text for each report status
  function getReportStatusInfo(reportStatus) {
    let statusColor = "text-gray-400";
    let statusText = "N/A";
    let StatusIcon = FaCircle; // Default icon

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



  // Convert createdAt to a human-readable format
  const createdAtReadable = report?.createdAt
    ? new Date(report.createdAt).toLocaleString()
    : "N/A";

  const jobTitle = jobPostData?.title || "N/A";
  const jobDescription = jobPostData?.description || "N/A";
  const jobStatus = jobPostData?.status || "N/A";




  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
    >
      {/* Success message (after action taken) */}
      {isSuccessMessageVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-md shadow-lg z-50">
          {successMessage || "Action completed successfully!"}
        </div>
      )}

      {/* Error message */}
      {isErrorMessageVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-3 px-6 rounded-md shadow-lg z-50">
          {errorMessage || "Error completing action!"}
        </div>
      )}

      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
        REPORT MANAGER
      </h1>
      <p className="mb-6">
        Welcome, {username || "User"}, manage your reports here.
      </p>

      <div
        className={`p-6 rounded-xl transition-all ease-in-out duration-500 shadow-md ${darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
          }`}
      >

        {/* Report Current Status */}

        <div className="mb-4">
          <p className="flex items-center text-md mb-2">
            <strong className="mr-1">Status:</strong>
            <StatusIcon className={`${statusColor} mr-1`} />
            <span className={`${statusColor}`}>{statusText}</span>
          </p>
          {/* Created at */}
          <p className="text-sm text-gray-500">
            <strong>Created At:</strong> {createdAtReadable}
          </p>
        </div>



        {/* Title and message*/}
        <div className="">
          <div className="justify-items-center font-extrabold mb-3 text-2xl">
            <h1 style={{ textAlign: 'center' }}>
              {report.reportTitle ? report.reportTitle : "No Title"}
            </h1>
          </div>

          <h1
            className={`w-full font-normal rounded p-2 mb-10 focus:outline-none `}
            style={{ textAlign: 'left' }}
          > <span className="font-bold">User report message:</span>  {report && report.reportMessage ? report.reportMessage : 'No message provided'}
          </h1>
        </div>


        {/* Two-box layout */}
        <div className="grid grid-cols-2 gap-4">

          {/* Check if Job post data present and display */}
          {/* LEFT BOX: Job Post Info */}


          {jobPostData ? (
            <div
              className={`rounded p-4 ${darkMode
                ? "border border-gray-700 bg-gray-900"
                : "border border-gray-300 bg-gray-50"
                }`}
            >
              <h2 className="font-bold mb-2">Details Of JobPost</h2>
              <p className="text-sm mb-2">
                {/* Removed Poster Name, Poster User ID, and Type */}
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


          {/* RIGHT BOX: Reported User */}
          <div
            className={`rounded p-4 ${darkMode
              ? "border border-gray-700 bg-gray-900"
              : "border border-gray-300 bg-gray-50"
              }`}
          >
            <h2 className="font-bold mb-2">Details of reported user</h2>

            {userDetails ? (
              <>
                <div className="mb-2 text-sm text-gray-500">
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
                    className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
                    onClick={handleUserBan}
                  >
                    Ban
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm mb-2 text-red-600">No user data found.</p>
            )}
          </div>

        </div>
        {/* Two-box layout  */}

        {/* Display Reported Review if ID is present */}
        {report?.reportedReviewId && reportedReview && (
          <div
            className={`rounded p-4 mt-4 ${darkMode ? "border border-gray-700 bg-gray-900" : "border border-gray-300 bg-gray-50"
              }`}
          >
            <h2 className="font-bold mb-2">Details of Reported Review</h2>
            <p className="text-sm mb-2">
              <strong>Review ID:</strong> {reportedReview.reviewId || "N/A"}
              <br />
              <strong>Content:</strong> {reportedReview.content || "N/A"}
              <br />
              {/* Add other relevant review details here */}
              {reportedReview.rating && <strong>Rating:</strong>} {reportedReview.rating || "N/A"}
              {reportedReview.createdAt && (
                <>
                  <br />
                  <strong>Created At:</strong>{" "}
                  {new Date(reportedReview.createdAt).toLocaleString()}
                </>
              )}
              {reportedReview.updatedAt && (
                <>
                  <br />
                  <strong>Updated At:</strong>{" "}
                  {new Date(reportedReview.updatedAt).toLocaleString()}
                </>
              )}
            </p>
            {/* Add any actions related to the review here */}
          </div>
        )}

        {/* Display Reported Applicant if ID is present */}
        {report?.reportedApplicantId && applicantData && (
          <div
            className={`rounded p-4 mt-4 ${darkMode ? "border border-gray-700 bg-gray-900" : "border border-gray-300 bg-gray-50"
              }`}
          >
            <h2 className="font-bold mb-2">Details of Reported Applicant</h2>
            <p className="text-sm mb-2">
              <strong>Applicant ID:</strong> {applicantData.applicantId || "N/A"}
              <br />

              <strong>Applicant Message:</strong> {applicantData.message || "N/A"}
              <br />

              <strong>Applicant Status:</strong> {applicantData.status || "N/A"}

              {/* Add other relevant applicant details here */}
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
            {/* Add any actions related to the applicant here */}
          </div>
        )}





        {/* Action Dropdown */}
        <ReportActionsDropdown report={report} onActionSelect={handleActionSelect} />

        {/* Conditional rendering of forms/confirmations */}

        {/* Edit JobPost action */}
        {isEditJobPostFormVisible ? (
          jobPostData ? (
            <div className="rounded-md shadow-md p-6 bg-white ">
              <h3 className="mb-6">Edit Job Post</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleEditJobPostSubmit(e); }} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    defaultValue={jobPostData?.title}
                    name="title"
                  />
                </div>
                {/* You can add more fields here following the same pattern */}
                <div>
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Description:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    id="description"
                    defaultValue={jobPostData?.description}
                    name="description"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={() => setIsEditJobPostFormVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 bg-white text-red-600 text-center">
              <h3 className="text-lg font-semibold">Job Post Not Found </h3>
              <p className="text-gray-700">The requested job post could not be found.</p>
            </div>
          )
        ) : null}



        {/* Delete JobPost Action */}
        {isDeleteJobPostConfirmationVisible && (
          jobPostData ? (
            <div className="rounded-md shadow-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete Job Post
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete job post ID: {report.reportedJobPostId}?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={handleDeleteJobPost}
                >
                  Yes, Delete
                </button>
                <button
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={() => setIsDeleteJobPostConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 bg-white text-red-600 text-center">
              <h3 className="text-lg font-semibold">Job Post Not Found </h3>
              <p className="text-gray-700">The requested job post could not be found.</p>
            </div>
          )
        )}


        {/* Edit applicant message */}
        {isEditApplicantFormVisible ? (
          applicantData ? (
            <div className="rounded-md shadow-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Applicant Message
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); handleEditApplicantSubmit(/* Form Data */); }} className="space-y-4">
                <div>
                  <label htmlFor="applicant-message" className="block text-gray-700 text-sm font-bold mb-2">
                    Message:
                  </label>
                  <textarea
                    id="applicant-message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    defaultValue={applicantData?.message}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    onClick={() => setIsEditApplicantFormVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 bg-white">
              <p className="text-red-500 font-semibold">
                The applicant could not be found.
              </p>
            </div>
          )
        ) : null}

        {/* Delete applicant confirmation */}
        {isDeleteApplicantConfirmationVisible ? (
          applicantData ? (
            <div className="rounded-md shadow-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete Applicant
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete applicant ID: {report.reportedApplicantId}?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={handleDeleteApplicant}
                >
                  Yes, Delete
                </button>
                <button
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={() => setIsDeleteApplicantConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 bg-white">
              <p className="text-red-500 font-semibold">
                The applicant could not be found.
              </p>
            </div>
          )
        ) : null}


        {/* Edit review form */}
        {isEditReviewFormVisible ? (
          reportedReview ? (
            <div className="rounded-md shadow-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Review
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); handleEditReviewSubmit(/* Form Data */); }} className="space-y-4">
                <div>
                  <label htmlFor="review-content" className="block text-gray-700 text-sm font-bold mb-2">
                    Content:
                  </label>
                  <textarea
                    id="review-content"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    defaultValue={reportedReview?.content}
                  />
                </div>
                <div>
                  <label htmlFor="review-rating" className="block text-gray-700 text-sm font-bold mb-2">
                    Rating:
                  </label>
                  <input
                    type="number"
                    id="review-rating"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={reportedReview?.rating}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    onClick={() => setIsEditReviewFormVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 bg-white">
              <p className="text-red-500 font-semibold">
                The review could not be found.
              </p>
            </div>
          )
        ) : null}


        {/* Remove review confirmation */}
        {isRemoveReviewConfirmationVisible ? (
          report.reportedReviewId ? (
            <div className="rounded-md shadow-md p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Remove Review
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to remove review ID: {report.reportedReviewId}?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={handleRemoveReview}
                >
                  Yes, Remove
                </button>
                <button
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={() => setIsRemoveReviewConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow-md p-6 bg-white">
              <p className="text-red-500 font-semibold">
                The review could not be found.
              </p>
            </div>
          )
        ) : null}




        {/* Update Status Dropdown */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Status Update</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`rounded w-full px-3 py-2 focus:outline-none ${darkMode
              ? "bg-gray-900 border border-gray-700 text-white"
              : "bg-white border border-gray-300"
              }`}
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
            className={`mt-2 px-4 py-2 rounded hover:opacity-90 transition ${darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
              }`}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
