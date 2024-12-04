import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// User pages and components
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";

// Admin pages and components
import AdminHeader from './components/Admin/Header'
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUserList from "./pages/Admin/UserList";
import AdminSignin from "./pages/Admin/Signin";
import AdminSignup from "./pages/Admin/Signup";
import CreateUser from "./pages/Admin/createUser";
import AdminPrivateRoute from "./components/Admin/AdminPrivateRoute";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? children : <Navigate to="/sign-in" />;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally render Header based on route */}
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="signin" element={<AdminSignin />} />
          <Route path="signup" element={<AdminSignup />} />

          {/* Admin Protected Routes */}
          <Route element={<AdminPrivateRoute />}>
            <Route path="userlist" element={<AdminUserList />} />
            <Route path="createUser" element={<CreateUser />} />
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
