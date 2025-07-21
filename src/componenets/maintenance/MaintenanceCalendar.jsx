import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MaintenanceCalendar = ({ records = [] }) => {
  // Convert all scheduled dates to string format for comparison
  const maintenanceDates = records.map((m) =>
    new Date(m.scheduledDate).toDateString()
  );

  // Highlight maintenance dates on the calendar
  const tileClassName = ({ date }) => {
    if (maintenanceDates.includes(date.toDateString())) {
      return "bg-blue-500 text-white rounded-full";
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Maintenance Calendar</h3>
      <Calendar
        tileClassName={tileClassName}
        className="w-full"
      />
      <p className="mt-3 text-sm text-gray-500">
        Blue dots indicate scheduled maintenance.
      </p>
    </div>
  );
};

export default MaintenanceCalendar;
