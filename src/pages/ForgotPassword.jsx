import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URI}/api/auth/forgot-password`, { email });
      alert("Reset link sent to your email!");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-sm text-white transition-transform transform hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-md">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded-xl bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          type="submit"
          className="w-full bg-white text-blue-700 font-semibold py-2 px-4 rounded-xl hover:bg-blue-100 transition-all duration-200 shadow-md"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
