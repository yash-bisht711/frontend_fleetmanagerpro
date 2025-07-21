import { useState } from "react";
import axios from "axios";

export default function DriverForm({ token, fetchDrivers }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    licenseNumber: "",
    email: "",
    assignedVehicle: "",
    drivingHistory: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHistoryChange = (index, field, value) => {
    const updatedHistory = [...form.drivingHistory];
    updatedHistory[index][field] = value;
    setForm({ ...form, drivingHistory: updatedHistory });
  };

  const addHistoryEntry = () => {
    setForm({
      ...form,
      drivingHistory: [
        ...form.drivingHistory,
        { date: "", incident: "", score: "" },
      ],
    });
  };

  const removeHistoryEntry = (index) => {
    const updated = form.drivingHistory.filter((_, i) => i !== index);
    setForm({ ...form, drivingHistory: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/drivers/addDriver`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDrivers();
      setForm({
        name: "",
        phone: "",
        licenseNumber: "",
        email: "",
        assignedVehicle: "",
        drivingHistory: [],
      });
    } catch (error) {
      console.error("Error adding driver:", error.response?.data?.message || error.message);
      alert("Failed to add driver.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-lg space-y-4">
      <h2 className="text-lg font-bold">Add Driver</h2>

      {["name", "phone", "licenseNumber", "email", "assignedVehicle"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      ))}

      <div className="space-y-2">
        <h3 className="font-semibold">Driving History</h3>
        {form.drivingHistory.map((entry, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center">
            <input
              type="date"
              value={entry.date}
              onChange={(e) => handleHistoryChange(index, "date", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              placeholder="Incident"
              value={entry.incident}
              onChange={(e) => handleHistoryChange(index, "incident", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Score"
              value={entry.score}
              onChange={(e) => handleHistoryChange(index, "score", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => removeHistoryEntry(index)}
              className="text-red-500 text-sm col-span-3 text-left"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addHistoryEntry}
          className="text-blue-600 underline"
        >
          + Add History Entry
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Add Driver
      </button>
    </form>
  );
}
