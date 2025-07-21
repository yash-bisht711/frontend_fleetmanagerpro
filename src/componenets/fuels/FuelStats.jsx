import React, { useEffect, useState } from "react";

const FuelStats = ({ vehicleId, token }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URI}/api/fuel/stats/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, [vehicleId, token]);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 border rounded bg-white">
      <h3 className="text-xl font-bold mb-2">Fuel Statistics</h3>
      <p>Total Trips: {stats.totalTrips}</p>
      <p>Total Distance: {stats.totalDistance} km</p>
      <p>Total Fuel Used: {stats.totalFuel} liters</p>
      <p>Avg. Efficiency: {stats.avgEfficiency} km/l</p>
    </div>
  );
};

export default FuelStats;
