import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  auth, db  } from './../../firebase-config'
import { getDocs, collection, doc, query, orderBy, limit, where } from 'firebase/firestore';
import './../../css/stylesDepoimentos.css'
import Header from './../../components/Header';
import { UserAuth } from '../../context/AuthContext';



function Pesquisa({ }) {

  const navigate = useNavigate();
  const authorization = UserAuth();

  const [nome, setNome] = useState("")
  const [users, setUsers] = useState([])
  const [depoimentos, setDepoimentos] = useState([])


  const [ano, setAno] = useState("")
  const [curso, setCurso] = useState("")


  const [anos, setAnos] = useState([])
  const [cursos, setCursos] = useState([])

  const [load, setLoad] = useState(false)

  const depoimentosRef = collection (db, "depoimentos");
  const usersRef = collection (db, "users");


  const getDepoimentos = async () => {
    try {
      const user = await getDocs(usersRef);
      setUsers(user.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
      const querySnapshot = await query(depoimentosRef, orderBy('date', 'desc'));
      const data = await getDocs(querySnapshot);
      setDepoimentos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  

      console.log("Chamando GET na Depoimentos");
    } catch (err) {
      console.log(err);
    }
  };

  const getDepoimentosSearch = async (nome, curso, ano) => {
    try {
      const user = await getDocs(usersRef);
      setUsers(user.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
      let depoimentosData = [];
      let queryRef = collection(db, 'depoimentos');
  
      if (nome) {
        queryRef = query(queryRef, where('nome', '==', nome));
      }
  
      if (curso) {
        queryRef = query(queryRef, where('faculdade.curso', '==', curso));
      }
  
      if (ano) {
        queryRef = query(queryRef, where('faculdade.ano', '==', ano));
      }
  
      const querySnapshot = await getDocs(queryRef);
      depoimentosData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      setDepoimentos(depoimentosData);
  
      console.log('Chamando GET na Depoimentos');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDepoimentos();
    // localStorage.setItem("userName");
  }, []);

  if(!load){
    setTimeout(() => {
        setLoad(true);
      }, 1000);

      return(<></>)
}

  
  return (
    <div>
      <title>Egresso</title>
      <header id="header"><Header/></header>
      <main id="depoimentos">
        <div className="depoimentosEgressos">

            <div className="busca">
              <div className="pesquisaNome">
                <input
                  type="text"
                  id="pesquisaNome"
                  className="pesquisaNomeInput"
                  name="pesquisaNome"
                  value={nome}
                  placeholder="Pesquisar por nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>



              <div className="pesquisaCurso">
                <select
                  id="pesquisaCurso"
                  name="pesquisaCurso"
                  placeholder="Pesquisar por curso"
                  onChange={(e) => setCurso(e.target.value)}
                >
                  <option value="" className="first-option">
                    Pesquisar por curso
                  </option>
                  {depoimentos.slice().map((post, index) => {
                    if (!post || !post.relato) {
                      return null;
                    }

                    const cursos = post.faculdade.curso;

                    if (depoimentos.slice(0, index).some((p) => p.faculdade.curso === cursos)) {
                      return null; // Ignora a opção duplicada
                    }

                    return (
                      <option key={post} value={cursos}>
                        {cursos}
                      </option>
                    );
                  })}
                </select>
              </div>

              


              <div className="pesquisaBtn">
                <button className="pesquisaBtnCSS" onClick={()=>{getDepoimentosSearch(nome, curso, "")}}>
                   {/* <img
                    className="img"
                    src={require("./../../image/lupa.png")}
                    alt="icon"
                  />  */}
                  Buscar
                </button>
              </div>
            </div>

          <div className="egressos">
            <div className="tituloEgressos">
              <div className="linhaEgresso" />
              <h1>depoimento dos egressos</h1>
              <div className="linhaEgresso" />
            </div>
            <div className="depoimentosTurmas">

          
      
              <div className="alunosEgressos">
              {depoimentos.map((post, index) => { 
                
                  if (!post || !post.relato)  {
                    return null;
                  }
                
                const user = users.find((user) => user.id === post.id);

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
                      <h3>{user?.name || "ADMIN"}</h3>
                      <img src={user?.imageURL}/>
                     
                      <div className="contatosEgresso">

                        {user?.email &&
                        <a className="f-box-left-email" href={user.email}>
                        <i className="fa-sharp fa-regular fa-envelope fa-shake"></i>
                        </a>
                        }
                        {user?.phone &&
                        <a className="f-box-left-wpp" href="https://bri.ifsp.edu.br/index.php/contato">
                          <i className="fa-brands fa-whatsapp" />
                        </a>
                        }
                        {user?.linkedin &&
                        <a className="f-box-left-wpp" href={`https://br.linkedin.com/in/"${user.linkedin}`}>
                          <i className="fa-brands fa-linkedin" />
                        </a>
                        }
                        {user?.instagram &&
                        <a className="f-box-left-insta" href={`https://www.instagram.com/${user.instagram}`}>
                          <i className="fab fa-instagram" />
                        </a>
                        }
                        {user?.facebook &&
                        <a className="f-box-left-face" href="https://www.facebook.com/ifspbirigui/?locale=pt_BR">
                          <i className="fab fa-facebook-f" />
                        </a>
                        }
                      </div>
                      <h4>{(post.faculdade.curso).toUpperCase()}</h4>
                      <a>{post.faculdade.ano}</a>
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
                  <div className="btnEgressoDepo">
                    <button onClick={()=>navigate('/criar')} className="btnEgressoDepo2">Criar depoimento</button>
                  </div>
                <div className="containerTurmas">
                  <div className="tituloContainerTurmas">
                    <h3>Formandos por ano</h3>
                  </div>


                  {
                depoimentos.slice().sort((a, b) => b.faculdade.ano - a.faculdade.ano).map((post, index, array) => {
                    if (!post || !post.relato) {
                      return null;
                    }
                    const ano = post.faculdade.ano;
                    if (
                      array.slice(index + 1).some((p) => p.faculdade.ano === ano)
                    ) {
                      return null; // Ignora a opção duplicada
                    }

                    return (
                      <div className="turmasAno" key={index}>
                        <a className="btnTurmasAno" id="turmasAno" href="#">
                          <p>Formandos de {post.faculdade.ano}</p>
                        </a>
                      </div>
                    );
                  })
                }

                </div>
                
              </div>
                  
            </div>    
            <div/>
          </div>
        </div>
      </main>
      <footer id="footer"></footer>
    </div>
    )
  }

  

export default Pesquisa;
