import React from "react";
import '../../../css/stylesModal.css';





function Modal({ setOpenModal, onSalvar }) {
    const handleCancel = () => {
      setOpenModal(false);
    };
  
    const handleContinue = () => {
      onSalvar();
  
      // Feche o modal
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
              <h1>Tem certeza que deseja salvar essas perguntas e cursos?</h1>
            </div>
            <div className="body">
              <p>Lembre-se de verificar se tudo foi digitado corretamente e se deseja prosseguir!</p>
            </div>
            <div className="footer">
              <button
                onClick={handleCancel}
                id="cancelBtn"
              >
                Cancelar
              </button>
              <button onClick={handleContinue}>Salvar</button>
            </div>
          </div>
        </div>
      );
    }
    
    export default Modal;