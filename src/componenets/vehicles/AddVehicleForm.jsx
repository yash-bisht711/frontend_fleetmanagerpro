import React, { useState } from "react";

const AddVehicleForm = ({ token, onVehicleAdded }) => {
  const [form, setForm] = useState({
    make: "",
    model: "",
    licensePlate: "",
    mileage: "",
    lat: "",
    lng: "",
    status: "active",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    console.log("Submitting with token:", token);

    const res = await fetch(`${import.meta.env.VITE_BASE_URI}/api/vehicles/addVehicles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Vehicle added successfully!");
      onVehicleAdded();
      setForm({
        make: "",
        model: "",
        licensePlate: "",
        mileage: "",
        lat: "",
        lng: "",
        status: "active",
      });
      setImage(null);
      setPreview(null);
    } else {
      alert(data.msg || "❌ Failed to add vehicle.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 mt-6 sm:mt-10 w-full"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        ➕ Add New Vehicle
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="make"
          placeholder="Make"
          value={form.make}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="licensePlate"
          placeholder="License Plate"
          value={form.licensePlate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="mileage"
          placeholder="Mileage"
          type="number"
          value={form.mileage}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="lat"
          placeholder="Latitude"
          value={form.lat}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="lng"
          placeholder="Longitude"
          value={form.lng}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {preview && (
        <div className="flex justify-center mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 rounded border border-gray-300 shadow-md"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicleForm;
