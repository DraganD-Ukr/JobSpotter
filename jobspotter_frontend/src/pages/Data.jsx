import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Data() {
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "User Registrations",
        data: [50, 75, 150, 100, 200],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
// not implemented 

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Analytics Data</h2>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" }}}}/>
      </div>
    </div>
  );
}
