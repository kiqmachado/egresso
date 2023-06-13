import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './../../firebase-config';
import { getDocs, collection, doc, query, orderBy, limit, where, getDoc, deleteDoc } from 'firebase/firestore';
import './../../css/stylesDepoimentos.css';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import { UserAuth } from '../../context/AuthContext';
import ReactPaginate from 'react-paginate';
import defaultImage from '../../image/defaultImage';
import ModalDepoimento from '../../components/Modal/ModalExcluirDepoimento'

function Depoimentos({ busca }) {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10; // Número de itens por página

  const navigate = useNavigate();

  const [modalOpenDepoimento, setModalOpenDepoimento] = useState(false);

  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [ano, setAno] = useState('');

  const [usuario, setUsuario] = useState({})
  const [depoimentos, setDepoimentos] = useState([]);

  const [anos, setAnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [deleteID, setDeleteID] = useState("");

  const [load, setLoad] = useState(false);

  const depoimentosRef = collection(db, 'depoimentos');

  

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    window.scrollTo(0, 0);
  };

  

  const getUsuario = async () => {
    try {
      const user = auth.currentUser;
  
      if (user) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsuario(userData);
        } 
      } 
    } catch (error) {}
  };

  const getDepoimentos = async () => {
    try {

      const depoimentosSnapshot = await query(depoimentosRef, orderBy('date', 'desc'));
      const depoimentosData = (await getDocs(depoimentosSnapshot)).docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const uniqueCursos = depoimentosData
        .filter((depoimento, index, self) => self.findIndex((d) => d.faculdade.curso === depoimento.faculdade.curso) === index)
        .map((depoimento) => depoimento.faculdade.curso);

      const uniqueAnos = depoimentosData
        .filter((depoimento, index, self) => self.findIndex((d) => d.faculdade.ano === depoimento.faculdade.ano) === index)
        .map((depoimento) => depoimento.faculdade.ano);

      setTotalItems(depoimentosData.length);
      setDepoimentos(depoimentosData);
      setCursos(uniqueCursos);
      setAnos(uniqueAnos);
      setLoad(true);
    } catch (err) {
    }
  };

  const search = async (nome, curso, ano) => {

    try {
      let queryRef = depoimentosRef;

      if (nome) {
        const searchName = nome.toUpperCase();
        queryRef = query(queryRef, where('usuario.name', '>=', searchName), where('usuario.name', '<=', searchName + '\uf8ff'));
      }

      if (curso) {
        queryRef = query(queryRef, where('faculdade.curso', '==', curso));
      }

      if (ano) {
        queryRef = query(queryRef, where('faculdade.ano', '==', ano));
      }

      const depoimentosSnapshot = await getDocs(queryRef);
      const depoimentosData = depoimentosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setTotalItems(depoimentosData.length);
      setDepoimentos(depoimentosData);
      setCurrentPage(0);
      
    } catch (err) {
    }
  };

  const deleteDepoimento = async () => {
    const userDoc = doc(db, "depoimentos", deleteID)
    await deleteDoc(userDoc);
    getDepoimentos();
  };


  const handleDeleteDepoimento = () => {
    deleteDepoimento();
    };


  useEffect(() => {
      getDepoimentos();
      getUsuario();
  }, []);

  const paginatedDepoimentos = depoimentos.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );


  
  if (!load) {
    return (<></>)
  }

  
  return (
    <div>
      {modalOpenDepoimento && <ModalDepoimento setOpenModal={setModalOpenDepoimento} onDeleteDepoimento={handleDeleteDepoimento} />}
      <title>Egresso</title>
      <header id="header"><Header/></header>
      <form onSubmit={(e)=>{e.preventDefault(); search(nome,curso,ano)}}>
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
                  {cursos.map((post, index) => {
                    if (!post) {
                      return null;
                    }

                    return (
                      <option key={index} value={post}>
                        {post}
                      </option>
                    );
                  })}
                </select>
              </div>

              


              <div className="pesquisaBtn">
                <button type="submit" className="pesquisaBtnCSS" onClick={()=>{search(nome, curso, ano);}}>
                  {/* <img
                    className="img"
                    src="../image/lupa.png"
                    alt="icon"
                  /> */}
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

          
      {paginatedDepoimentos.length > 0? (
              <div className="alunosEgressos">
              {paginatedDepoimentos.map((post, index) => {
                
                  if (!post || !post.relato)  {
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
                  }
                }
                
                return (
                
                  <div className="aluno" id="respostaAluno" key={index}>
                   
                    <div className="alunoEsq">
                      <h3>{post.usuario?.name || "Usuário"}</h3>
                      <img src={post.usuario?.imageURL || defaultImage}/>
                     
                      <div className="contatosEgresso">

                        {post.usuario?.email &&

                        <a className="f-box-left-email" href={`mailto:${post.usuario.email}?subject=${encodeURIComponent("Relato - Egresso")}&body=${encodeURIComponent("")}`}>
                        <i className="fa-sharp fa-regular fa-envelope fa-shake"></i>
                        </a>
                        }
                        {post.usuario?.phone &&
                        <a className="f-box-left-wpp" href={`https://wa.me/${post.usuario.phone.replace(/\D/g, '')}`}>
                          <i className="fa-brands fa-whatsapp" />
                        </a>
                        }
                        {post.usuario?.linkedin &&
                        <a className="f-box-left-wpp" href={post.usuario.linkedin}>
                          <i className="fa-brands fa-linkedin" />
                        </a>
                        }
                        {post.usuario?.instagram &&
                        <a className="f-box-left-insta" href={`https://www.instagram.com/${post.usuario.instagram}`}>
                          <i className="fab fa-instagram" />
                        </a>
                        }
                        {post.usuario.facebook &&
                        <a className="f-box-left-face" href={post.usuario.facebook}>
                          <i className="fab fa-facebook-f" />
                        </a>
                        }
                      </div>
                      <h4>{(post.faculdade.curso).toUpperCase()}</h4>
                      <a>{post.faculdade.ano}</a>

                      {post.usuario?.isAdmin? (
                      <button type="button" onClick={()=>{setDeleteID(post.id); setModalOpenDepoimento(true)}} 
                      className="btnEgressoDepo2"> <i class="fa fa-trash" aria-hidden="true"></i><a>   </a>Apagar depoimento </button>
                      ):(<></>)}
                    
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
              ):(
                <div className="alunosEgressosVazio">
                <img className="semAlunosImg" src={require('../../image/gifs/pensativo.gif')} alt="Sem Egressos para aprovar gif" />
                <p className='semAlunosTxt'>Nenhum depoimento foi encontrado</p>
                </div>)}

           

              <div className="turmasEgressos">
                  <div className="btnEgressoDepo">
                    <button onClick={()=>navigate('/criar')} className="btnEgressoDepo2">Criar depoimento</button>
                  </div>
                <div className="containerTurmas">
                  <div className="tituloContainerTurmas">
                    <h3>Formandos por ano</h3>
                  </div>


                  {anos.sort().reverse().map((post, index) =>{
                    if (!post) {
                      return null;
                    }
                    return (
                      <div className="turmasAno" key={index}>
                        <a className="btnTurmasAno" id="turmasAno" onClick={()=>search("","",post)+setNome("")+setCurso("")}>
                          <p>Formandos de {post}</p>
                        </a>
                      </div>
                    );
                  })
                }
                </div>
              </div>   
            </div>   
            <div className='teste'>
              <ReactPaginate
                    previousLabel={<i className="fas fa-chevron-left"></i>}
                    nextLabel={<i className="fas fa-chevron-right"></i>}
                    pageCount={Math.ceil(depoimentos.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    breakClassName='teste2'
                    pageClassName={'testes'}
                    containerClassName={'pagination'}
                    previousClassName={'pagination__link'}
                    nextClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    previousLinkClassName={'pagination__link--previous'}
                    nextLinkClassName={'pagination__link--next'}
                  /></div> 
            <div/>
          </div>
        </div>
      </form>
      <footer id="footer"><Footer/></footer>
    </div>
    )
  }

  

export default Depoimentos;
