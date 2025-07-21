// import React, { useState, useEffect } from "react";
// import AddMaintenanceForm from "./AddMaintenanceForm";
// import MaintenanceCalendar from "./MaintenanceCalendar";
// import MaintenanceHistory from "./MaintenanceHistory";
// import axios from "axios";

// const MaintenanceDashboard = ({ vehicleId }) => {
//   const [maintenances, setMaintenances] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchMaintenances = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/maintenances/${vehicleId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMaintenances(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to fetch maintenances:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMaintenances();
//   }, [vehicleId]);

//   const handleAdd = (newEntry) => {
//     setMaintenances(prev => [newEntry, ...prev]);
//   };

//   const handleUpdate = () => {
//     fetchMaintenances();
//   };

//   return (
//     <div className="p-6 space-y-6 bg-gray-100 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold text-center text-blue-700">Maintenance Dashboard</h2>

//       <AddMaintenanceForm vehicleId={vehicleId} onAdd={handleAdd} />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//         <MaintenanceCalendar maintenances={maintenances} />
//         <MaintenanceHistory maintenances={maintenances} onRefresh={handleUpdate} />
//       </div>
//     </div>
//   );
// };

// export default MaintenanceDashboard;

// src/components/MaintenanceDashboard.jsx

import React, { useEffect, useState } from "react";
import AddMaintenanceForm from "../componenets/maintenance/AddMaintenanceForm";
import MaintenanceCalendar from "../componenets/maintenance/MaintenanceCalendar";
import MaintenanceHistory from "../componenets/maintenance/MaintenanceHistory";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MaintenanceDashboard = () => {
  const location = useLocation();
  const vehicleIdFromState = location.state?.vehicleId || null;
  const tokenFromState = location.state?.token || localStorage.getItem("token");

  const [vehicleId, setVehicleId] = useState(vehicleIdFromState);
  const [token, setToken] = useState(tokenFromState);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!vehicleId || !token) return;

    const fetchMaintenance = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/maintenances/${vehicleId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMaintenanceRecords(res.data);
      } catch (err) {
        console.error("Error fetching maintenance records:", err);
      }
    };

    fetchMaintenance();
  }, [vehicleId, token, refresh]);

  const handleRefresh = () => setRefresh((prev) => !prev);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        🛠️ Maintenance Dashboard
      </h2>

      <AddMaintenanceForm
        vehicleId={vehicleId}
        token={token}
        onMaintenanceAdded={handleRefresh}
      />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            📅 Calendar View
          </h3>
          <MaintenanceCalendar maintenances={maintenanceRecords} />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            📜 Maintenance History
          </h3>
          <MaintenanceHistory maintenances={maintenanceRecords} onRefresh={handleRefresh} />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;