import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/user/userSlice";

function Header() {
  const { currentUser, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-gray-500 via-gray-700 to-black opacity-95 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo Section */}
        <Link to="/admin/dashboard" className="flex items-center space-x-3">
          <img
            src="https://i.pinimg.com/736x/9f/f0/f5/9ff0f56a401ab1f4e952f45c4ed21ede.jpg"
            alt="User Management Logo"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <h1 className="font-bold text-2xl text-white hover:text-gray-200 transition duration-300">
            User Management Admin
          </h1>
        </Link>

        {/* Admin Dropdown */}
        <ul className="flex gap-6 text-white items-center">
          {isAdmin && currentUser ? (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-gray-200 transition duration-300 focus:outline-none"
              >
                Welcome, {currentUser.username || "Admin"}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-white/20 rounded-t-lg"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-white/20"
                    onClick={() => setShowDropdown(false)}
                  >
                    User List
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <Link to="/admin/signin" className="hover:text-gray-200 transition duration-300">
              <li>Sign-In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
