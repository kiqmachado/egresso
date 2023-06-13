import React, { useEffect, useState } from "react";
import '../../../css/stylesModal.css';





function Modal({ setOpenModal, setPassword, onDeleteConta }) {
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleContinue = () => {
    setPassword(inputPassword);
    onDeleteConta();
    setOpenModal(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setInputPassword(e.target.value);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={handleCancel}>X</button>
        </div>
        <div className="title">
          <h1>Tem certeza que deseja excluir sua conta?</h1>
        </div>
        <div className="body">
          <p>Caso exclua a sua conta, não poderá mais fazer login e todas as suas informações serão apagadas!!</p>
    
        </div>
        <br/>
        <h5>Digite sua senha e clique e clique em "Excluir", caso queira prosseguir.</h5>
        <input className="modalPassword" id="password" type={showPassword ? 'text' : 'password'} value={inputPassword} onChange={handlePasswordChange} />
        <button className="togglePassword" onClick={togglePasswordVisibility}>
           <p>{showPassword ? 'Ocultar senha' : 'Ver senha'} </p>
        </button>         

        <div className="footer">
          <button onClick={handleCancel} id="cancelBtn">
            Cancelar
          </button>
          <button onClick={handleContinue}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default Modal