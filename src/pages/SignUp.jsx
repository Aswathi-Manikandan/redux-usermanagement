import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'; // Adjust the path as needed
import OAuth from "../components/OAuth"; // Assuming OAuth component handles Google Auth

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { loading, error } = useSelector((state) => state.user); // Access user state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart()); // Dispatch start action

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occurred during sign up');
      }

      const data = await res.json();
      dispatch(signInSuccess(data)); // Dispatch success action with user data
      console.log('Sign-up successful:', data);

      navigate('/'); // Navigate to the home page after successful signup
    } catch (err) {
      dispatch(signInFailure(err.message)); // Dispatch failure action with error message
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 text-white">
      <div className="flex shadow-lg rounded-lg bg-white overflow-hidden w-full max-w-4xl">

        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-6"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/736x/96/1e/20/961e20478c56469885db826f1c335fff.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 className="text-3xl font-bold">Join Us!</h1>
          <p className="mt-2 text-sm">Sign up to create an account and get started.</p>
          <a
            href="/sign-in"
            className="mt-6 px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-700"
          >
            Log In
          </a>
        </div>

        <div className="flex flex-col justify-center p-8 w-full md:w-1/2 bg-gray-100 text-gray-900">
          <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="email"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-700 transition"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4">
            <OAuth />
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <a href="/sign-in" className="text-gray-900 font-medium hover:underline">
              Log In
            </a>
          </p>

          {error && (
            <p className="mt-5 text-center p-3 rounded-lg bg-red-100 text-red-700 border border-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
