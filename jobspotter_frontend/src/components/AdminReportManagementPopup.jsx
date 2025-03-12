import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function AdminReportManagementPopup({ report }) {
  const { darkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [jobPostData, setJobPostData] = useState(null);
  const [reportedUserData, setReportedUserData] = useState(null);
  const [reportTags, setReportTags] = useState([]);
  const [status, setStatus] = useState("");

  // Fetch logged-in admin info
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
      .catch((error) => {});
  }, []);

  // Fetch job post and reported user details based on report prop
  useEffect(() => {
    if (report?.reportedJobPostId) {
      fetch(`/api/v1/job-posts/${report.reportedJobPostId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("");
          return res.json();
        })
        .then((data) => setJobPostData(data))
        .catch((error) => {});
    }
    if (report?.reportedUserId) {
      fetch(`/api/v1/users/${report.reportedUserId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("");
          return res.json();
        })
        .then((data) => setReportedUserData(data))
        .catch((error) => {});
    }
  }, [report]);

  // Fetch available report tags
  useEffect(() => {
    fetch("/api/v1/reports/report-tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("");
        return res.json();
      })
      .then((data) => setReportTags(data))
      .catch((error) => {});
  }, []);

  // Update report status
  function handleUpdateReportStatus() {
    if (!report?.reportId || !status) return;
    fetch(`/api/v1/reports/${report.reportId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("");
        return res.json();
      })
      .then(() => {})
      .catch((error) => {});
  }

  const creatorFullName = jobPostData?.creator
    ? [jobPostData.creator.firstName, jobPostData.creator.lastName]
        .filter(Boolean)
        .join(" ")
    : "";

  const reportedUserFullName = reportedUserData
    ? [reportedUserData.firstName, reportedUserData.lastName]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">REPORT MANAGER</h1>
      <p className="mb-6">Welcome, {username || "User"}, Manage your reports here.</p>
      <div
        className={`p-6 rounded-xl transition-all ease-in-out duration-500 shadow-md ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`rounded p-4 ${
              darkMode ? "border border-gray-700 bg-gray-900" : "border border-gray-300 bg-gray-50"
            }`}
          >
            <h2 className="font-bold mb-2">Details Of Poster</h2>
            <p className="text-sm mb-2">
              <strong>Name:</strong>{" "}
              {creatorFullName || jobPostData?.creator?.username || "N/A"}
              <br />
              <strong>User ID:</strong>{" "}
              {jobPostData?.creator?.userId ?? "N/A"}
              <br />
              <strong>Job Post ID:</strong>{" "}
              {jobPostData?.jobPostId ?? "N/A"}
            </p>
          </div>
          <div
            className={`rounded p-4 ${
              darkMode ? "border border-gray-700 bg-gray-900" : "border border-gray-300 bg-gray-50"
            }`}
          >
            <h2 className="font-bold mb-2">Details of reported user</h2>
            <p className="text-sm mb-2">
              <strong>Name:</strong>{" "}
              {reportedUserFullName || reportedUserData?.username || "N/A"}
              <br />
              <strong>User ID:</strong>{" "}
              {reportedUserData?.userId ?? "N/A"}
              <br />
              <strong>Reported Job Post ID:</strong>{" "}
              {report?.reportedJobPostId || "N/A"}
            </p>
            <div className="flex justify-between">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition">
                Ban
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Report Title</label>
          <input
            type="text"
            className={`w-full rounded p-2 mb-4 focus:outline-none ${
              darkMode ? "bg-gray-900 border border-gray-700 text-white" : "bg-white border border-gray-300"
            }`}
            placeholder="Enter the report title"
          />
          <label className="block mb-2 font-semibold">Report message</label>
          <textarea
            rows={4}
            className={`w-full rounded p-2 focus:outline-none ${
              darkMode ? "bg-gray-900 border border-gray-700 text-white" : "bg-white border border-gray-300"
            }`}
            placeholder="Enter the report details here"
          ></textarea>
        </div>
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
        <div className="mt-6">
          <label className="block mb-2 font-semibold">ACTION dropdown</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`rounded w-full px-3 py-2 focus:outline-none ${
              darkMode ? "bg-gray-900 border border-gray-700 text-white" : "bg-white border border-gray-300"
            }`}
          >
            <option>OPEN</option>
            <option>UNDER_REVIEW</option>
            <option>PENDING_RESPONSE</option>
            <option>RESOLVED</option>
            <option>REJECTED</option>
            <option>ACTION_TAKEN</option>
            <option>ESCALATED</option>
            <option>ON_HOLD</option>
            <option>AUTO_RESOLVED</option>
          </select>
          <button onClick={handleUpdateReportStatus}>Update Status</button>
        </div>
      </div>
    </div>
  );
}
