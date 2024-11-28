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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src={currentUser.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
        </div>
        <form className="mt-4 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={currentUser.username}
              className="w-full p-2 rounded-md border border-gray-300"
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
              className="w-full p-2 rounded-md border border-gray-300"
              disabled
            />
          </div>
        </form>
        <button
          onClick={handleSignOut}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
