import React from "react";
import '../../../css/stylesModal.css';





function Modal({ setOpenModal, onEmailEnviado }) {
    const handleCancel = () => {
      setOpenModal(false);
      onEmailEnviado();
    };
  
    const handleContinue = () => {
      setOpenModal(false);
    };
  
    return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={handleCancel}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1>Um email foi encaminhado para você!!</h1>
            </div>
            <div className="body">
              <p>Verifique sua caixa de emails. Após isso clique no link que fornecemos e volte aqui para fazer login.</p>
            </div>
            <div className="footer">
              <button
                onClick={handleCancel}
      
              >
                Ir para login
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    export default Modal;