import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

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
    setStatus(parsedReport.reportStatus?.toLowerCase() || "open");
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
    fetch(`/api/v1/reports/${report.reportId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update report status");
        return res.json();
      })
      .then((updatedReport) => {
        console.log("Status updated:", updatedReport);
      })
      .catch((error) => console.error(error));
  }

  // Convert createdAt to a human-readable format
  const createdAtReadable = report?.createdAt
    ? new Date(report.createdAt).toLocaleString()
    : "N/A";

  // Example job post fields
  const jobTitle = jobPostData?.title || "N/A";
  const jobDescription = jobPostData?.description || "N/A";
  const jobStatus = jobPostData?.status || "N/A";
  // If your schema has a `creator` object, you can still reference it if needed:
  // const creator = jobPostData?.creator;

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
        REPORT MANAGER
      </h1>
      <p className="mb-6">
        Welcome, {username || "User"}, manage your reports here.
      </p>

      <div
        className={`p-6 rounded-xl transition-all ease-in-out duration-500 shadow-md ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        {/* --- START: Two-box layout --- */}
        <div className="grid grid-cols-2 gap-4">
          {/* LEFT BOX: Poster Info */}
          <div
            className={`rounded p-4 ${
              darkMode
                ? "border border-gray-700 bg-gray-900"
                : "border border-gray-300 bg-gray-50"
            }`}
          >
            <h2 className="font-bold mb-2">Details Of JobPoster</h2>
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

          {/* RIGHT BOX: Reported User & Report Data */}
          <div
            className={`rounded p-4 ${
              darkMode
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

            <p className="text-sm mb-2">
              <strong>Report ID:</strong> {report?.reportId || "N/A"}
              <br />
              <strong>Status:</strong> {report?.reportStatus || "N/A"}
              <br />
              <strong>Tags:</strong>{" "}
              {report?.reportTags?.length
                ? report.reportTags.join(", ")
                : "None"}
              <br />
              <strong>Created At:</strong> {createdAtReadable}
              <br />
              <strong>Message:</strong> {report?.reportMessage || "N/A"}
            </p>

            <div className="flex justify-start mt-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition">
                Ban
              </button>
            </div>
          </div>
        </div>
        {/* --- END: Two-box layout --- */}

        {/* Additional fields for editing the report itself */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Report Title</label>
          <input
            type="text"
            defaultValue={"Title"}
            className={`w-full rounded p-2 mb-4 focus:outline-none ${
              darkMode
                ? "bg-gray-900 border border-gray-700 text-white"
                : "bg-white border border-gray-300"
            }`}
            placeholder="Enter the report title"
          />

          <label className="block mb-2 font-semibold">Report message</label>
          <textarea
            rows={4}
            defaultValue={report?.reportMessage}
            className={`w-full rounded p-2 focus:outline-none ${
              darkMode
                ? "bg-gray-900 border border-gray-700 text-white"
                : "bg-white border border-gray-300"
            }`}
          />
        </div>

        {/* Manage / Drop actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="space-x-2">
            <button
              className={`px-4 py-2 rounded hover:opacity-90 transition ${
                darkMode ? "bg-green-700 text-white" : "bg-gray-300 text-black"
              }`}
            >
              Managed Report
            </button>
            <button
              className={`px-4 py-2 rounded hover:opacity-90 transition ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
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
            className={`rounded w-full px-3 py-2 focus:outline-none ${
              darkMode
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
            className={`mt-2 px-4 py-2 rounded hover:opacity-90 transition ${
              darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
            }`}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
