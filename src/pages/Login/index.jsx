import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase-config'
import { useNavigate } from "react-router-dom";


import Header from './../../components/Header';
import './../../css/stylesLogin.css'
import { UserAuth } from '../../context/AuthContext';


function Login( isAuth ) {

const navigate = useNavigate();

let authorization = UserAuth();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const login = async (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("isAuth", true);
      const user = userCredential.user;
      navigate('/depoimentos')
      // ...
    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

return (
  <div>
  <title>Egresso</title>
  <header id="header" ><Header/></header>
  <main id="login">
    <div className="containerLogin">
      <div className="tituloLogin">
        <h1>login do usuário</h1>
      </div>
      <div className="acessoUsuario">
                <div className="imagemLogin">
                  <img src={require("./../../image/egresso.png")} alt="Logo do egresso" />  
                </div>
                

                <div className="formLogin">
                <form onSubmit={login} >
                  <div className="login">
                    <input className='inputA' id="email" type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
                    <input className='inputA' id="password" type="password" placeholder="Senha" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                  </div>
                  <br/>    <br/>
                  
                    <div className="linksLogin">
                        <a href="/register">Não tenho cadastro</a>
                        <a href="#">Esqueci minha senha</a>


                    </div>
                    <br/>
                    <div className="formLogin"><button className="btnEnviarLogin">Entrar</button></div>
                </form>
              </div>
            </div>
            
    </div>
  </main>
  <footer id="footer" />
</div>

  );
}

export default Login;