import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // ✅ Step 1
import axios from "axios";

function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate(); // ✅ Step 2

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URI}/api/auth/reset-password?token=${token}`, { newPassword });
      alert("Password has been reset");
      navigate("/"); // ✅ Now this will work
    } catch (err) {
      alert(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-sm text-white transition-transform transform hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-md">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded-xl bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          type="submit"
          className="w-full bg-white text-purple-700 font-semibold py-2 px-4 rounded-xl hover:bg-purple-100 transition-all duration-200 shadow-md"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
