import React from "react";
import '../../../css/stylesModal.css';





function Modal({ setOpenModal, onDeleteDepoimento }) {
    const handleCancel = () => {
      setOpenModal(false);
    };
  
    const handleContinue = () => {
      onDeleteDepoimento();
  
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
              <h1>Tem certeza que deseja excluir o depoimento?</h1>
            </div>
            <div className="body">
              <p>Caso exclua o depoimento, ele não poderá mais ser visto por outros usuários e nem por você!!</p>
            </div>
            <div className="footer">
              <button
                onClick={handleCancel}
                id="cancelBtn"
              >
                Cancelar
              </button>
              <button onClick={handleContinue}>Excluir</button>
            </div>
          </div>
        </div>
      );
    }
    
    export default Modal;