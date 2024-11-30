import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profilePicture, setProfilePicture] = useState(currentUser?.profilePicture || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to file input

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/sign-in", { replace: true });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Temporary preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await axios.put("/api/user/update", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300 py-10">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <div
            className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 cursor-pointer"
            onClick={handleProfilePictureClick}
          >
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M5 3L12 10L19 3" />
                <path d="M12 14V3" />
              </svg>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <h2 className="mt-4 text-3xl font-bold text-gray-800">{username}</h2>
        </div>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-60 text-gray-800 focus:ring focus:ring-blue-300"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-60 text-gray-800 focus:ring focus:ring-blue-300"
            />
          </div>
        </form>

        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Update
        </button>

        <button
          onClick={handleSignOut}
          className="mt-3 w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
