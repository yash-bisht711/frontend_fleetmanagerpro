import React, { useState } from "react";
import UpdateVehicleModal from "./UpdateVehicleModal";
import { useNavigate } from "react-router-dom";

const VehicleList = ({ vehicles = [], token, fetchVehicles, role }) => {
  const [editingVehicle, setEditingVehicle] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      console.log(token, id);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URI}/api/vehicles/deleteVehicle/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to delete vehicle");
      }

      alert("✅ Vehicle deleted successfully");
      fetchVehicles();
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        🚚 Vehicle List
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-gray-500 text-center">No vehicles found.</p>
      ) : (
        <div className="grid gap-6">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                {v.image ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URI}${v.image}`}
                    alt={v.licensePlate}
                    className="w-24 h-24 object-cover rounded-md border border-gray-300"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 border border-gray-300">
                    No Image
                  </div>
                )}

                <div>
                  <p className="text-xl font-bold text-gray-800">
                    {v.make} {v.model}
                  </p>
                  <p className="text-sm text-gray-600">
                    License: {v.licensePlate || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span className="capitalize text-blue-600">{v.status}</span>
                  </p>
                </div>
              </div>

              {role !== "driver" && (
                <div className="flex gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => setEditingVehicle(v)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate("/MaintenanceDashboard", {
                        state: { vehicleId: v._id, token },
                      })
                    }
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm transition"
                  >
                    🛠️ Add Maintenance
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editingVehicle && (
        <UpdateVehicleModal
          vehicle={editingVehicle}
          token={token}
          onClose={() => setEditingVehicle(null)}
          onUpdated={fetchVehicles}
          isOpen={true}
        />
      )}
    </div>
  );
};

export default VehicleList;
