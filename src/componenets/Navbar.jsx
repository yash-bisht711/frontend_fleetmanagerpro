import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-white bg-blue-600 px-4 py-2 rounded font-semibold'
      : 'text-gray-700 hover:text-white hover:bg-blue-500 px-4 py-2 rounded transition';

  return (
    <nav className="bg-gray-100 shadow-md p-4 flex gap-4 justify-center">
        <NavLink to="/" className={navLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/DriverDashboard" className={navLinkStyle}>
        Driver Dashboard
      </NavLink>
      <NavLink to="/MaintenanceDashboard" className={navLinkStyle}>
        Maintenance
      </NavLink>
      <NavLink to="/vehiclesDashBoard" className={navLinkStyle}>
        Vehicle Dashboard
      </NavLink>
      <NavLink to="/LeafletRoutePlanner" className={navLinkStyle}>
        Route Planner
      </NavLink>
      {/* For fuel, we'll navigate with a dynamic vehicleId elsewhere */}
    </nav>
  );
};

export default Navbar;
