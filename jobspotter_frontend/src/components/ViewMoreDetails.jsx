import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaTag,
  FaUserCheck,
  FaUserTimes,
  FaUserClock
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { BeatLoader } from "react-spinners";
import { ThemeContext } from "./ThemeContext";
import ApplicantsManagementPopup from "./ApplicantsManagementPopup";

export function ViewMoreDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [errorBoxOpacity, setErrorBoxOpacity] = useState(0);
  const [successBoxOpacity, setSuccessBoxOpacity] = useState(0);
  const [autoStartMessage, setAutoStartMessage] = useState("");
  const [isApplicantsPopupVisible, setIsApplicantsPopupVisible] = useState(false);
  const [applicantCounts, setApplicantCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0
  });
  const [localApplicants, setLocalApplicants] = useState([]);

  const { darkMode } = useContext(ThemeContext);
  const [tagMapping, setTagMapping] = useState(new Map());

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(5);

  const errorBoxAnimation = useSpring({
    to: { opacity: errorMessage ? 1 : 0 },
    from: { opacity: 0 },
    config: { duration: 300 },
    reset: true
  });

  const successBoxAnimation = useSpring({
    to: { opacity: actionMessage ? 1 : 0 },
    from: { opacity: 0 },
    config: { duration: 300 },
    reset: true
  });

  useEffect(() => {
    if (errorMessage) {
      setErrorBoxOpacity(1);
    } else {
      setErrorBoxOpacity(0);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (actionMessage) {
      setSuccessBoxOpacity(1);
    } else {
      setSuccessBoxOpacity(0);
    }
  }, [actionMessage]);

  // Fetch tag mapping from API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/v1/job-posts/tags", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
        }
        const tagsData = await res.json();
        const newTagMap = new Map();
        Object.keys(tagsData).forEach((key) => {
          newTagMap.set(key, tagsData[key]);
        });
        setTagMapping(newTagMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Helper to parse responses that might have no content (204)
  function parseNoContent(res) {
    if (!res.ok) throw new Error("Request failed");
    if (res.status === 204 || !res.headers.get("content-length")) {
      return null;
    }
    return res.json();
  }

  useEffect(() => {
    if (!jobId) {
      setErrorMessage("No job ID provided in the URL.");
      setLoading(false);
      return;
    }

    fetch(`/api/v1/job-posts/my-job-post/${jobId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.tags)) {
          data.tags = data.tags.map((tagObj) => {
            const enumVal =
              typeof tagObj === "string"
                ? tagObj
                : tagObj.name || tagObj.value || tagObj.tagName;
            return tagMapping.get(enumVal) || enumVal;
          });
        }
        setJob(data);
        updateApplicantCounts(data.applicants); // Initialize counts on job load
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, [jobId, tagMapping]);

  const refreshJobDetails = () => {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-post/${jobId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.tags)) {
          data.tags = data.tags.map((tagObj) => {
            const enumVal =
              typeof tagObj === "string"
                ? tagObj
                : tagObj.name || tagObj.value || tagObj.tagName;
            return tagMapping.get(enumVal) || enumVal;
          });
        }
        setJob(data);
        updateApplicantCounts(data.applicants); // Update counts on refresh
      })
      .catch((err) => {
        console.error("Error refreshing job details:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  const updateApplicantCounts = useCallback((applicants) => {
    if (!Array.isArray(applicants)) {
      setApplicantCounts({ approved: 0, rejected: 0, pending: 0 });
      return;
    }
    const counts = applicants.reduce(
      (acc, applicant) => {
        if (applicant.status === "APPROVED") {
          acc.approved++;
        } else if (applicant.status === "REJECTED") {
          acc.rejected++;
        } else {
          acc.pending++;
        }
        return acc;
      },
      { approved: 0, rejected: 0, pending: 0 }
    );
    setApplicantCounts(counts);
  }, []);

  const handleApplicantAction = (applicantId, action) => {
    if (job.status !== "OPEN") {
      setActionMessage(`Cannot ${action} applicants after job has started.`);
      setTimeout(() => setActionMessage(""), 5000);
      return;
    }

    if (action === "approve") {
      if (applicantCounts.approved >= job.maxApplicants) {
        setActionMessage(`Cannot approve more than ${job.maxApplicants} applicants.`);
        setTimeout(() => setActionMessage(""), 5000);
        console.log("Cannot approve more than max applicants");
        return;
      }
      if (applicantCounts.approved + 1 === job.maxApplicants) {
        setAutoStartMessage("Approving this applicant will automatically start the job post.");
      } else {
        setAutoStartMessage("");
      }
    } else {
      setAutoStartMessage("");
    }

    setLocalApplicants((prevLocalApplicants) => {
      const updatedApplicants = prevLocalApplicants.map((applicant) =>
        applicant.applicantId === applicantId
          ? { ...applicant, status: action.toUpperCase() }
          : applicant
      );
      console.log("Updated applicants:", updatedApplicants);
      updateApplicantCounts(updatedApplicants);
      return updatedApplicants;
    });
  };

  const handleStartJob = () => {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/start`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to start job. Status: ${res.status}`);
        return parseNoContent(res);
      })
      .then(() => {
        setActionMessage("Job started successfully!");
        refreshJobDetails();
        setTimeout(() => setActionMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error starting job:", error);
        setErrorMessage(`Failed to start job: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 5000);
        setLoading(false);
      });
  };

  const handleFinishJob = () => {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/finish`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to finish job. Status: ${res.status}`);
        return parseNoContent(res);
      })
      .then(() => {
        setActionMessage("Job finished successfully!");
        refreshJobDetails();
        setTimeout(() => setActionMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error finishing job:", error);
        setErrorMessage(`Failed to finish job: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 5000);
        setLoading(false);
      });
  };

  const handleCancelJob = () => {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/cancel`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to cancel job. Status: ${res.status}`);
        return parseNoContent(res);
      })
      .then(() => {
        setActionMessage("Job cancelled successfully!");
        refreshJobDetails();
        setTimeout(() => setActionMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error cancelling job:", error);
        setErrorMessage(`Failed to cancel job: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 5000);
        setLoading(false);
      });
  };

  const handleOpenApplicantsPopup = () => {
    setIsApplicantsPopupVisible(true);
    setLocalApplicants(job.applicants ? [...job.applicants] : []);
    updateApplicantCounts(job.applicants);
  };

  const handleCloseApplicantsPopup = () => {
    setIsApplicantsPopupVisible(false);
    setLocalApplicants([]);
    setAutoStartMessage("");
  };

  const handleSaveChanges = async () => {
    setActionMessage("Saving changes...");
    try {
      const applicantsToUpdate = localApplicants.map((applicant) => ({
        applicantId: applicant.applicantId,
        status: applicant.status
      }));
      console.log("Applicants to update:", applicantsToUpdate);
      const response = await fetch(
        `/api/v1/job-posts/my-job-posts/${jobId}/applicants/approve-reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(applicantsToUpdate)
        }
      );

      if (!response.ok) {
        const message = `Error saving applicant changes: ${response.status} ${response.statusText}`;
        setActionMessage(message);
        setTimeout(() => setActionMessage(""), 5000);
        throw new Error(message);
      }

      console.log("Applicant statuses updated successfully");

      setActionMessage("Changes saved successfully!");
      setTimeout(() => setActionMessage(""), 3000);

      setIsApplicantsPopupVisible(false);
      refreshJobDetails();
    } catch (error) {
      console.error("Error saving applicant status updates:", error);
    }
  };

  if (loading) {
    return (
      <div
        className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"
        } flex gap-8`}
      >
        {/* LEFT: Job Details Skeleton */}
        <div
          className={`flex-1 p-6 rounded-lg shadow-md border transition-all ease-in-out duration-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6 animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-3/4 h-8"></h1>
          <div className="space-y-3">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 rounded w-3/4"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-24 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/4"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/3"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/4"></div>
          </div>
          <div className="mt-8 flex gap-4 justify-start">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
          </div>
        </div>

        {/* RIGHT: Applicants Sidebar Skeleton */}
        <div
          className={`w-60 p-6 rounded-lg shadow-md border transition-all ease-in-out duration-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          } flex flex-col`}
        >
          <h2 className="text-xl font-bold mb-6 animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-1/2 h-6"></h2>
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"
        } flex gap-8`}
      >
        <animated.div
          style={errorBoxAnimation}
          className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
          role="alert"
        >
          <FaExclamationTriangle className="mr-2 text-red-500 h-6 w-6" />
          <div>
            <h3 className="font-bold">Error</h3>
            <p>{errorMessage}</p>
          </div>
        </animated.div>
        <h1 className="text-2xl font-bold mb-4">Error Loading Job Details</h1>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"
        } flex gap-8`}
      >
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p>No job data found for ID: {jobId}</p>
      </div>
    );
  }

  // Determine button disabled states based on job status
  const isJobOpen = job.status === "OPEN";

  // Pagination Calculations
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = Array.isArray(localApplicants)
    ? localApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant)
    : [];
  const totalPages = Array.isArray(localApplicants)
    ? Math.ceil(localApplicants.length / applicantsPerPage)
    : 0;

  const pendingApplicants = Array.isArray(localApplicants)
    ? localApplicants.filter(
        (app) => app.status !== "APPROVED" && app.status !== "REJECTED"
      )
    : [];
  const approvedApplicants = Array.isArray(localApplicants)
    ? localApplicants.filter((app) => app.status === "APPROVED")
    : [];
  const rejectedApplicants = Array.isArray(localApplicants)
    ? localApplicants.filter((app) => app.status === "REJECTED")
    : [];

  const currentPendingApplicants = pendingApplicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const currentApprovedApplicants = approvedApplicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const currentRejectedApplicants = rejectedApplicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border rounded-4xl transition-all ease-in-out duration-500 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-gray-50 text-gray-900 border-gray-200"
      } flex gap-8`}
    >
      {/* LEFT: Job Details */}
      <div
        className={`flex-1 p-6 rounded-lg shadow-md border transition-all ease-in-out duration-500 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-2 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {job.title}
        </h1>

        <animated.div
          style={successBoxAnimation}
          className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center justify-center"
          role="alert"
        >
          <FaTrophy className="mr-2 text-green-500 h-6 w-6" />
          <p>{actionMessage}</p>
        </animated.div>

        {autoStartMessage && (
          <div
            className="mb-8 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md flex items-center justify-center"
            role="alert"
          >
            <FaExclamationTriangle className="mr-2 text-yellow-500 h-5 w-5" />
            <p>{autoStartMessage}</p>
          </div>
        )}

        <div className="mb-4">
          <strong className="block font-medium mb-1">Job ID:</strong>
          <span>{job.jobPostId}</span>
        </div>
        <div className="mb-4">
          <strong className="block font-medium mb-1">Title:</strong>
          <span className="text-xl">{job.title}</span>
        </div>
        <div className="mb-6">
          <strong className="block font-medium mb-1">Description:</strong>
          <p>{job.description}</p>
        </div>
        <div className="mb-4">
          <strong className="block font-medium mb-1">Status:</strong>
          <span className="inline-block px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold text-sm">
            {job.status}
          </span>
        </div>

        {job.tags && job.tags.length > 0 && (
          <div className="mb-4">
            <strong className="block font-medium mb-1">Tags:</strong>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium text-sm"
                >
                  <FaTag className="mr-1 text-purple-600" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.address && (
          <div className="mb-4">
            <strong className="block font-medium mb-1">Address:</strong>
            <span>{job.address}</span>
          </div>
        )}
        {job.datePosted && (
          <div>
            <strong className="block font-medium mb-1">Date Posted:</strong>
            <span>{new Date(job.datePosted).toLocaleDateString()}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-start">
          <button
            onClick={handleStartJob}
            className={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              job.status !== "OPEN"
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""
            }`}
            disabled={job.status !== "OPEN"}
          >
            Start
          </button>
          <button
            onClick={handleFinishJob}
            className={`px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
              job.status !== "IN_PROGRESS"
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""
            }`}
            disabled={job.status !== "IN_PROGRESS"}
          >
            Finish
          </button>
          <button
            onClick={handleCancelJob}
            className={`px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
              job.status !== "OPEN"
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""
            }`}
            disabled={job.status !== "OPEN"}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* RIGHT: Applicants Sidebar */}
      <div
        className={`w-60 p-6 rounded-lg shadow-md border transition-all ease-in-out duration-500 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
        } flex flex-col`}
      >
        <h2 className="text-xl font-bold mb-6">Applicants</h2>
        <button
          onClick={handleOpenApplicantsPopup}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
        >
          Manage Applicants
        </button>

        {Array.isArray(job.applicants) && job.applicants.length > 0 ? (
          <div className="space-y-4"></div>
        ) : (
          <p className="mt-4">No applicants found for this job.</p>
        )}
      </div>

      {/* Applicants Management Popup */}
      <ApplicantsManagementPopup
        isApplicantsPopupVisible={isApplicantsPopupVisible}
        applicantCounts={applicantCounts}
        errorMessage={errorMessage}
        errorBoxAnimation={errorBoxAnimation}
        autoStartMessage={autoStartMessage}
        pendingApplicants={pendingApplicants}
        approvedApplicants={approvedApplicants}
        rejectedApplicants={rejectedApplicants}
        currentPendingApplicants={currentPendingApplicants}
        currentApprovedApplicants={currentApprovedApplicants}
        currentRejectedApplicants={currentRejectedApplicants}
        handleApplicantAction={handleApplicantAction}
        handleSaveChanges={handleSaveChanges}
        handleCloseApplicantsPopup={handleCloseApplicantsPopup}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        job={job}
        isJobOpen={job.status === "OPEN"}
      />
    </div>
  );
}
