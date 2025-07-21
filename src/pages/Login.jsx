import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/api/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      alert("Welcome " + res.data.user.name);
      const {_id,role} = res.data.user
      console.log(role,res.data.user)
      navigate("/vehiclesDashBoard");
      // navigate("/DriverDashboard");
      // navigate("/LeafletRoutePlanner");
      // navigate("/MaintenanceDashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg text-white rounded-2xl shadow-xl p-8 w-full max-w-sm transition-all transform hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center drop-shadow-md">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-xl bg-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/40"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 rounded-xl bg-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/40"
        />

        <button
          type="submit"
          className="w-full bg-white text-indigo-700 font-semibold py-2 px-4 rounded-xl hover:bg-indigo-100 transition-all duration-200 shadow-md"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-white/80">
          Don't have an account?{" "}
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

        <p className="text-sm text-center mt-4 text-white/80">  
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
