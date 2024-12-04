import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { isAdmin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/auth/adminSignout"); // Changed to '/api'
      // Clear user state in Redux
      navigate("/admin/signin"); // Redirect to sign-in
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/admin/dashboard">
          <h1 className="font-bold">User Management Admin</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/admin/dashboard">
            <li>Dashboard</li>
          </Link>
          {isAdmin && (
            <Link to="/admin/userlist">
              <li>User List</li>
            </Link>
          )}
          {isAdmin ? (
            <li onClick={handleSignOut} className="cursor-pointer">
              Sign-Out
            </li>
          ) : (
            <Link to="/admin/signin">
              <li>Sign-In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
