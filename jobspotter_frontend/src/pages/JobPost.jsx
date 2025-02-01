import { useState } from "react";

export function JobPost() {
  // Job posts with date and time 
  const [jobs] = useState([
    {
      title: "Dog Walker Needed",
      company: "Friendly Paws",
      description: "Looking for a reliable and caring dog walker available during mornings.",
      location: "Dundalk, Ireland",
      createdAt: new Date().toLocaleString(), 
    },
    {
      title: "Part-Time Babysitter",
      company: "Happy Kids Co.",
      description: "Seeking an experienced babysitter to look after two kids (ages 4 and 7) on weekends.",
      location: "Dundalk, Ireland",
      createdAt: new Date().toLocaleString(), 
    },
    {
      title: "Freelance Photographer",
      company: "Memories Photography",
      description: "We need a skilled photographer for weddings and events.",
      location: "Dundalk, Ireland",
      createdAt: new Date().toLocaleString(), 
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-8">Job Posts</h1>

        {/* Section for browsing job listings */}
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
              <p className="text-gray-400 mt-2 text-sm">Posted on: {job.createdAt}</p>
              <a
                href="#"
                className="inline-block mt-4 text-green-600 font-medium hover:underline"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>

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
