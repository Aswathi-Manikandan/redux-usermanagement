import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/admin/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      setSuccess("User created successfully.");
      setTimeout(() => {
        navigate("/admin/userlist");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Failed to create user:", error);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600  to-blue-200 text-white">
      <div className="p-8 bg-white/20 backdrop-blur-md rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create New User
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            className="p-3 rounded-lg bg-white/10 text-white border border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="p-3 rounded-lg bg-white/10 text-white border border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="p-3 rounded-lg bg-white/10 text-white border border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-lg transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
