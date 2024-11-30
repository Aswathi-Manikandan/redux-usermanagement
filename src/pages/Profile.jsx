import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/sign-in", { replace: true });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "/api/user/update",
        { username, email },
        { withCredentials: true }
      );
      const updatedUser = response.data.user;
      dispatch(updateUser(updatedUser));
      setMessage("User updated successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      setMessage("");
    }
  };

  if (!currentUser) {
    navigate("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-10">
      <div className="bg-white bg-opacity-60 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-md w-full">
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={currentUser.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
        </div>

        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form className="mt-4 space-y-4 bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-gray-700"
            />
          </div>
        </form>

        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>

        <button
          onClick={handleSignOut}
          className="mt-2 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
