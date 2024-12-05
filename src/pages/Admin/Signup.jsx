import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/admin/auth/adminSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(true);
      } else {
        navigate("/admin/signin");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-600 to-gray-800 p-6">
      <div className="flex bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/1f/45/45/1f4545da49d0e2b62ed8a09a3cb37303.jpg')",
          }}
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-3xl text-center font-semibold text-white mb-6">
            Admin Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={formData.username}
                className="bg-gray-900/30 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                onChange={handleChange}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                className="bg-gray-900/30 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={formData.password}
                className="bg-gray-900/30 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <button
              disabled={loading}
              className="bg-gray-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex gap-2 mt-5 justify-center">
            <p className="text-gray-300">Have an Account?</p>
            <Link to="/admin/signin">
              <span className="text-gray-400 hover:text-gray-200">Sign-In</span>
            </Link>
          </div>
          {error && (
            <p className="text-red-700 mt-5 text-center">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
