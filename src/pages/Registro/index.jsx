import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import {  useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase-config'
import {  collection, doc, setDoc } from 'firebase/firestore';
import './../../css/stylesCadastro.css';
import Header from '../../components/Header';
import Footer from './../../components/Footer';
import defaultImage from '../../image/defaultImage';
import ModalEmail from './../../components/Modal/ModalEmail'

const Registro = () => {

  const navigate = useNavigate();

  const [modalOpenEmail, setModalOpenEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState('');
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const[termos, setTermos] = useState(false)

  const [error, setError] = useState('');

  const usersRef = collection (db, "users");

  const handleEmailEnviado = () => {
    navigate('/login');
 };


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas são diferentes");
      setTimeout(() => { setError(""); }, 3000);
    } else if (name.trim() === "" || email.trim() === "" || cpf.trim() === "" || date.trim() === "") {
      setError("Preencha todos os campos");
      setTimeout(() => { setError(""); }, 3000);
    } else if (!termos) {
      setError("Aceite os termos de uso para cadastrar");
      setTimeout(() => { setError(""); }, 3000);
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: name.trim().toUpperCase(), photoURL: defaultImage });
  
        const docRef = doc(usersRef, user.uid);
        await setDoc(docRef, {
          email: email,
          name: name.trim().toUpperCase(),
          phone: "",
          date: date.trim(),
          cpf: cpf.trim(),
          linkedin: "",
          instagram: "",
          facebook: "",
          imageURL: defaultImage
        });
  
        await sendEmailVerification(user);
        setModalOpenEmail(true);
      } catch (error) {
        setError("Erro ao cadastrar");
        setTimeout(() => { setError(""); }, 3000);
      }
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
  <title>Egresso</title>
  <header id="header" ><Header/></header>
  <main id="cadastro">
  {modalOpenEmail && <ModalEmail setOpenModal={setModalOpenEmail} onEmailEnviado={handleEmailEnviado} />}   
    <form onSubmit={(e)=>{e.preventDefault(); handleRegister()}}>
      <div className="containerCadastro">
        <div className="tituloCadastro">
          <h1>Registro de usuário</h1>
        </div>
        <div className="acessoUsuario">
          <div className="containerInfo">
            <div className="imagemCadastro">
              <img src={require('./../../image/egresso.png')} alt="Logo do egresso" />
            </div>  
            
            <input
              type="text"
              name="nomeUsuario"
              className='inputA'
              id="nomeUsuarop"
              placeholder="Nome completo"
              required=""
              value={name} onChange={(e)=>{setName(e.target.value)}}
            />
            <input
              type="text"
              name="emailUsuario"
              className='inputA'
              id="emailUsuario"
              placeholder="Email"
              required=""
              value={email} onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
              type="text"
              name="cpfUsuario"
              className='inputA'
              id="cpfUsuario"
              placeholder="CPF"
              required=""
              maxLength={14}
              value={cpf} onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = inputValue
                  .replace(/\D/g, "") // Remove caracteres não numéricos
                  .replace(/(\d{3})(\d)/, "$1.$2") // Insere ponto após os primeiros 3 dígitos
                  .replace(/(\d{3})(\d)/, "$1.$2") // Insere ponto após os próximos 3 dígitos
                  .replace(/(\d{3})(\d{2})$/, "$1-$2"); // Insere hífen após os últimos 3 e 2 dígitos
                setCpf(formattedValue);
              }}
            />
            <input
              type="date"
              name="dataNascimentoUsuario"
              className='inputA'
              id="dataNascimentoUsuario"
              placeholder="Data de nascimento"
              required=""
              value={date} onChange={(e)=>{setDate(e.target.value)}}
            />
            <input
              type="password"
              name="senhaUsuario"
              className='inputA'
              id="senhaUsuario"
              placeholder="Senha"
              required=""
              value={password} onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input
              type="password"
              name="confirmaSenhaUsuario"
              className='inputA'
              id="confirmaSenhaUsuario"
              placeholder="Confirmar senha"
              required=""
              value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
          </div>
          
          <div className="termosUso">
            <input
              id="checkboxb"
              type="checkbox"
              className="checkbox"
              checked={termos}
              onChange={() => setTermos(!termos)}
            />

        <span className="label-space"></span> {/* Espaço entre os botões */}
        <label htmlFor="checkboxb" className="termosDeUso">
          Aceito os <a className="tagA"  onClick={() => window.open('/termos', '_blank', 'width=600,height=400')}>Termos de uso</a>.
        </label>
        </div>
        
          
          <div className="EnviarCadastro">
     
          <div className="divErrorC"><p className={`errorC ${error ? "shakeC" : ""}`}>{error}</p></div>
            <button
              onClick={()=>navigate('/login')}
              id="cancel"
              className="btnEnviarCadastro"
            >
              Voltar
            </button>
            <span className="button-space"></span>
            <button
              type="submit"
              name="submit"
              id="submit"
              className="btnEnviarCadastro"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
  <footer id="footer" ><Footer/></footer>
</div>
  );
};

export default Registro;