// components/AnalyticsDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <p className="text-center">Loading reports...</p>;

  const vehicleLabels = data.vehiclePerformance.map((v) => v.vehicleId);
  const efficiencyData = data.vehiclePerformance.map((v) => v.efficiency);
  const fuelUsed = data.vehiclePerformance.map((v) => v.fuelUsed);

  const driverLabels = data.driverPerformance.map((d) => d.driverId);
  const ratings = data.driverPerformance.map((d) => d.rating);

  const maintenanceCosts = data.maintenanceHistory.map((m) => m.cost);
  const maintenanceLabels = data.maintenanceHistory.map(
    (m) => `${m.vehicleId} (${m.lastService})`
  );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Reports & Analytics</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Vehicle Efficiency (km/l)</h3>
          <Bar
            data={{
              labels: vehicleLabels,
              datasets: [
                {
                  label: "Efficiency",
                  data: efficiencyData,
                  backgroundColor: "#4ade80",
                },
              ],
            }}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Fuel Used (liters)</h3>
          <Line
            data={{
              labels: vehicleLabels,
              datasets: [
                {
                  label: "Fuel Used",
                  data: fuelUsed,
                  borderColor: "#60a5fa",
                  fill: true,
                  backgroundColor: "rgba(96,165,250,0.3)",
                },
              ],
            }}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Maintenance Costs (₹)</h3>
          <Bar
            data={{
              labels: maintenanceLabels,
              datasets: [
                {
                  label: "Cost",
                  data: maintenanceCosts,
                  backgroundColor: "#facc15",
                },
              ],
            }}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Driver Ratings</h3>
          <Pie
            data={{
              labels: driverLabels,
              datasets: [
                {
                  label: "Rating",
                  data: ratings,
                  backgroundColor: ["#34d399", "#f472b6", "#60a5fa", "#f87171"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
