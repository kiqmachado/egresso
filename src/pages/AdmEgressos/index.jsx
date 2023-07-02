import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  db } from '../../firebase-config'
import { getDocs, collection, doc, setDoc, deleteDoc, getDoc, orderBy, query, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from './../../components/Footer';

import './../../css/stylesAdmAprovar.css'
import defaultImage from '../../image/defaultImage';


function AdmDepoimentos(  ) {

    
  const navigate = useNavigate();
  const authorization = UserAuth();


  const [usuario, setUsuario] = useState()
  const [depoimentos, setDepoimentos] = useState([])
  const [load, setLoad] = useState(false)

  const usersRef = collection (db, "users");
  const depoimentosPendentesRef = collection (db, "depoimentosPendentes");
  const depoimentosRef = collection (db, "depoimentos");

  const handleItem = async (postId, result) => {
    const docRef = doc(depoimentosPendentesRef, postId);
    const destinoRef = doc(depoimentosRef, postId);
    const userDocRef = doc(db, 'users', postId);
    const userDoc = await getDoc(userDocRef);

    const usuario = ({...userDoc.data() });

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if(result){
          await setDoc(destinoRef,{
              usuario: {name: usuario.name.toUpperCase(), email: usuario.email, phone: usuario.phone, linkedin: usuario.linkedin, 
              instagram: usuario.instagram, facebook: usuario.facebook, imageURL: usuario.imageURL},
              relato: { perguntas: data.relato.perguntas, respostas: data.relato.respostas}, 
              faculdade:{curso: data.faculdade.curso, ano: data.faculdade.ano}, date: data.date
          }
      )

          await deleteDoc(docRef);
        }
        else{
          await deleteDoc(docRef);
        }

        
        // Atualizar o estado depoimentos e users após excluir o documento
        setDepoimentos((prevDepoimentos) =>
        prevDepoimentos.filter((depoimento) => depoimento.id !== postId)
        );
      
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getDepoimentos = async () => {
    try {
      const querySnapshot = await query(depoimentosPendentesRef, orderBy('date', 'desc'));
      const data = await getDocs(querySnapshot);
      setDepoimentos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoad(true);
    } catch (err) {
    }
  };
  useEffect(() => {
    getDepoimentos();
  }, []);


  if(!load){
      return(<></>)
}


return (  
    <div>
        <header id="header" ><Header/></header>
        <main id="aprovarAdm">
          <div className="containerAdm">
            <div className="divTopAdm">
              <div className="tituloAdm">
                <div className="linhaAdm" />
                <h1>Egressos</h1>
                <div className="linhaAdm" />
              </div>
            </div>

     
            <div className="mainAdm">
            {depoimentos.length>0? (
              <div className="aprovarAdm">
                <div className="tituloAprovar">
                  <h2>Egressos para aprovação</h2>
                </div>

                

        {depoimentos.map((post, index) => { 

            if (!post || !post.relato) {
            return null;
            }

            const perguntas = Array.isArray(post.relato.perguntas) ? post.relato.perguntas : [post.relato.perguntas];
            const respostas = Array.isArray(post.relato.respostas) ? post.relato.respostas : [post.relato.respostas];
            const perguntasRespostas = [];
            
            for (let i = 0; i < perguntas.length; i++) {
            perguntasRespostas.push(<p key={`p-${i}`}><b>{perguntas[i]}</b></p>);

            if (respostas[i]) {
            perguntasRespostas.push(<p key={`r-${i}`}>{respostas[i]}</p>);
            } else {
            perguntasRespostas.push(<p key={`r-${i}`}></p>);
            console.log(perguntasRespostas)
            }
            }
            return (

          

              <div key={index} className="alunoAdm">
                <div className="alunoAdmEsq">
                <h3>{post.usuario?.name || "CONTA EXCLUIDA"}</h3>
                  <img className="imgAlunoAdm" src={post.usuario?.imageURL || defaultImage} />
                  <h4>{(post.faculdade.curso).toUpperCase()}</h4>
                  <a>{post.faculdade.ano}</a>
                </div>
                <div className="alunoAdmCentro">
                  <div className="textoAdm">
                    <p>
                      {perguntasRespostas}
                    </p>
                    <div className="dataAttAdm">
                      <p>Atualizado em: {post.date}</p>
                    </div>
                  </div>
                </div>
                <div className="alunoAdmDir">
                  <div className="Aprovar">
                    <button className="AprovarBtn" type="button">
                      {" "}
                      <img className="imgAdm" onClick={()=>{handleItem(post.id, true)}} src={require('../../image/aprovar.png')} />
                    </button>
                  </div>
                  <div className="Reprovar">
                    <button className="ReprovarBtn" type="button">
                      {" "}
                      <img className="imgAdm" onClick={()=>{handleItem(post.id, false)}} src={require('../../image/reprovar.png')} />
                    </button>
                  </div>
                </div>
              </div>
          )})}
      </div>
           ):(
            <div className="semEgressosParaAprovar">
              <img className="semEgressosParaAprovarImg" src={require('../../image/gifs/pensativo.gif')} alt="Sem Egressos para aprovar gif" />
              <p className="semEgressosParaAprovarP">Ops, não há Egressos para serem aprovados ainda. Volte mais tarde!!!</p>
              <button onClick={() => navigate('/adm')} className="semEgressosParaAprovarBtn">Voltar</button>
            </div>
           )
          }

    </div>
  </div>
</main>
<footer id="footer" ><Footer/></footer>
        </div> 
  );
}

export default AdmDepoimentos;