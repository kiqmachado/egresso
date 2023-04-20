import React, { useEffect, useState } from 'react';
import {  onAuthStateChanged, signOut} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth, db } from './../../firebase-config'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';


function Depoimentos({ isAuth }) {

  const navigate = useNavigate();

  const [depoimentos, setDepoimentos] = useState([])
  const formularioClienteRef = collection (db, "formularioCliente");


  const getDepoimentos = async () => {
    try {
      console.log(auth.currentUser.uid)
      const data = await getDocs(formularioClienteRef);
      setDepoimentos(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepoimento = async (id) => {
    const userDoc = doc(db, "formularioCliente", id)
    await deleteDoc(userDoc);
    getDepoimentos();
  };

  useEffect(() => {
    console.log("Effect called");
    getDepoimentos();
  }, []);


  return (
    <div >
      {depoimentos.map((post) => {
              console.log(depoimentos);
          return (
          <div className='post'> 
              <div className="relatoHeader">
               <h3> {post.autor.id} </h3> 
            </div>
            <div className="relatoContainer"> {post.relato} </div>,
            <div className="deletePost">
              {post.autor.id === auth.currentUser.uid && (
              
              <button onClick={()=>{deleteDepoimento(post.id)}}>X</button>)
              }
            </div>
          </div>
    )})}
    </div>)
  }

export default Depoimentos;
