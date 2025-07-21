import React, { useState } from "react";

const UpdateVehicleModal = ({ isOpen, onClose, vehicle, token, onUpdated }) => {
  const [form, setForm] = useState({
    make: vehicle.make || "",
    model: vehicle.model || "",
    licensePlate: vehicle.licensePlate || "",
    mileage: vehicle.mileage || 0,
    lat: vehicle.location?.lat ?? "",
    lng: vehicle.location?.lng ?? "",
    status: vehicle.status || "active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    // Basic validation
    if (!form.make || !form.model || !form.licensePlate) {
      alert("❌ Please fill out all required fields.");
      return;
    }

    if (isNaN(form.lat) || isNaN(form.lng)) {
      alert("❌ Please enter valid coordinates.");
      return;
    }

    setLoading(true);

    const body = {
      ...form,
      location: {
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
      },
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URI}/api/vehicles/updateVehicle/${vehicle._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Vehicle updated successfully!");
        onUpdated();
        onClose();
      } else {
        alert(data.msg || "❌ Failed to update vehicle.");
      }
    } catch (err) {
      alert("❌ Error while updating vehicle.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl mx-4 sm:mx-0 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Update Vehicle
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="make"
            value={form.make}
            onChange={handleChange}
            placeholder="Make"
            aria-label="Vehicle Make"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          />
          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model"
            aria-label="Vehicle Model"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          />
          <input
            type="text"
            name="licensePlate"
            value={form.licensePlate}
            onChange={handleChange}
            placeholder="License Plate"
            aria-label="License Plate"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          />
          <input
            type="number"
            name="mileage"
            value={form.mileage}
            onChange={handleChange}
            placeholder="Mileage"
            aria-label="Mileage"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          />
          <input
            type="text"
            name="lat"
            value={form.lat}
            onChange={handleChange}
            placeholder="Latitude"
            aria-label="Latitude"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          />
          <input
            type="text"
            name="lng"
            value={form.lng}
            onChange={handleChange}
            placeholder="Longitude"
            aria-label="Longitude"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            aria-label="Status"
            className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-700 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicleModal;
