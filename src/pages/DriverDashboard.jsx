import DriverForm from "../componenets/drivers/DriverForm";
import DriverList from "../componenets/drivers/DriverList";
import { useState } from "react";

export default function DriverDashboard() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
      <DriverForm token={token} fetchDrivers={() => {}} />
      <DriverList token={token} />
    </div>
  );
}
