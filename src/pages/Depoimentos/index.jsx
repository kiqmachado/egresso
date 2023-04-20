import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  db } from './../../firebase-config'
import { getDocs, collection, doc } from 'firebase/firestore';
import './../../css/stylesDepoimentos.css'
import Header from './../../components/Header';
import { UserAuth } from '../../context/AuthContext';



function Depoimentos({ }) {

  const navigate = useNavigate();
  const authorization = UserAuth();

  const [depoimentos, setDepoimentos] = useState([])
  const [load, setLoad] = useState(false)

  const formularioClienteRef = collection (db, "formularioCliente");



  const getDepoimentos = async () => {
    try {
      const data = await getDocs(formularioClienteRef);
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
      <header id="header"><Header/></header>
      <main id="depoimentos">
        <div className="depoimentosEgressos">
          <form action="">
            <div className="busca">
              <div className="pesquisaNome">
                <input
                  type="text"
                  id="pesquisaNome"
                  className="pesquisaNomeInput"
                  name="pesquisaNome"
                  placeholder="Pesquisar por nome"
                />
              </div>
              <div className="pesquisaCurso">
                <select
                  id="pesquisaCurso"
                  name="pesquisaCurso"
                  placeholder="Pesquisar por curso"
                >
                  <option value="cursoA" className="first-option">
                    Pesquisar por curso
                  </option>
                  <option value="cursoB">Curso 2</option>
                  <option value="cursoC">Curso 3</option>
                </select>
              </div>
              <div className="pesquisaBtn">
                <button type="submit" className="pesquisaBtnCSS">
                  {/* <img
                    className="img"
                    src="../image/lupa.png"
                    alt="icon"
                  /> */}
                  Buscar
                </button>
              </div>
            </div>
          </form>
          <div className="egressos">
            <div className="tituloEgressos">
              <div className="linhaEgresso" />
              <h1>depoimento dos egressos</h1>
              <div className="linhaEgresso" />
            </div>
            <div className="depoimentosTurmas">

          
      
              <div className="alunosEgressos">
              {depoimentos.map((post, index) => { 

                  if (!post) {
                    return null;
                  }
                  
                const perguntas = Array.isArray(post.relato.perguntas) ? post.relato.perguntas : [post.relato.perguntas];
                const respostas = Array.isArray(post.relato.respostas) ? post.relato.respostas : [post.relato.respostas];
                const perguntasRespostas = [];
                for (let i = 0; i < perguntas.length; i++) {
                  perguntasRespostas.push(<p key={`p-${i}`}><b>{perguntas[i]}</b></p>);
                  if (respostas[i]) {
                    perguntasRespostas.push(<p key={`r-${i}`}>{respostas[i]}</p>);
                  } else {
                    perguntasRespostas.push(<p key={`r-${i}`}></p>);
                    console.log(perguntasRespostas)
                  }
                }
                return (
                  <div className="aluno" id="respostaAluno" key={index}>
                    <div className="alunoEsq">
                      <h3>{post.autor.name}</h3>
                      <img src={post.autor.imageURL}/>
                      <div className="contatosEgresso">
                        <a className="f-box-left-wpp" href="https://bri.ifsp.edu.br/index.php/contato">
                          <i className="fa-brands fa-whatsapp" />
                        </a>
                        <a className="f-box-left-wpp" href="https://bri.ifsp.edu.br/index.php/contato">
                          <i className="fa-brands fa-linkedin" />
                        </a>
                        <a className="f-box-left-insta" href="https://www.instagram.com/ifsp.bri/">
                          <i className="fab fa-instagram-square" />
                        </a>
                        <a className="f-box-left-face" href="https://www.facebook.com/ifspbirigui/?locale=pt_BR">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </div>
                    </div>

                    <div className="alunoDir">
                      <div className="respQuestionario">
                        <div className="d">
                          {perguntasRespostas}
                          <br></br>
                        </div>
                        <div className="dataAtt">
                          <p>Atualizado em: {post.date} </p>
                        </div>
                      </div>
                    </div>
                </div>
                )})}
              </div>

              <div className="turmasEgressos">
                <div className="containerTurmas">
                  <div className="tituloContainerTurmas">
                    <h3>turmas da engenharia da computação</h3>
                  </div>
                  <div className="turmasAno">
                    <button className="btnTurmasAno">
                      <p>Turma 2023</p>
                    </button>
                    <a className="btnTurmasAno" id="turmasAno" href="#">
                      <p>Turma 2022</p>
                    </a>
                    <a className="btnTurmasAno" id="turmasAno" href="#">
                      <p>Turma 2021</p>
                    </a>
                    <a className="btnTurmasAno" id="turmasAno" href="#">
                      <p>Turma 2020</p>
                    </a>
                    <a className="btnTurmasAno" id="turmasAno" href="#">
                      <p>Turma 2019</p>
                    </a>
                    <a className="btnTurmasAno" id="turmasAno" href="#">
                      <p>Turma 2018</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnEgressos" />
          </div>
        </div>
      </main>
      <footer id="footer"></footer>
    </div>
    )
  }

  

export default Depoimentos;
