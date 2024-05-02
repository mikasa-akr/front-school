import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRoles }) => {
  // Retrieve user role from local storage
  const userRole = localStorage.getItem('roles');

  // Check if user has any of the required roles
  const hasRequiredRoles = userRole && requiredRoles.some(role => userRole.includes(role));

  // Render the component only if the user has any of the required roles
  return hasRequiredRoles ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;