import React, { useEffect, useState } from 'react';
import {  onAuthStateChanged, signOut} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase-config'
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import Header from '../../components/Header';




function FormularioCliente() {

  const navigate = useNavigate();
  const authorization = UserAuth();

  const [user, setUser] = useState({});
  const [texto, setTexto] = useState("");

  const formularioClienteRef = collection (db, "formularioCliente");

let yourDate = new Date()

  const createPost = async () => {
    await addDoc(formularioClienteRef, {relato: texto, autor:{name: auth.currentUser.displayName, id:auth.currentUser.uid}, date: yourDate.toISOString().split('T')[0] });
    navigate("/depoimentos");
  }
  

  return (
    <div>
      <h3>Bem vindo, {auth.currentUser?.email}, vamos criar um texto.</h3>

    
      <label>Pergunta</label>
      <textarea  type="text"  placeholder='Responda...' value={texto} onChange={(e)=>{setTexto(e.target.value)}} />
      <button onClick={createPost}><a>APERTA AI</a></button>
     
    </div>
    );
  }

export default FormularioCliente;
