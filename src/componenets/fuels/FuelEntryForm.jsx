import React, { useState } from "react";

const FuelEntryForm = ({ vehicleId, token }) => {
  const [tripDistanceKm, setTripDistanceKm] = useState("");
  const [fuelUsedLiters, setFuelUsedLiters] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BASE_URI}/api/fuel/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vehicleId, tripDistanceKm, fuelUsedLiters }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.msg || "Failed to add");

    setResult(data.analysis);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4">Log Fuel Usage</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Trip Distance (km)"
          value={tripDistanceKm}
          onChange={(e) => setTripDistanceKm(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Fuel Used (liters)"
          value={fuelUsedLiters}
          onChange={(e) => setFuelUsedLiters(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-4 text-sm bg-gray-100 p-3 rounded">
          <p><strong>Expected:</strong> {result.expectedFuel} L</p>
          <p><strong>Actual:</strong> {result.actualFuel} L</p>
          <p><strong>Inefficient:</strong> {result.isInefficient ? "Yes" : "No"}</p>
          {result.suggestion && <p className="text-red-600"><strong>Suggestion:</strong> {result.suggestion}</p>}
        </div>
      )}
    </div>
  );
};

export default FuelEntryForm;
