import React, { useState } from 'react';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './../../firebase-config'
import { useNavigate } from "react-router-dom";
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import './../../css/stylesLogin.css'
import { UserAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';


function Login( isAuth ) {

const navigate = useNavigate();


const [load, setLoad] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = (e) => {
  e.preventDefault();
  setShowPassword(!showPassword);
};

const login = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {

      setError("Seu email ainda não foi verificado.");
      setTimeout(() => { setError(""); }, 3000);

    } else {
    
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

    if (userData.isAdmin) {
      navigate('/adm');
    } else {
      navigate('/depoimentos');
      }
    }
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/user-not-found') {
      setError('Usuário não encontrado. Verifique suas credenciais.');
    } else if (errorCode === 'auth/wrong-password') {
      setError('Senha incorreta. Verifique suas credenciais.');
    } else {
      setError('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  }
};


if(!load){
  setTimeout(() => {
      setLoad(true);
    }, 1000);

    return(<></>)
}



return (
  <div>
    <header id="header" ><Header/></header>

      <main id="login">
        <div className="containerLogin">

            <div className="tituloLogin">
              <h1>login do usuário</h1>
            </div>

         <div className="containerLoginConteudo"> 

            

            <div className="imgContentFormLogin">
              <img src={require("./../../image/egresso.png")} alt="Logo do egresso" /> 
            </div>

            <div className="contentFormLogin">

              <form className="formLogin" onSubmit={login}>
                <div className="inputLogin">
                  <input className='inputLoginDados' id="email" type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
                  <input
                    className="inputLoginDados"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                <button className="togglePasswordLogin" onClick={togglePasswordVisibility}>
                    <p>{showPassword ? 'Ocultar senha' : 'Ver senha'} </p>
                  </button>         
                </div>  
                <div className="linksLogin">
                  <a href="/registro">Não tenho cadastro</a>
                  <a href="/recuperarSenha">Esqueci minha senha</a>
                  <div className="divErrorL"><p className={`errorL ${error ? "shakeL" : ""}`}>{error}</p></div>
                </div>
                <div className="btnFormLogin">
                  <button className="btnEnviarLogin">Entrar</button>
                </div>
              </form>

            </div>

          </div>        
        </div>
      </main>

    <footer id="footer" ><Footer/></footer>
</div>

  );
}

export default Login;