import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaCircle } from "react-icons/fa";

export default function AdminReportManagementPopup() {
  const { darkMode } = useContext(ThemeContext);

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

        <div className="justify-items-center">
          <h1
            className={`w-full font-bold rounded p-2 mb-10 focus:outline-none `}
            style={{ textAlign: 'center' }}
          > {report?.reportMessage || "No Title"}</h1>
        </div>

        {/* Title */}
        <div className="">
          <h1
            className={`w-full font-semibold rounded p-2 mb-10 focus:outline-none `}
            style={{ textAlign: 'left' }}
          > User report message: {report && report.reportMessage ? report.reportMessage : 'No message provided'}
          </h1>
        </div>


        {/* Two-box layout */}
        <div className="grid grid-cols-2 gap-4">

          {/* Check if Job post data present and display */}
          {/* LEFT BOX: Job Post Info */}


          {jobPostData && (
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
                <strong>Job Post ID:</strong>{" "}
                {jobPostData?.jobPostId ?? "N/A"}
              </p>
            </div>
          )}

          {/* RIGHT BOX: Reported User & Report Data */}
          <div
            className={`rounded p-4 ${darkMode
              ? "border border-gray-700 bg-gray-900"
              : "border border-gray-300 bg-gray-50"
              }`}
          >
            <h2 className="font-bold mb-2">Details of reported user</h2>

            {userDetails ? (
              <div className="mb-2 text-sm text-gray-500">
                <p>
                  <strong>Reported User ID:</strong>{" "}
                  {userDetails.userId || "N/A"}
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
            ) : (
              <p className="text-sm mb-2">No user data found.</p>
            )}



            <div className="flex justify-start mt-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
                onClick={handleUserBan} >
                Ban
              </button>
            </div>
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



        {/* Manage / Drop actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="space-x-2">
            <button
              className={`px-4 py-2 rounded hover:opacity-90 transition ${darkMode ? "bg-green-700 text-white" : "bg-gray-300 text-black"
                }`}
            >
              Managed Report
            </button>
            <button
              className={`px-4 py-2 rounded hover:opacity-90 transition ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
                }`}
            >
              Drop Report
            </button>
          </div>
        </div>

        {/* Update Status Dropdown */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">ACTION dropdown</label>
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
