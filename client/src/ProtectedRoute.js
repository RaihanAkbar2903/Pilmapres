// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Komponen ProtectedRoute untuk memeriksa token
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token'); // Cek token di localStorage

  // Jika token tidak ada, arahkan ke halaman login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
