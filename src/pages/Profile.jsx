import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/sign-in", { replace: true });
  };

  if (!currentUser) {
    navigate("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-10">
      <div className="bg-white bg-opacity-60 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src={currentUser.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{currentUser.username}</h2>
          <p className="text-sm text-gray-600">{currentUser.email}</p>
        </div>

        {/* Glassy form section */}
        <form className="mt-4 space-y-4 bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={currentUser.username}
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-gray-700"
              disabled
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={currentUser.email}
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-gray-700"
              disabled
            />
          </div>
        </form>

        <button
          onClick={handleSignOut}
          className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-black transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
