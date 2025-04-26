import React, {
  useEffect,
  useState,
  useContext,
  useCallback
} from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaTrophy,
  FaTag,
  FaEdit,
  FaTimes
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { ThemeContext } from "./ThemeContext";
import ApplicantsManagementPopup from "./ApplicantsManagementPopup";
import UserReviewPopup from "./UserReviewPopup";

export function ViewMoreDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [autoStartMessage, setAutoStartMessage] = useState("");
  const [isApplicantsPopupVisible, setIsApplicantsPopupVisible] = useState(false);
  const [applicantCounts, setApplicantCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0
  });
  const [localApplicants, setLocalApplicants] = useState([]);
  const [isReviewPopupVisible, setIsReviewPopupVisible] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const [tagMapping, setTagMapping] = useState(new Map());
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    tags: [],
    address: "",
    maxApplicants: 1
  });

  const errorBoxAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 },
    reset: true
  });

  const successBoxAnimation = useSpring({
    opacity: actionMessage ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 },
    reset: true
  });

  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch current user");
        return res.json();
      })
      .then(setCurrentUser)
      .catch((err) => setErrorMessage(err.message));
  }, []);

  useEffect(() => {
    fetch("/api/v1/job-posts/tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch tags: ${res.status}`);
        return res.json();
      })
      .then((tagsData) => setTagMapping(new Map(Object.entries(tagsData))))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  const parseNoContent = (res) => {
    if (!res.ok) throw new Error("Request failed");
    return res.status === 204 || !res.headers.get("content-length")
      ? null
      : res.json();
  };

  const fetchJobDetails = () => {
    if (!jobId) {
      setErrorMessage("No job ID provided in the URL.");
      setLoading(false);
      return;
    }
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
            const enumVal = typeof tagObj === "string"
              ? tagObj
              : tagObj.name || tagObj.value || tagObj.tagName;
            return tagMapping.get(enumVal.replace(/\s+/g, '_')) ||
                   enumVal.replace(/\s+/g, '_');
          });
        }
        setJob(data);
        setEditFormData({
          title: data.title || "",
          description: data.description || "",
          tags: data.tags || [],
          address: data.address || "",
          maxApplicants: data.maxApplicants || 1
        });
        updateApplicantCounts(data.applicants);
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId, tagMapping]);

  const updateApplicantCounts = useCallback((applicants) => {
    if (!Array.isArray(applicants)) {
      return setApplicantCounts({ approved: 0, rejected: 0, pending: 0 });
    }
    const counts = applicants.reduce((acc, applicant) => {
      acc[applicant.status === "APPROVED"
        ? "approved"
        : applicant.status === "REJECTED"
        ? "rejected"
        : "pending"]++;
      return acc;
    }, { approved: 0, rejected: 0, pending: 0 });
    setApplicantCounts(counts);
  }, []);

  const handleApplicantAction = (applicantId, action) => {
    if (job.status !== "OPEN") {
      setActionMessage(`Cannot ${action} applicants after job has started.`);
      setTimeout(() => setActionMessage(""), 5000);
      return;
    }
    if (action === "approve" && applicantCounts.approved >= job.maxApplicants) {
      setActionMessage(
        `Cannot approve more than ${job.maxApplicants} applicants.`
      );
      setTimeout(() => setActionMessage(""), 5000);
      return;
    }
    setAutoStartMessage(
      action === "approve" && applicantCounts.approved + 1 === job.maxApplicants
        ? "Approving this applicant will automatically start the job post."
        : ""
    );
    setLocalApplicants((prev) => {
      const updated = prev.map((applicant) =>
        applicant.applicantId === applicantId
          ? { ...applicant, status: action.toUpperCase() }
          : applicant
      );
      updateApplicantCounts(updated);
      return updated;
    });
  };

  const handleJobAction = (action, successMessage) => {
    setLoading(true);
    fetch(`/api/v1/job-posts/my-job-posts/${jobId}/${action}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to ${action} job. Status: ${res.status}`);
        return parseNoContent(res);
      })
      .then(() => {
        setActionMessage(successMessage);
        fetchJobDetails();
        setTimeout(() => setActionMessage(""), 3000);
        if (action === "finish") setIsReviewPopupVisible(true);
      })
      .catch((err) => {
        setErrorMessage(`Failed to ${action} job: ${err.message}`);
        setTimeout(() => setErrorMessage(""), 5000);
      })
      .finally(() => setLoading(false));
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
      const response = await fetch(
        `/api/v1/job-posts/my-job-posts/${jobId}/applicants/approve-reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(applicantsToUpdate)
        }
      );
      if (!response.ok) {
        throw new Error(`Error saving applicant changes: ${response.status}`);
      }
      setActionMessage("Changes saved successfully!");
      setTimeout(() => setActionMessage(""), 3000);
      setIsApplicantsPopupVisible(false);
      fetchJobDetails();
    } catch (error) {
      setActionMessage(error.message);
      setTimeout(() => setActionMessage(""), 5000);
    }
  };

  const handleOpenEditModal = () => {
    if (job.status !== "OPEN" || applicantCounts.approved > 0) {
      setErrorMessage(
        job.status !== "OPEN"
          ? "Cannot edit job post after it has started or been closed."
          : "Cannot edit job post after applicants have been approved."
      );
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData({
      title: job.title || "",
      description: job.description || "",
      tags: job.tags || [],
      address: job.address || "",
      maxApplicants: job.maxApplicants || 1
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "maxApplicants") {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < 1) {
        setErrorMessage("Minimum number of applicants must be 1");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
      setEditFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagChange = (tagValue, isChecked) => {
    setEditFormData((prev) => {
      const updatedTags = isChecked
        ? [...prev.tags, tagValue]
        : prev.tags.filter((tag) => tag !== tagValue);
      return { ...prev, tags: updatedTags };
    });
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleUpdateJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/job-posts/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editFormData)
      });
      if (!response.ok) {
        throw new Error(`Failed to update job post: ${response.status}`);
      }
      setActionMessage("Job post updated successfully!");
      setIsEditModalOpen(false);
      fetchJobDetails();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`my-6 xs:my-8 sm:my-10 main-content min-h-screen p-2 xs:p-4 sm:p-6 border rounded-4xl
          transition-all duration-500 ${darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"} flex flex-col lg:flex-row gap-4 xs:gap-6 sm:gap-8`}
      >
        <div
          className={`flex-1 p-4 xs:p-5 sm:p-6 rounded-lg shadow-md border transition-all
            duration-500 ${darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"}`}
        >
          <h1
            className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-5 sm:mb-6 animate-pulse bg-gray-300
              dark:bg-gray-700 rounded w-3/4 h-6 xs:h-8 sm:h-8"
          ></h1>
          <div className="space-y-2 xs:space-y-3 sm:space-y-3">
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-3 xs:h-4 sm:h-4
                rounded w-1/2"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-6 xs:h-8 sm:h-8
                rounded w-3/4"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 xs:h-24 sm:h-24
                rounded"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-3 xs:h-4 sm:h-4
                rounded w-1/4"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-3 xs:h-4 sm:h-4
                rounded w-1/3"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-3 xs:h-4 sm:h-4
                rounded w-1/2"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-3 xs:h-4 sm:h-4
                rounded w-1/4"
            ></div>
          </div>
          <div className="mt-4 xs:mt-6 sm:mt-8 flex gap-2 xs:gap-3 sm:gap-4 justify-start flex-wrap">
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 xs:h-10 sm:h-10
                rounded-lg w-20 xs:w-24 sm:w-24"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 xs:h-10 sm:h-10
                rounded-lg w-20 xs:w-24 sm:w-24"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 xs:h-10 sm:h-10
                rounded-lg w-20 xs:w-24 sm:w-24"
            ></div>
          </div>
        </div>
        <div
          className={`w-full lg:w-60 p-4 xs:p-5 sm:p-6 rounded-lg shadow-md border transition-all
            duration-500 ${darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"} flex flex-col`}
        >
          <h2
            className="text-base xs:text-lg sm:text-xl font-bold mb-4 xs:mb-5 sm:mb-6 animate-pulse bg-gray-300
              dark:bg-gray-700 rounded w-1/2 h-5 xs:h-6 sm:h-6"
          ></h2>
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-16 xs:h-20 sm:h-20
                rounded"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-16 xs:h-20 sm:h-20
                rounded"
            ></div>
            <div
              className="animate-pulse bg-gray-300 dark:bg-gray-700 h-16 xs:h-20 sm:h-20
                rounded"
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (errorMessage || !job) {
    return (
      <div
        className={`my-6 xs:my-8 sm:my-10 main-content min-h-screen p-2 xs:p-4 sm:p-6 border rounded-4xl
          transition-all duration-500 ${darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"} flex flex-col lg:flex-row gap-4 xs:gap-6 sm:gap-8`}
      >
        {errorMessage && (
          <animated.div
            style={errorBoxAnimation}
            className="mb-4 xs:mb-6 sm:mb-8 p-2 xs:p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700
              rounded-md flex items-center"
            role="alert"
          >
            <FaExclamationTriangle className="mr-1 xs:mr-2 sm:mr-2 text-red-500 h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
            <div>
              <h3 className="font-bold text-sm xs:text-base sm:text-base">Error</h3>
              <p className="text-xs xs:text-sm sm:text-sm">{errorMessage}</p>
            </div>
          </animated.div>
        )}
        <h1 className="text-xl xs:text-2xl sm:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4">
          {errorMessage ? "Error Loading Job Details" : "Job Not Found"}
        </h1>
        <p className={`text-xs xs:text-sm sm:text-sm ${errorMessage ? "text-red-500" : ""}`}>
          {errorMessage || `No job data found for ID: ${jobId}`}
        </p>
      </div>
    );
  }

  const isJobOpen = job.status === "OPEN";
  const canEditJob = isJobOpen && applicantCounts.approved === 0;

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
      className={`my-6 xs:my-8 sm:my-10 main-content min-h-screen p-2 xs:p-4 sm:p-6 border rounded-4xl
        transition-all duration-500 ${darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-gray-50 text-gray-900 border-gray-200"} flex flex-col lg:flex-row gap-4 xs:gap-6 sm:gap-8 relative`}
    >
      <div
        className={`flex-1 p-4 xs:p-5 sm:p-6 rounded-lg shadow-md border transition-all
          duration-500 ${darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"}`}
      >
        <h1
          className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-1 xs:mb-2 sm:mb-2 ${darkMode
            ? "text-green-400"
            : "text-green-600"}`}
        >
          {job.title}
        </h1>

        {actionMessage && (
          <animated.div
            style={successBoxAnimation}
            className="mb-4 xs:mb-6 sm:mb-8 p-2 xs:p-3 sm:p-4 bg-green-100 border border-green-400
              text-green-700 rounded-md flex items-center justify-center"
            role="alert"
          >
            <FaTrophy className="mr-1 xs:mr-2 sm:mr-2 text-green-500 h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
            <p className="text-xs xs:text-sm sm:text-sm">{actionMessage}</p>
          </animated.div>
        )}

        {autoStartMessage && (
          <div
            className="mb-4 xs:mb-6 sm:mb-8 p-2 xs:p-3 sm:p-4 bg-yellow-100 border border-yellow-400
              text-yellow-700 rounded-md flex items-center justify-center"
            role="alert"
          >
            <FaExclamationTriangle className="mr-1 xs:mr-2 sm:mr-2 text-yellow-500 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
            <p className="text-xs xs:text-sm sm:text-sm">{autoStartMessage}</p>
          </div>
        )}

        <div className="mb-2 xs:mb-3 sm:mb-4">
          <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Job ID:</strong>
          <span className="text-xs xs:text-sm sm:text-sm">{job.jobPostId}</span>
        </div>
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Title:</strong>
          <span className="text-base xs:text-lg sm:text-xl">{job.title}</span>
        </div>
        <div className="mb-4 xs:mb-5 sm:mb-6">
          <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Description:</strong>
          <p className="text-xs xs:text-sm sm:text-sm">{job.description}</p>
        </div>
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Status:</strong>
          <span
            className="inline-block px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 rounded-full bg-gray-200
              dark:bg-gray-700 text-black dark:text-white font-semibold text-xs xs:text-sm sm:text-sm"
          >
            {job.status}
          </span>
        </div>

        {job.tags?.length > 0 && (
          <div className="mb-2 xs:mb-3 sm:mb-4">
            <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Tags:</strong>
            <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 xs:px-2 sm:px-3 py-1 xs:py-1 sm:py-1 rounded-full
                    bg-blue-100 dark:bg-blue-800 text-blue-800
                    dark:text-blue-100 font-medium text-xs xs:text-sm sm:text-sm"
                >
                  <FaTag className="mr-1 xs:mr-1 sm:mr-1 text-purple-600 h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4" />
                  {tag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.address && (
          <div className="mb-2 xs:mb-3 sm:mb-4">
            <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Address:</strong>
            <span className="text-xs xs:text-sm sm:text-sm">{job.address}</span>
          </div>
        )}
        {job.datePosted && (
          <div className="mb-2 xs:mb-3 sm:mb-4">
            <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">Date Posted:</strong>
            <span className="text-xs xs:text-sm sm:text-sm">{new Date(job.datePosted).toLocaleDateString()}</span>
          </div>
        )}
        {job.maxApplicants && (
          <div className="mb-2 xs:mb-3 sm:mb-4">
            <strong className="block font-medium mb-0.5 xs:mb-1 sm:mb-1 text-sm xs:text-base sm:text-base">
              Maximum Applicants:
            </strong>
            <span className="text-xs xs:text-sm sm:text-sm">{job.maxApplicants}</span>
          </div>
        )}

        <div className="mt-4 xs:mt-6 sm:mt-8 flex gap-2 xs:gap-3 sm:gap-4 justify-end flex-wrap">
          <button
            onClick={() => handleJobAction("start", "Job started successfully!")}
            className={`px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-3 bg-blue-500 text-white rounded-lg
              hover:bg-blue-600 transition duration-300 focus:outline-none
              focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              text-xs xs:text-sm sm:text-sm
              ${job.status !== "OPEN"
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""}`}
            disabled={job.status !== "OPEN"}
          >
            Start
          </button>
          <button
            onClick={() => handleJobAction("finish", "Job finished successfully!")}
            className={`px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-3 bg-purple-500 text-white rounded-lg
              hover:bg-purple-600 transition duration-300 focus:outline-none
              focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
              text-xs xs:text-sm sm:text-sm
              ${job.status !== "IN_PROGRESS"
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""}`}
            disabled={job.status !== "IN_PROGRESS"}
          >
            Finish
          </button>
          <button
            onClick={() => handleJobAction("cancel", "Job cancelled successfully!")}
            className={`px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-3 bg-gray-500 text-white rounded-lg
              hover:bg-gray-600 transition duration-300 focus:outline-none
              focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
              text-xs xs:text-sm sm:text-sm
              ${job.status !== "OPEN"
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""}`}
            disabled={job.status !== "OPEN"}
          >
            Cancel
          </button>
          <button
            onClick={handleOpenEditModal}
            className={`px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-3 bg-yellow-500 text-white rounded-lg
              hover:bg-yellow-600 transition duration-300 focus:outline-none
              focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
              flex items-center text-xs xs:text-sm sm:text-sm
              ${!canEditJob
                ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-500 border border-gray-400"
                : ""}`}
            disabled={!canEditJob}
          >
            <FaEdit className="mr-1 xs:mr-2 sm:mr-2 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
            Edit Job Post
          </button>
        </div>

        <div className="mt-4 xs:mt-6 sm:mt-8">
          <Link
            to={`/search-reviews?reviewedUserId=${approvedApplicants.length > 0
              ? approvedApplicants[0].applicantId
              : ""}`}
            className="text-blue-500 hover:underline text-xs xs:text-sm sm:text-sm"
          >
            Manage Submitted Reviews
          </Link>
        </div>
      </div>

      <div
        className={`w-full lg:w-60 p-4 xs:p-5 sm:p-6 rounded-lg shadow-md border transition-all
          duration-500 ${darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"} flex flex-col`}
      >
        <h2 className="text-base xs:text-lg sm:text-xl font-bold mb-4 xs:mb-5 sm:mb-6">Applicants</h2>
        <button
          onClick={handleOpenApplicantsPopup}
          className="px-2 xs:px-3 sm:px-3 py-1 xs:py-2 sm:py-2 bg-blue-500 text-white rounded-md
            hover:bg-blue-600 transition duration-300 focus:outline-none
            focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-sm"
        >
          Manage Applicants
        </button>
        {job.applicants?.length > 0 ? (
          <div className="space-y-2 xs:space-y-3 sm:space-y-4"></div>
        ) : (
          <p className="mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-sm">No applicants found for this job.</p>
        )}
      </div>

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
        isJobOpen={isJobOpen}
        jobPostId={job.jobPostId}
      />

      <UserReviewPopup
        isVisible={isReviewPopupVisible}
        onClose={() => setIsReviewPopupVisible(false)}
        jobPostId={job.jobPostId}
        reviewerID={currentUser?.userId}
        reviewedUserID={approvedApplicants.length > 0
          ? approvedApplicants[0].applicantId
          : null}
        roleOfReviewer="POSTER"
      />

      {isEditModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50
            backdrop-blur-lg bg-opacity-10 p-2 xs:p-3 sm:p-4"
        >
          <div
            className={`p-4 xs:p-5 sm:p-6 rounded-lg shadow-lg w-full max-w-[90%] xs:max-w-[80%] sm:max-w-md ${darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"}`}
          >
            <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4">Edit Job Post</h2>
            <div onSubmit={handleUpdateJobPost}>
              <div className="mb-2 xs:mb-3 sm:mb-4">
                <label
                  className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 xs:p-2 sm:p-2 border rounded-md focus:outline-none
                    focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-sm ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"}`}
                  required
                />
              </div>
              <div className="mb-2 xs:mb-3 sm:mb-4">
                <label
                  className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 xs:p-2 sm:p-2 border rounded-md focus:outline-none
                    focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-sm ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"}`}
                  rows="4"
                  required
                />
              </div>
              <div className="mb-2 xs:mb-3 sm:mb-4">
                <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base">
                  Available Tags
                </label>
                <div
                  className={`max-h-24 xs:max-h-28 sm:max-h-32 overflow-y-auto border rounded-md p-2 xs:p-2 sm:p-2
                    text-xs xs:text-sm sm:text-sm ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"}`}
                >
                  {Array.from(tagMapping.entries()).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center mb-1 xs:mb-2 sm:mb-2"
                    >
                      <input
                        type="checkbox"
                        id={`tag-${key}`}
                        value={value}
                        checked={editFormData.tags.includes(value)}
                        onChange={(e) =>
                          handleTagChange(value, e.target.checked)
                        }
                        className="mr-1 xs:mr-2 sm:mr-2 h-4 xs:h-4 sm:h-4 w-4 xs:w-4 sm:w-4"
                      />
                      <label htmlFor={`tag-${key}`}>
                        {value.replace(/_/g, ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-2 xs:mb-3 sm:mb-4">
                <label className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base">
                  Selected Tags
                </label>
                <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-2">
                  {editFormData.tags.length > 0 ? (
                    editFormData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 xs:px-2 sm:px-3 py-1 xs:py-1 sm:py-1
                          rounded-full bg-blue-100 dark:bg-blue-800
                          text-blue-800 dark:text-blue-100 font-medium text-xs xs:text-sm sm:text-sm"
                      >
                        {tag.replace(/_/g, ' ')}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 xs:ml-1 sm:ml-1 text-red-500 hover:text-red-700 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5"
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs xs:text-sm sm:text-sm">No tags selected.</p>
                  )}
                </div>
              </div>
              <div className="mb-2 xs:mb-3 sm:mb-4">
                <label
                  className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base"
                  htmlFor="maxApplicants"
                >
                  Maximum Applicants
                </label>
                <input
                  type="number"
                  id="maxApplicants"
                  name="maxApplicants"
                  value={editFormData.maxApplicants}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full p-2 xs:p-2 sm:p-2 border rounded-md focus:outline-none
                    focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-sm ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"}`}
                  required
                />
              </div>
              <div className="mb-2 xs:mb-3 sm:mb-4">
                <label
                  className="block font-medium mb-1 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editFormData.address}
                  onChange={handleInputChange}
                  className={`w-full p-2 xs:p-2 sm:p-2 border rounded-md focus:outline-none
                    focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-sm ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"}`}
                />
              </div>
              <div className="flex justify-end gap-2 xs:gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-gray-500 text-white rounded-lg
                    hover:bg-gray-600 transition duration-300 text-xs xs:text-sm sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateJobPost}
                  className="px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 bg-blue-500 text-white rounded-lg
                    hover:bg-blue-600 transition duration-300 text-xs xs:text-sm sm:text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}