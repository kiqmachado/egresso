import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdmAuth } from '../context/AdmContext';

const AdmRoute = ({ children }) => {
  const adm  = AdmAuth();
  console.log(adm)
  if (!adm || !adm.adm) {
    return <Navigate to='/depoimentos' />;
  }
  return children;
};

export default AdmRoute;