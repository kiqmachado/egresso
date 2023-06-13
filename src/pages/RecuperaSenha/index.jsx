import React, { useState } from 'react';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './../../firebase-config'
import { useNavigate } from "react-router-dom";
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import './../../css/stylesRecuperarSenha.css'
import ModalEmail from '../../components/Modal/ModalEmail'

function RecuperaSenha() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const [modalOpenEmail, setModalOpenEmail] = useState(false);

  

  const enviarEmailRecuperacao = async (e) => {
    e.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        setError('O email não está cadastrado no sistema. Por favor, verifique e tente novamente.');
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setModalOpenEmail(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Tratar os erros específicos, se necessário
      setError('Ocorreu um erro durante o envio do email de recuperação. Por favor, tente novamente.');
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };



  
  const handleEmailEnviado = () => {
       navigate('/login');
    };

  if (!load) {
    setTimeout(() => {
      setLoad(true);
    }, 1000);

    return (<></>)
  }

  return (
    <div>

    {modalOpenEmail && <ModalEmail setOpenModal={setModalOpenEmail} onEmailEnviado={handleEmailEnviado} />}   
      <header id="header"><Header /></header>

      <main id="recuperaSenha">
        <div className="containerRecuperaSenha">
          <div className="containerRecuperaSenhaConteudo">
            <div className="tituloRecuperaSenha">
              <h1>Recuperação de senha</h1>
            </div>
            <div className="contentFormRecuperaSenha">
              <div className="mensagemRecuperaSenha">
                  <p>Para recuperar a sua senha, informe seu endereço de email que nós enviaremos um link para a alteração da senha.</p>
                  <p className={`errorMessageRecupSenha ${error ? "shakeL" : ""}`}>{error}</p>
              </div>
              <form className="formRecuperaSenha" onSubmit={enviarEmailRecuperacao}>
                <div className="inputRecuperaSenha">
                  <input className='inputRecuperaSenhaDados' id="email" type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="btnFormRecuperaSenha">
                  <button onClick={() => navigate('/login')} className="btnEnviarRecuperaSenhaVoltar">Voltar</button>
                  <button className="btnEnviarRecuperaSenha">Enviar</button>                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer id="footer"><Footer /></footer>
    </div>
  );
}

export default RecuperaSenha;
