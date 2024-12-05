import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSigninStart, adminSigninSuccess, adminSigninFailure } from "../../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { loading, error, isAdmin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.password) {
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

    dispatch(adminSigninStart());

    try {
      const res = await fetch("/api/admin/auth/adminSignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(adminSigninFailure(data.message || "Admin sign-in failed"));
      } else {
        dispatch(adminSigninSuccess(data));
        navigate("/admin/dashboard");
      }
    } catch (error) {
      dispatch(adminSigninFailure("Network error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-400 to-gray-800 p-6">
      <div className="flex bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/53/1b/7f/531b7fe34ce863dc54b3942306eab7b7.jpg')",
          }}
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-3xl text-center font-semibold text-white mb-6">
            Admin Sign In
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                className="bg-gray-600/30 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
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
                className="bg-gray-600/30 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
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
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="flex gap-2 mt-5 justify-center">
            <p className="text-gray-300">Don't Have an Account?</p>
            <Link to="/admin/signup">
              <span className="text-black hover:text-gray-200">Sign-Up</span>
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

export default Signin;
