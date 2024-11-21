// PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  // If there's a currentUser, render the children (outlet)
  // Otherwise, redirect to sign-in page
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
