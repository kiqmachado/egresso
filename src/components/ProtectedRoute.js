import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { AdmAuth } from '../context/AdmContext';

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;