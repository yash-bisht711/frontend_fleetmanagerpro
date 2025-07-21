import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VehicleDashboard from './pages/VehicleDashboard'; 
import Home from "./pages/Home";
import DriverDashboard from "./pages/DriverDashboard";
import LeafletRoutePlanner from "./componenets/routeOptimise/LeafletRoutePlanner";
import MaintenanceDashboard from "./pages/MaintenanceDashboard";
import FuelDashboard from "./pages/FuelDashboard";
import Navbar from "./componenets/Navbar";


function App() {
  const userToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  console.log(userToken,userRole)
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/MaintenanceDashboard" element={<MaintenanceDashboard />} />
        <Route path="/fuel/:vehicleId" element={<FuelDashboard token={userToken}/>} />
        <Route path="/LeafletRoutePlanner" element={<LeafletRoutePlanner />} />
        <Route path="/vehiclesDashBoard" element={<VehicleDashboard token={userToken} role={userRole} />}/>
      </Routes>
    </Router>
  );
}

export default App;
