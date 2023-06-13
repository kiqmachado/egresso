import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from './../../components/Footer';
import './../../css/stylesHomeAdm.css'
import { useNavigate } from 'react-router-dom';



function Adm( ) {
    
const [load, setLoad] = useState(false)
const navigate = useNavigate();

if(!load){
    setTimeout(() => {
        setLoad(true);
      }, 1000);

      return(<></>)
}

return (  
    <div>
        <header id="header" ><Header/></header>
            <main>
                <div className="telaADM">
                <div className="tituloADM">
                    <div className="linhaADM" />
                    <h1>administrador</h1>
                    <div className="linhaADM" />
                </div>
                <div className="corpoADM">
                    <div className="textoADM">
                    <h1>Bem vindo, ADM!</h1>
                    <br />
                    <h3>
                        Escolha a ação que deseja executar com função de administrador!
                    </h3>
                    </div>
                    <div className="btnADM">
                    <button className="btnInstituicao" onClick={()=>navigate('/depoimentos')}>Depoimentos</button>
                    <button className="btnEgressos" onClick={()=>navigate('/adm/depoimentos')} >Aprovar egressos</button>
                    <button className="btnQuestionario" onClick={()=>navigate('/adm/questionario')} >Questionário</button>
                    </div>
                </div>
                </div>
            </main>
            <footer id="footer"><Footer /></footer>

    </div> 
  );
}

export default Adm;