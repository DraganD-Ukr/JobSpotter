import { useEffect, useState } from "react";

export function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/v1/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="main-content min-h-screen p-4">
      {/* Banner Section */}
      <div className="mt-20 mb-20 lava-lamp-background object-contain h-25 p-2 rounded-lg shadow-2xl flex justify-center items-center">
        <img
          src="/jb.png"
          alt="JobSpotter Logo"
          className="mb-6 object-contain h-110"
        />
      </div>

      {/* Welcome Section */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-lime-600 mb-4">
          Welcome to JobSpotter
        </h1>
        <p className="text-xl mb-6">
          Find your ideal job or side hustle today and connect with local opportunities!
        </p>

        {/* Call to Action (Hidden if user is logged in) */}
        {!user && (
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-3 text-white bg-green-600 rounded-lg text-lg hover:bg-green-700 transition"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-6 py-3 text-green-600 border border-green-600 rounded-lg text-lg hover:bg-green-50 transition"
            >
              Register Now
            </a>
          </div>
        )}
      </div>

      {/* Top Trending Jobs Section */}
      <div className="mt-16 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Popular Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Dog Walker",
              description: "Help pet owners by walking and caring for their dogs.",
            },
            {
              title: "Babysitter",
              description: "Provide care and support for children while parents are away.",
            },
            {
              title: "Tutor",
              description: "Help students excel in subjects like math, science, and language.",
            },
            {
              title: "House Cleaner",
              description: "Keep homes tidy and clean with flexible schedules.",
            },
            {
              title: "Freelance Photographer",
              description: "Capture special moments for events and occasions.",
            },
            {
              title: "Personal Trainer",
              description: "Support people in reaching their fitness goals.",
            },
          ].map((job, index) => (
            <div
              key={index}
              className="card p-6 shadow hover:shadow-md border hover:border-green-500 transition"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="mt-2">{job.description}</p>
              <a
                href="/jobs"
                className="mt-4 inline-block text-green-600 font-medium hover:underline"
              >
                View Jobs
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
