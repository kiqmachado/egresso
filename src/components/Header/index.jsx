import React, { useEffect, useState } from 'react';
import './../../css/stylesHeaderFooter.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc} from 'firebase/firestore';

function getFirstName(fullName) {
  if (!fullName) return ''; // Verifica se o nome completo existe
  const parts = fullName.split(' '); // Divide a string em partes usando o espaço como separador
  return parts[0]; // Retorna a primeira parte (primeiro nome)
}

function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    const exit = await signOut(auth).then(() => {
      navigate('/login');
    });
  };

  return (
    <div>
      <header id="header">
        <div className="containerHeader">
          <div className="headerEsq">
            <div className="fotoLogo">
              <a href="/"><img src={require("./../../image/egresso.png")} alt="Logo Egresso"/></a>
            </div>
            <div className="nomeSite">
              <a href="/"><h1>Egresso</h1></a>
            </div>
          </div>

          <div className="headerDir">
            <div className="headerOpc">
              <div className="headerOpcHome"><a href="./">Home</a></div>
              <div className="headerOpcDepoimentos"><a href="./depoimentos">Egressos</a></div>

              {auth.currentUser !== null && (
                <div className='userNameLogin'>
                   <div className="headerNomeUsuario">
                        <a href="./usuario">
                            <b className='headerImagemUser'>
                            <img src={require("./../../image/usuario.png")} alt="Logo User" style={{ verticalAlign: "middle", display: "inline-block" }} /> 
                            <b>{getFirstName(auth.currentUser.displayName)}</b>
                            </b>
                        </a>
                    </div>

                  <div className="headerBtnSair">
                    <button className='btnNameLogin' onClick={logout}><img src={require("./../../image/sairSlin.png")} alt="Logo User"/></button>
                  </div>
                </div>
              )}

              {auth.currentUser === null &&
                <div className='userNameLogin'>
                  <div className="headerOpcLogin">
                    <a href="./login">Login</a>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
