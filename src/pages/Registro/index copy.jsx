import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  useNavigate } from "react-router-dom";
import { auth, db } from './../../firebase-config'
import {  collection, doc, setDoc } from 'firebase/firestore';
import './../../css/stylesCadastro.css';
import Header from '../../components/Header';


const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const usersRef = collection (db, "users");

 

  const handleRegister = async (e) => {
    e.preventDefault();

    if(password!==confirmPassword){
      setError("As senhas são diferentes");}
      else if(name.trim()==="" || email.trim()===""|| cpf.trim()===""||date.trim()===""||phone.trim===""){
        setError("Preencha todos os campos");}
          else{
            try {
              const { user } = await createUserWithEmailAndPassword(auth, email, password);
              const docRef = doc(usersRef, user.uid);
              await setDoc(docRef, {
                name: name,
                phone: phone,
                date: date,
                cpf: cpf,
                linkedin: "", 
                instagram: "", 
                facebook: "", 
                imageURL:"" 
                })
                navigate('/depoimentos')
            } catch (error) {
              setError("Erro ao cadastrar");
              console.error(error);
        }}
  };

  return (
  <div>
  <title>Egresso</title>
  <header id="header" ><Header/></header>
  <main id="cadastro">
    <form onSubmit={handleRegister}>
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
              value={cpf} onChange={(e)=>{setCpf(e.target.value)}}
            />
             <input
              type="phone"
              name="telefoneUsuario"
              className='inputA'
              id="telefoneUsuario"
              placeholder="Telefone"
              required=""
              value={phone} onChange={(e)=>{setPhone(e.target.value)}}
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
          {/* <div className="termosUso">
            <input
              id="checkbox"
              type="checkbox"
              className='inputA'
              name="aceiteTermosUsuario"
              placeholder="Aceito os termos de uso"
            />
            <label>
              Aceito os<a href="#"> TERMOS DE USO</a>
            </label>
          </div> */}
          <div className="EnviarCadastro">
            <p>{error}</p>
            <button
              type="submit"
              name="submit"
              id="submit"
              className="btnEnviarCadastro"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
  <footer id="footer" />
</div>

  
  );
};

export default Register;