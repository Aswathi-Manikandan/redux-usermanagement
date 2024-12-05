import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-gray-600  to-blue-200 p-6 mt-16">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700">
        {/* Header Section */}
        <header className="p-8 border-b border-gray-600">
          <h1 className="text-4xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-700 text-lg">
            Welcome back! Manage your tasks and oversee operations effectively.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Section 1 */}
          <section className="flex items-center space-x-6">
            <img
              src="https://i.pinimg.com/736x/90/f5/7c/90f57c63c351633618235ef551a41feb.jpg"
              alt="User Management"
              className="w-25 h-24 rounded-full shadow-lg border-2 border-gray-600"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white">User Management</h2>
              <p className="mt-2 text-gray-700">
                View and manage user accounts seamlessly.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex items-center space-x-6">
            <img
              src="https://i.pinimg.com/736x/84/c9/12/84c912249206391c54d819386d0558de.jpg"
              alt="Performance Metrics"
              className="w-25 h-24 rounded-full shadow-lg border-2 border-gray-600"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white">Performance Metrics</h2>
              <p className="mt-2 text-gray-700">
                Gain insights into platform performance.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex items-center space-x-6">
            <img
              src="https://i.pinimg.com/736x/fa/77/3d/fa773dcf6fc691075e1121e506392315.jpg"
              alt="Notifications"
              className="w-25 h-24 rounded-full shadow-lg border-2 border-gray-600"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white">Notifications</h2>
              <p className="mt-2 text-gray-700">
                Stay updated with the latest alerts.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Section */}
        <footer className="p-6 border-t border-gray-600 text-center text-sm text-gray-400">
          © 2024 Admin Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
