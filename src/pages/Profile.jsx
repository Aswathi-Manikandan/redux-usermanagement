import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sign-out handler
  const handleSignOut = () => {
    dispatch(logout()); // Clear Redux state
    navigate("/sign-in", { replace: true });
  };

  // If currentUser is null, redirect to sign-in
  if (!currentUser) {
    navigate("/sign-in", { replace: true });
    return null;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-600 text-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-center my-4">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Profile Picture */}
        <div className="flex justify-center mb-3">
          <img
            src={currentUser.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt="profile"
            className="h-20 w-20 cursor-pointer rounded-full object-cover border-4 border-white hover:opacity-80 transition duration-200"
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
          <input
            defaultValue={currentUser.username || ""}
            type="text"
            id="username"
            placeholder="Username"
            className="w-full p-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            defaultValue={currentUser.email || ""}
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Update Button */}
        <button
          type="button"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
        >
          Update
        </button>
      </form>

      {/* Sign-out Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200 text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
