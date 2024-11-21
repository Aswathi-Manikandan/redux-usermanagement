import React from "react";

const Home = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
     
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-blue-400">User Management</span>
        </h1>
        <p className="text-lg max-w-2xl mb-6">
          Effortlessly manage your account, upload your profile picture, and update your details.
          Simplify your life with our intuitive platform.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg transition">
            Get Started
          </button>
          <button className="bg-gray-800 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
