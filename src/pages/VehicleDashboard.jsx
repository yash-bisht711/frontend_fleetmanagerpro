import React, { useEffect, useState } from "react";
import axios from "axios";
import AddVehicleForm from "../componenets/vehicles/AddVehicleForm";
import VehicleList from "../componenets/vehicles/VehicleList";
import VehicleMap from "../componenets/vehicles/VehicleMap";

const VehicleDashboard = ({ token, role }) => {
  const [vehicles, setVehicles] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URI;

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/vehicles/getAllVehicles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch vehicles");
    }
  };

  const addVehicle = (vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/vehicles/deleteVehicle/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete vehicle");
    }
  };

  const updateVehicle = async (id) => {
    const lat = prompt("Enter new latitude:");
    const lng = prompt("Enter new longitude:");
    if (!lat || !lng) return alert("Latitude and Longitude are required");

    try {
      const res = await axios.put(
        `${BASE_URL}/api/vehicles/updateVehicle/${id}`,
        { location: { lat: parseFloat(lat), lng: parseFloat(lng) } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = res.data;
      setVehicles((prev) =>
        prev.map((v) => (v._id === id ? updated : v))
      );
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update vehicle");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-white">
          🚗 Vehicle Management Dashboard
        </h2>

        {(role === "admin" || role === "manager") && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow transition-all">
            <AddVehicleForm token={token} onAdd={addVehicle} />
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow transition-all">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            🚘 Vehicle List
          </h3>
          <VehicleList
            vehicles={vehicles}
            token={token}
            role={role}
            onDelete={deleteVehicle}
            onUpdate={updateVehicle}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow transition-all">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            🗺️ Vehicle Map
          </h3>
          <VehicleMap vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDashboard;
