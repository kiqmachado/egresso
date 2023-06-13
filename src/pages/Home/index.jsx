import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from './../../firebase-config'
import "./../../css/stylesHome.css"
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import defaultImage from './../../image/defaultImage'
import { Pagination, Navigation } from 'swiper';
import { Autoplay } from "swiper";

function Home() {


  const [depoimentos, setDepoimentos] = useState([])
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
  const depoimentosRef = collection (db, "depoimentos");


  const getDepoimentos = async () => {
    try {

      const querySnapshot = await query(depoimentosRef, orderBy('date', 'desc'));
      const data = await getDocs(querySnapshot);
      setDepoimentos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoad(true);
    } catch (err) {
    }
  };

  useEffect(() => {
    getDepoimentos();
   
    // localStorage.setItem("userName");
  }, []);

  useEffect(() => {
    getDepoimentos();
  }, []);

    if(!load){
      return(<></>)
}


return (
  <div>
    <title>Egresso</title>
    <style
      dangerouslySetInnerHTML={{
        __html:
          `.home{              
            background-image: url(require('./../../image/imgADM'));  
            background-repeat: no-repeat; 
            background-size: cover; 

            display: flex; 
            flex-direction: row; 
            align-items:center; 
            justify-content:center; 
            width: 100%; 
            height: 100vh; 
          } 
        
        @media only screen and (min-width: 280px) and (max-width: 1200px){
          .home{ 
            background-image: cover;
            height: 50vh; 
          }`
      }}
    />
    <header id="header"><Header /></header>

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

      {depoimentos.length > 2? (
      <div className="homeDepoimentos">
        <div className="depoTitulo">
          <div className="linha" />
          <div className="tituloDepoimento">
            <h1>Depoimento dos alunos</h1>
          </div>
          <div className="linha"></div>
        </div>


        <div className="container">
       
        <Swiper
              grabCursor={false}
              centeredSlides={true}
              loopedSlides={depoimentos.length} // Defina o número total de slides
              slidesPerGroup={1} // Defina como 1
              initialSlide={0}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              slidesPerView={'auto'}
              autoplay={{
                delay: 5500,
                disableOnInteraction: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
             
    className="swiper_container"
  >
    {depoimentos.map((post, index) => {

    if (!post || !post.relato)  {
      return null;
    }

      return(
            <SwiperSlide key={post.id}>
              <div className="alunoConteinerCarrossel">
                <img  className="containerImg"
                  onClick={() => navigate("/depoimentos")}
                  src={post.usuario?.imageURL || defaultImage}/>
                  <div className="dadosCursoNome">
                    <h3>{post.usuario.name || "ALUNO"}</h3>
                    <h4>{post.faculdade.curso}</h4>
                  </div>
              </div>
            </SwiperSlide>
          )})}
        </Swiper>
      </div>
      

        <div className="depoBotoes">
          <button onClick={() => navigate("/depoimentos")} className="btnMaisDepo">Veja mais depoimentos</button>
          <button onClick={() => navigate("/criar")} className="btnFacaPerfil">Faça seu perfil do egresso</button>
        </div>
      </div>) : ( 
      
      <div className="homeDepoimentosB"> 
        <div className="depoBotoes">
          <button onClick={() => navigate("/depoimentos")} className="btnMaisDepo">Veja mais depoimentos</button>
          <button onClick={() => navigate("/criar")} className="btnFacaPerfil">Faça seu perfil do egresso</button>
        </div>
      </div>)}

   
    <footer id="footer"><Footer /></footer>
  
  </div>

);
}
export default Home;
