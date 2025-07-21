// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function DriverList({ token }) {
//   const [drivers, setDrivers] = useState([]);

//   const fetchDrivers = async () => {
//     const res = await axios.get("http://localhost:3000/api/drivers/getAllDrivers", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setDrivers(res.data);
//   };

//   const deleteDriver = async (id) => {
//     await axios.delete(`http://localhost:3000/api/drivers/deleteDriver/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchDrivers();
//   };

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-bold">Drivers</h2>
//       {drivers.map((driver) => (
//         <div key={driver._id} className="p-4 border rounded my-2 bg-gray-50">
//           <p><strong>{driver.name}</strong> | {driver.email}</p>
//           <p>Phone: {driver.phone} | License: {driver.licenseNumber}</p>
//           <p>Assigned: {driver.assignedVehicle}</p>
//           <p>History:</p>
//           <ul className="ml-4 list-disc">
//             {driver.drivingHistory.map((h, i) => (
//               <li key={i}>{h.date.slice(0, 10)} - {h.incident} - Score: {h.score}</li>
//             ))}
//           </ul>
//           <button
//             onClick={() => deleteDriver(driver._id)}
//             className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function DriverList({ token }) {
  const [drivers, setDrivers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchDrivers = async () => {
    const res = await axios.get("http://localhost:3000/api/drivers/getAllDrivers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDrivers(res.data);
  };

  const deleteDriver = async (id) => {
    await axios.delete(`http://localhost:3000/api/drivers/deleteDriver/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDrivers();
  };

  const startEdit = (driver) => {
    setEditingId(driver._id);
    setEditData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      assignedVehicle: driver.assignedVehicle,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    await axios.put(
      `http://localhost:3000/api/drivers/updateDriver/${id}`,
      editData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditingId(null);
    fetchDrivers();
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Drivers</h2>
      {drivers.map((driver) => (
        <div key={driver._id} className="p-4 border rounded my-2 bg-gray-50">
          {editingId === driver._id ? (
            <>
              <input
                className="block border px-2 py-1 mb-2"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
              <input
                className="block border px-2 py-1 mb-2"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
              <input
                className="block border px-2 py-1 mb-2"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
              />
              <input
                className="block border px-2 py-1 mb-2"
                name="licenseNumber"
                value={editData.licenseNumber}
                onChange={handleInputChange}
              />
              <input
                className="block border px-2 py-1 mb-2"
                name="assignedVehicle"
                value={editData.assignedVehicle}
                onChange={handleInputChange}
              />
              <button
                onClick={() => saveEdit(driver._id)}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>{driver.name}</strong> | {driver.email}</p>
              <p>Phone: {driver.phone} | License: {driver.licenseNumber}</p>
              <p>Assigned: {driver.assignedVehicle}</p>
              <p>History:</p>
              <ul className="ml-4 list-disc">
                {driver.drivingHistory.map((h, i) => (
                  <li key={i}>
                    {h.date.slice(0, 10)} - {h.incident} - Score: {h.score}
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => startEdit(driver)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDriver(driver._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
