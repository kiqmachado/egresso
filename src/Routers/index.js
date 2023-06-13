import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Home from '../pages/Home';
import Formulario from '../pages/Formulario';
import Depoimentos from '../pages/Depoimentos';
import Usuario from '../pages/Usuario'
import TermosDeUso from '../pages/TermosDeUso';

import Adm from '../pages/Adm';
import AdmEgressos from '../pages/AdmEgressos';
import AdmQuestionario from '../pages/AdmQuestionario';

import RecuperaSenha from '../pages/RecuperaSenha';

import ProtectedRoute from '../components/ProtectedRoute';
import AdmRoute from '../components/AdmRoute';

import { AuthContextProvider } from './../context/AuthContext';
import { AdmContextProvider } from '../context/AdmContext';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/depoimentos" element={<Depoimentos />} />
        <Route path="/termos" element={<TermosDeUso />} />

        <Route element={<AuthContextProvider><Outlet /></AuthContextProvider>}>
          <Route path="/criar" element={<ProtectedRoute><Formulario /></ProtectedRoute>} />
          <Route path="/usuario" element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
        </Route>

        <Route path="/recuperarSenha" element={<RecuperaSenha />} />
        
        <Route element={<AdmContextProvider><Outlet /></AdmContextProvider>}>
       
          <Route exact path="/adm" element={<AdmRoute><Adm /></AdmRoute>} />
          <Route exact path="/adm/depoimentos" element={<AdmRoute><AdmEgressos /></AdmRoute>} />
          <Route exact path="adm/questionario" element={<AdmRoute><AdmQuestionario /></AdmRoute>} />
          <Route path="adm/*" element={<AdmRoute><Adm/></AdmRoute>} />
        </Route>
        
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Routers;