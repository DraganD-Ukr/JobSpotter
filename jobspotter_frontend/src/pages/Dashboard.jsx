import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { FaUsers, FaBriefcase, FaChartLine, FaMapMarkerAlt } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import L from "leaflet"; // Import Leaflet
import 'leaflet/dist/leaflet.css';
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Dashboard() {
  const { darkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [countyData, setCountyData] = useState([]);
  const mapContainerRef = useRef(null); // Reference for map container
  const mapRef = useRef(null); // Ref to hold the map instance

  useEffect(() => {
    // Fetch user info
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

    // Fetch county job post statistics
    fetch("/api/v1/job-posts/county-stats") // Replace with the correct API endpoint
      .then((res) => res.json())
      .then((data) => {
        setCountyData(data);
      })
      .catch((error) => console.error("Error fetching job post stats:", error));
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize map only if it hasn't been initialized yet
      const map = L.map(mapContainerRef.current).setView([53.349805, -6.26031], 6); // Center map on Ireland

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
      const maxBubbleSize = 30; // Max size of the bubble (smaller than before)
      const minBubbleSize = 8; // Min size of the bubble

      // Loop through each county and add a bubble marker with fixed sizes
      countyMarkers.forEach(({ county, lat, lon, jobPostCount }) => {
        const scaledSize = Math.max(minBubbleSize, Math.min(jobPostCount * 0.15, maxBubbleSize)); // Scale size based on jobPostCount

        L.circleMarker([lat, lon], {
          radius: scaledSize,
          fillColor: "#1E90FF", // Blue color for the bubble
          color: "#FFFFFF", // White border color
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

  // Prepare chart data
  const chartData = {
    labels: countyData.map((item) => item.county),
    datasets: [
      {
        label: "Job Posts by County",
        data: countyData.map((item) => item.jobPostCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`my-10 main-content min-h-screen p-4 border-1 rounded-4xl transition-all ease-in-out duration-500 
        ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-white to-gray-100 text-black"}`}
    >
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Dashboard</h1>
      <p className="mb-2">
        Welcome, {username ? username : "User"}, Here’s where you’ll manage users, posts, and more.
      </p>

      {/* Inner card container */}
      <div
        className={`p-6 rounded-xl ring-1 transition-all ease-in-out duration-500 shadow-lg 
          ${darkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-gray-200"}`}
      >
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>

        {/* Stats container */}
        <ul className="stats-container space-y-3">
          <li className="stat-item flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Admin Location</span>
          </li>
          <li className="stat-item flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors">
            <FaUsers className="text-purple-500" />
            <span>Total Users</span>
          </li>
          <li className="stat-item flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors">
            <FaBriefcase className="text-green-500" />
            <span>Total Job Posts</span>
          </li>
          <li className="stat-item flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 dark:bg-white/5 hover:shadow-sm transition-colors">
            <FaChartLine className="text-blue-500" />
            <span>Stats Overview</span>
          </li>
        </ul>

        <br />
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-3xl justify-center">Number of Jobs in Counties</h1>
        </div>

        {/* Map Container */}
        <div ref={mapContainerRef} style={{ height: "300px", marginTop: "20px" }}></div>

        {/* Chart */}
        <div className="mt-10">
          <Bar data={chartData} height={300} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}
