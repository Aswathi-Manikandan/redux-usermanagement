import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-600 text-white flex justify-center items-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">About User Management</h1>
        <p className="text-lg mb-6">
          This is a user management system built with MERN stack (MongoDB, Express, React, Node.js). It allows admins to manage users with features such as viewing, searching, creating, and deleting user data.
        </p>
        <p className="text-lg">
          The system includes role-based access, JWT authentication, and modern front-end technologies to ensure an efficient and user-friendly experience.
        </p>
      </div>
    </div>
  );
};

export default About;
