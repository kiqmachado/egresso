import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Intro from '../pages/Intro';
import Formulario from '../pages/Formulario';
import Depoimentos from '../pages/Depoimentos';
import Usuario from '../pages/Usuario'
import { updateCurrentUser } from 'firebase/auth';

import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import { AuthContextProvider } from './../context/AuthContext';

function Routers() {

const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

const RequireAuth = ({ children }) => {
  return updateCurrentUser ? (children) : <Navigate to="login"/>
}
  
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
        <Route  path="/" element={<Intro/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route  path="/register" element={<Register/>}/>
          <Route  path="/depoimentos" element={<Depoimentos/>}/>

          <Route  path="/create" element={<ProtectedRoute><Formulario/></ProtectedRoute>}/>
          <Route  path="/usuario" element={<ProtectedRoute><Usuario/></ProtectedRoute>}/>

        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default Routers;
