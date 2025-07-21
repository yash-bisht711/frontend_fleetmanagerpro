import React from "react";
import { format } from "date-fns";

const MaintenanceHistory = ({ maintenances = [], onRefresh }) => {
  const safeMaintenances = Array.isArray(maintenances) ? maintenances : [];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Maintenance History</h3>

      {safeMaintenances.length === 0 ? (
        <p className="text-sm text-gray-500">No maintenance records found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {safeMaintenances.map((m) => (
            <li key={m._id || m.id} className="py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-blue-600">{m.type || "Unknown Type"}</p>
                  <p className="text-sm text-gray-500">
                    {m.scheduledDate ? format(new Date(m.scheduledDate), "dd MMM yyyy") : "No date"}
                    {m.mileage ? ` · ${m.mileage} km` : ""}
                  </p>
                  {m.notes && (
                    <p className="text-sm text-gray-600 italic">"{m.notes}"</p>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    m.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {m.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MaintenanceHistory;
