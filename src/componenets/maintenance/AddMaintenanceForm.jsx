import React, { useState } from 'react';
import axios from 'axios';

const AddMaintenanceForm = ({ vehicleId = "", token = "" }) => {
  const [formData, setFormData] = useState({
    vehicleId: vehicleId,
    type: '',
    date: '',
    mileage: '',
    notes: '',
  });
  console.log(token,vehicleId)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vehicleId || !formData.type || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    try {
        console.log(token)
      const response = await axios.post(
        'http://localhost:3000/api/maintenance/addMaintenance',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Maintenance added:', response.data);
      alert('Maintenance added successfully');
      setFormData({ vehicleId: vehicleId, type: '', date: '', mileage: '', notes: '' }); // Keep vehicleId
    } catch (error) {
      console.error('Error adding maintenance:', error.response?.data || error.message);
      alert('Error: ' + (error.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-bold mb-4">Add Maintenance</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Maintenance Type*</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date*</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Mileage (km)</label>
        <input
          type="number"
          name="mileage"
          value={formData.mileage}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddMaintenanceForm;
