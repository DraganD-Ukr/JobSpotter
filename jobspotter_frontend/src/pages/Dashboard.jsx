import React, { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaUsers,
  FaBriefcase,
  FaChartLine,
  FaMapMarkerAlt,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Dashboard() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  // ---------- States ----------
  const [username, setUsername] = useState("");
  const [countyData, setCountyData] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalJobPosts: 0,
    totalApplications: 0,
    activeJobs: 0,
  });

  const [allJobs, setAllJobs] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // ---------- Fetch user info & county stats on mount ----------
  useEffect(() => {
    // 1) Fetch user info
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
      .catch((error) => console.error("Error fetching user info:", error));

    // 2) Fetch county job post stats
    fetch("/api/v1/job-posts/county-stats", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCountyData(data))
      .catch((error) =>
        console.error("Error fetching job post county stats:", error)
      );
  }, []);

  // ---------- Fetch total users, total job posts, total applicants, active jobs ----------
  useEffect(() => {
    // GET /api/v1/users/count
    fetch("/api/v1/users/count", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch total users count");
        return res.json();
      })
      .then((count) => {
        setDashboardStats((prev) => ({
          ...prev,
          totalUsers: count,
        }));
      })
      .catch((err) => console.error("Error fetching total users:", err));

    // GET /api/v1/job-posts/count
    fetch("/api/v1/job-posts/count", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch total job posts count");
        return res.json();
      })
      .then((count) => {
        setDashboardStats((prev) => ({
          ...prev,
          totalJobPosts: count,
        }));
      })
      .catch((err) => console.error("Error fetching total job posts:", err));

    // GET /api/v1/job-posts/applicants/count (for totalApplications)
    fetch("/api/v1/job-posts/applicants/count", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch total applicants count");
        return res.json();
      })
      .then((count) => {
        setDashboardStats((prev) => ({
          ...prev,
          totalApplications: count,
        }));
      })
      .catch((err) => console.error("Error fetching total applicants:", err));

    // GET /api/v1/job-posts/count-by-status?status=IN_PROGRESS => active jobs
    fetch("/api/v1/job-posts/count-by-status?status=IN_PROGRESS", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch active jobs");
        return res.json();
      })
      .then((count) => {
        setDashboardStats((prev) => ({
          ...prev,
          activeJobs: count,
        }));
      })
      .catch((err) => console.error("Error fetching active jobs:", err));
  }, []);

  // ---------- Fetch All Jobs & Achievements ----------
  useEffect(() => {
    // All Jobs
    fetch("/api/v1/job-posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setAllJobs(data))
      .catch(() => {});

    // Achievements
    fetch("/api/v1/users/me/achievements", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setAchievements(data))
      .catch(() => {});
  }, []);

  // ---------- Initialize Map with Bubble Markers ----------
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Create the map
      const map = L.map(mapContainerRef.current).setView([53.349805, -6.26031], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      
      // Define actual coordinates for Irish counties (simplified here with example lat/lon)
      const countyMarkers = [
        { county: "Carlow", lat: 52.689, lon: -6.931, jobPostCount: 25 },
        { county: "Cavan", lat: 53.989, lon: -7.360, jobPostCount: 14 },
        { county: "Clare", lat: 52.866, lon: -8.989, jobPostCount: 30 },
        { county: "Cork", lat: 51.899, lon: -8.475, jobPostCount: 120 },
        { county: "Donegal", lat: 54.996, lon: -8.243, jobPostCount: 40 },
        { county: "Dublin", lat: 53.349805, lon: -6.26031, jobPostCount: 250 },
        { county: "Galway", lat: 53.270, lon: -9.050, jobPostCount: 60 },
        { county: "Kerry", lat: 52.205, lon: -9.429, jobPostCount: 50 },
        { county: "Kildare", lat: 53.231, lon: -6.910, jobPostCount: 80 },
        { county: "Kilkenny", lat: 52.654, lon: -7.249, jobPostCount: 45 },
        { county: "Laois", lat: 53.015, lon: -7.295, jobPostCount: 20 },
        { county: "Leitrim", lat: 54.047, lon: -8.103, jobPostCount: 12 },
        { county: "Limerick", lat: 52.668, lon: -8.630, jobPostCount: 70 },
        { county: "Longford", lat: 53.694, lon: -7.794, jobPostCount: 18 },
        { county: "Louth", lat: 53.977, lon: -6.388, jobPostCount: 40 },
        { county: "Mayo", lat: 53.850, lon: -9.300, jobPostCount: 55 },
        { county: "Meath", lat: 53.750, lon: -6.650, jobPostCount: 90 },
        { county: "Monaghan", lat: 54.250, lon: -6.960, jobPostCount: 22 },
        { county: "Offaly", lat: 53.255, lon: -7.334, jobPostCount: 35 },
        { county: "Roscommon", lat: 53.680, lon: -8.130, jobPostCount: 15 },
        { county: "Sligo", lat: 54.278, lon: -8.475, jobPostCount: 38 },
        { county: "Tipperary", lat: 52.409, lon: -7.837, jobPostCount: 60 },
        { county: "Waterford", lat: 52.258, lon: -7.110, jobPostCount: 50 },
        { county: "Westmeath", lat: 53.523, lon: -7.355, jobPostCount: 30 },
        { county: "Wexford", lat: 52.377, lon: -6.459, jobPostCount: 55 },
        { county: "Wicklow", lat: 52.988, lon: -6.121, jobPostCount: 60 }
      ];

      // Set fixed bubble size but proportional to the job post count
      const maxBubbleSize = 30; 
      const minBubbleSize = 8; 

      // Loop through each county and add a bubble marker with fixed sizes
      countyMarkers.forEach(({ county, lat, lon, jobPostCount }) => {
        const scaledSize = Math.max(
          minBubbleSize,
          Math.min(jobPostCount * 0.15, maxBubbleSize)
        );

        L.circleMarker([lat, lon], {
          radius: scaledSize,
          fillColor: "#1E90FF",
          color: "#FFFFFF",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.6
        })
          .addTo(map)
          .bindPopup(`<b>${county}</b><br />Job Posts: ${jobPostCount}`);
      });

      // Store map instance in ref
      mapRef.current = map;
    }
  }, [countyData]);

  // ---------- Chart Data ----------
  const chartData = {
    labels: countyData.map((c) => c.county),
    datasets: [
      {
        label: "Job Posts",
        data: countyData.map((c) => c.jobPostCount),
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-300`}>
      {/* Sidebar Navigation */}
      <aside
        className={`
          w-64 p-6 flex flex-col
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
        `}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-wide">
            JobSpotter
          </h2>
        </div>
        <nav className="flex-1 space-y-2">
          <button
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-500 hover:text-white"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/searchjobpost")}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-500 hover:text-white"
          >
            Community
          </button>
          <button
            onClick={() => navigate("/searchreport")}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-500 hover:text-white"
          >
            Manage Reports
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`
          flex-1 p-6
          ${darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-br from-gray-100 to-white text-gray-900"
          }
        `}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          {/* Search input */}
          <div className="relative w-1/2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search job & Community here..."
              className={`
                w-full pl-10 pr-4 py-2 rounded-md
                ${
                  darkMode
                    ? "bg-gray-900 text-white border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-300"
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              `}
            />
          </div>
          {/* User Info */}
          <div>
            <p className="font-semibold">
              Hello, <span className="text-indigo-400">{username || "Admin"}</span>
            </p>
          </div>
        </div>

        {/* Stats Row #1: totalUsers, totalJobPosts, totalApplications */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Total Users */}
          <div
            className={`
              p-4 rounded-xl shadow flex items-center gap-3
              ${darkMode ? "bg-gray-900" : "bg-white"}
            `}
          >
            <div className="text-blue-400 text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-xl font-bold">{dashboardStats.totalUsers}</p>
              <p className="text-sm text-gray-400">Total Users</p>
            </div>
          </div>

          {/* Total Job Posts */}
          <div
            className={`
              p-4 rounded-xl shadow flex items-center gap-3
              ${darkMode ? "bg-gray-900" : "bg-white"}
            `}
          >
            <div className="text-green-400 text-2xl">
              <FaBriefcase />
            </div>
            <div>
              <p className="text-xl font-bold">{dashboardStats.totalJobPosts}</p>
              <p className="text-sm text-gray-400">Total Job Posts</p>
            </div>
          </div>

          {/* Total Applicants */}
          <div
            className={`
              p-4 rounded-xl shadow flex items-center gap-3
              ${darkMode ? "bg-gray-900" : "bg-white"}
            `}
          >
            <div className="text-purple-400 text-2xl">
              <FaChartLine />
            </div>
            <div>
              <p className="text-xl font-bold">{dashboardStats.totalApplications}</p>
              <p className="text-sm text-gray-400">Total Applicants</p>
            </div>
          </div>
        </div>

        {/* Single Card Row: Active Jobs */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Active Jobs */}
          <div
            className={`
              p-4 rounded-xl shadow flex items-center gap-3
              ${darkMode ? "bg-gray-900" : "bg-white"}
            `}
          >
            <div className="text-purple-400 text-2xl">
              <FaChartLine />
            </div>
            <div>
              <p className="text-xl font-bold">{dashboardStats.activeJobs}</p>
              <p className="text-sm text-gray-400">Active Jobs</p>
            </div>
          </div>
        </div>

        {/* Map & Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Map */}
          <div
            className={`
              p-4 rounded-xl shadow
              ${darkMode ? "bg-gray-900" : "bg-white"}
            `}
          >
            <h2 className="text-lg font-bold mb-3">Jobs by County (Map)</h2>
            <div
              ref={mapContainerRef}
              style={{ height: "300px" }}
              className="rounded-lg overflow-hidden"
            />
          </div>
          {/* Bar Chart */}
          <div
            className={`
              p-4 rounded-xl shadow
              ${darkMode ? "bg-gray-900" : "bg-white"}
            `}
          >
            <h2 className="text-lg font-bold mb-3">Jobs by County (Chart)</h2>
            <div className="h-64">
              <Bar data={{
                labels: countyData.map((c) => c.county),
                datasets: [
                  {
                    label: "Job Posts",
                    data: countyData.map((c) => c.jobPostCount),
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    borderColor: "rgba(99, 102, 241, 1)",
                    borderWidth: 1,
                  },
                ],
              }} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* All Jobs (admin can only view) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">All Jobs</h2>
            <button className="text-indigo-400 hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <div
                key={job.jobPostId}
                className={`
                  p-4 rounded-xl shadow
                  ${darkMode ? "bg-gray-900" : "bg-white"}
                `}
              >
                <h3 className="font-semibold text-base mb-1">{job.title}</h3>
                <p className="text-sm text-gray-400">
                  {job.address || "No address"} • Status: {job.status}
                </p>
                <button
                  onClick={() => navigate(`/myJob/${job.jobPostId}`)}
                  className="mt-3 text-sm text-indigo-400 hover:underline flex items-center gap-1"
                >
                  View Details <FaArrowRight />
                </button>
              </div>
            ))}
            {allJobs.length === 0 && (
              <p className="col-span-3 text-gray-400">No jobs found.</p>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achv) => (
              <div
                key={achv.id}
                className={`
                  p-4 rounded-xl shadow flex items-center gap-3
                  ${darkMode ? "bg-gray-900" : "bg-white"}
                `}
              >
                <FaTrophy className="text-yellow-400 text-2xl" />
                <div>
                  <h3 className="font-semibold text-base">{achv.title}</h3>
                  <p className="text-sm text-gray-400">{achv.description}</p>
                </div>
              </div>
            ))}
            {achievements.length === 0 && (
              <p className="col-span-3 text-gray-400">No achievements found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
