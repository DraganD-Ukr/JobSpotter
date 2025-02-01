import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function JobPost() {
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetches job posts from the API endpoint
    const accessToken = Cookies.get("AccessToken");
    fetch("/api/v1/job-post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adds authorization headers if required
         "Authorization": `Bearer ${accessToken}`,
      },credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch job posts");
        }
        return res.json();
      })
      .then((data) => {
        // Expecting data to be an array of job posts
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job posts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
        <p>Loading job posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-8">Job Posts</h1>

        {jobs.length === 0 ? (
          <p>No job posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-lg border hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-600 mt-2">{job.company}</p>
                <p className="text-gray-700 mt-4">{job.description}</p>
                <p className="text-gray-500 mt-2 italic">{job.location}</p>
                <p className="text-gray-400 mt-2 text-sm">
                  Posted on: {job.createdAt}
                </p>
                <a
                  href="#"
                  className="inline-block mt-4 text-green-600 font-medium hover:underline"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Section for creating new job posts */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Post a New Job</h2>
          <p className="text-gray-600 mb-6">
            Have a job to offer? Create a new job post and connect with job seekers.
          </p>
          <a
            href="/create-job"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Create Job Post
          </a>
        </div>
      </div>
    </div>
  );
}
