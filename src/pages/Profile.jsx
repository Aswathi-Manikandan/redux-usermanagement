import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSignOut = () => {
    dispatch(logout()); // Clear Redux state
    navigate("/sign-in", { replace: true }); // Redirect to sign-in page
  };

  return (
    <div className="p-3 max-w-lg mx-auto gap-4">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Profile Picture */}
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={handleFileClick}
        />

        {/* Username */}
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />

        {/* Email */}
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />

        {/* Update Button */}
        <button
          type="button"
          className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-100 disabled:opacity-90"
        >
          Update
        </button>
      </form>

      {/* Additional Actions */}
      <div className="flex justify-between mt-5">
       
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
