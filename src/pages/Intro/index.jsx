import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from './../../firebase-config'
import "./../../css/stylesHome.css"
import Header from './../../components/Header';
import { collection, getDocs } from 'firebase/firestore';

function Intro() {


  const [depoimentos, setDepoimentos] = useState([])

  const navigate = useNavigate();
  const usersRef = collection (db, "users");



  const getDepoimentos = async () => {
    try {
      const data = await getDocs(usersRef);
      setDepoimentos(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDepoimentos();
  }, []);


    return (
<div>
  <title>Egresso</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
          `.home{              
              background-image: url(require('./../../image/imgADM'));  
              background-repeat: no-repeat; 
              background-size: 100%; 
              display: flex; 
              flex-direction: row; 
              align-items:center; 
              justify-content:center; 
              width: 100%; 
              height: 100vh; 
            } 
          
          @media only screen and (min-width: 280px) and (max-width: 1200px){
            .home{ 
              background-image: hidden;
            }`
    }}
  />
  <header id="header"><Header/></header>
  <div>

    <div className="home" id="home">        
        <div className="textosHome">
          <h1>Bem-vindo, aluno!</h1>
          <br />
          <h3>
            Se inspire com os depoimentos dos ex alunos ou seja você a fonte de
            inspiração!
          </h3>
        </div>
    </div>

    <div className="continuacaoHome">
      <div className="continuacaoHomeEsq">
        <div className="iconeEgresso">
          <img className="img" src={require('./../../image/logoEgr.png')} alt="Ícone Egresso" />  
        </div>
        <div className="texto1">
          <h3>O que é Aluno Egresso?</h3>
          <p>
            Quando o aluno finaliza seu curso em alguma instituição de ensino,
            por mais que tenha acabado seu percurso lá, ele continua com um
            vínculo com aquela instituição para a vida, a sua trajetória é
            marcada e ele se torna um aluno egresso.{" "}
          </p>
          <p>
            {" "}
            O aluno egresso é todo aquele que já finalizou seu curso de formação
            em alguma instituição de ensino. O aluno faz parte da história da
            instituição, assim como a instituição faz parte da história do aluno
            e ele pode contribuir para ajudar, seja através da informação, como
            da inspiração, alunos que estão para se graduar ou os interessados
            em se matricular e iniciar um curso naquele mesmo lugar.
          </p>
        </div>
      </div>
      <div className="continuacaoHomeDir">
        <div className="texto2">
          <h3>Por que é importante?</h3>
          <p>
            O aluno que já se formou pode mostrar o percurso dele durante a
            graduação e o pós curso.
          </p>
          <p>
            {" "}
            Por exemplo, onde ele trabalha, com o que ele trabalha, qual seu
            salário, as dificuldades da sua profissão. O interessante é que ele
            pode mostrar caminhos que a profissão pode levar, incentivando e
            inspirando os futuros profissionais; afinal, é muito difícil que um
            aluno não perca sua motivação e se sinta para baixo durante o curso,
            nesses casos, o perfil do aluno egresso pode ajudar a volta o foco
            desse estudante e dar um gás para ele conseguir concluir e
            principalmente, concluir com uma certeza de que há caminhos
            plausíveis para ele.
          </p>
        </div>
        <div className="iconeLampada">
          <img className="img" src={require('./../../image/lampada.png')} alt="Lâmpada Ideia" />
        </div>
      </div>
    </div>
    <div className="homeDepoimentos">
      <div className="depoTitulo">
        <div className="linha" />
        <div className="tituloDepoimento">
          <h1>Depoimento dos alunos</h1>
        </div>
        <div className="linha" />
      </div>
      <div className="depoCarrossel">
        <div className="container">
          <button className="arrow-left control" aria-label="Previous image">
            <img
              id="setaEsq"
              src={require('./../../image/setaEsq.png')}
              alt="seta para esquerda"
            />
          </button>
          <button className="arrow-right control" aria-label="Next Image">
            <img
              id="setaEsq"
              src={require('./../../image/setaDir.png')}
              alt="seta para direita"
            />
          </button>
          <div className="gallery-wrapper">
            <div className="gallery">
              <img
                id="fotoAluno"
                className="item current-item"
                src={require('./../../image/homem4.jpg')}
                alt="foto do aluno"
              />
              <img
                id="fotoAluno"
                className="item"
                src={require('./../../image/mulher1.jpg')}
                alt="foto do aluno"
              />
              <img
                id="fotoAluno"
                className="item"
                src={require('./../../image/homem2.jpg')}
                alt="foto do aluno"
              />
              <img
                id="fotoAluno"
                className="item"
                src={require('./../../image/homem3.jpg')}
                alt="foto do aluno"
              />
              <img
                id="fotoAluno"
                className="item"
                src={require('./../../image/mulher2.jpg')}
                alt="foto do aluno"
              />
              <img
                id="fotoAluno"
                className="item"
                src={require('./../../image/homem1.jpg')}
                alt="foto do aluno"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="depoBotoes">
        <button onClick={()=>navigate("/depoimentos")}className="btnMaisDepo">Veja mais depoimentos</button>
        <button onClick={()=>navigate("/create")} className="btnFacaPerfil">Faça seu perfil do egresso</button>
      </div>
    </div>
    
  </div>
  <footer id="footer"></footer>
</div>

  );
}
export default Intro;
