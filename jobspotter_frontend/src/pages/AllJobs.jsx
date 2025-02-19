import { useEffect, useState } from "react";


export function AllJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllJobs();
  }, []);

  function fetchAllJobs() {
    setLoading(true);
    fetch("/api/v1/job-posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch all jobs");
        return res.json();
      })
      .then((jobs) => {
        setAllJobs(jobs);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  function handleApply(jobId) {
    fetch(`/api/v1/job-posts/${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ jobId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to apply for job");
      })
      .then(() => {
        alert("Successfully applied!");
      })
      .catch((err) => {
        console.error("Error applying for job:", err);
        setErrorMessage(err.message);
      });
  }

  function handleRateJob(jobId, star) {
    console.log(`Rated job ${jobId} with ${star} stars`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}
      {allJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        allJobs.map((job) => (
          <div
            key={job.jobId || job.id}
            className="border rounded p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm">{job.description}</p>
              <div className="mt-2 flex items-center">
                <span className="mr-2 text-gray-600">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRateJob(job.jobId, star)}
                    className="text-yellow-500 text-xl cursor-pointer"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleApply(job.jobId)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Apply Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}
