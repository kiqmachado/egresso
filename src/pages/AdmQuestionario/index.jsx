import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from './../../components/Footer';
import './../../css/stylesQuestionarioADM.css';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ModalFormularioAdm from './../../components/Modal/ModalFormularioADM'

function AdmQuestionario() {

  const navigate = useNavigate();

  const faculdadeRef = collection(db, 'faculdade');

  const [cursos, setCursos] = useState([]);
  const [idCurso, setIdCurso] = useState();
  const [perguntas, setPerguntas] = useState([]);
  const [idPergunta, setIdPergunta] = useState();
  const [modalFormulario, setModalFormulario] = useState(false);

  
  const [load, setLoad] = useState(false);

  const getPerguntas = async () => {
    try {
      const data = await getDocs(faculdadeRef);
      setPerguntas(data.docs.map((doc) => doc.data().perguntas).flat());
      setIdPergunta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      setCursos(data.docs.map((doc) => doc.data().cursos).flat());
      setIdCurso(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoad(true);
    } catch (err) {
    }
  };

  useEffect(() => {
    getPerguntas();
  }, []);

  const submit = async () => {

    // AVISO ANTES DE MANDAR AS PERGUNTAS PRO BANCO. CONFIRMANDO SE O ADM TEM CERTEZA DE QUE QUER CADASTRAR E ETC
    if (perguntas.some((perguntas) => perguntas.trim() === '') && cursos.some((cursos) => cursos.trim() === '')) {
    } else {
      await createPerguntas();
      await createCursos();
      navigate('/adm');
    }
  };

  const createPerguntas = async () => {
    try {
      const perguntasData = {
        perguntas: Array.from(perguntas),
      };

      const perguntasDocRef = doc(faculdadeRef, idPergunta[0].id);
      await updateDoc(perguntasDocRef, perguntasData);

    } catch (err) {
    }
  };

  const handlePerguntaChange = (index, newValue) => {
    const newPerguntas = [...perguntas];
    newPerguntas[index] = newValue;
    setPerguntas(newPerguntas);
  };

  const handleRemovePergunta = (index) => {
    const newPerguntas = [...perguntas];
    newPerguntas.splice(index, 1);
    setPerguntas(newPerguntas);
  };

  const handleAddPergunta = () => {
    setPerguntas([...perguntas, '']);
  };
  

  
  const createCursos = async () => {
    try {
      const cursoData = {
        cursos: Array.from(cursos),
      };

      const cursosDocRef = doc(faculdadeRef, idCurso[0].id);
      await updateDoc(cursosDocRef, cursoData);

      console.log('cursos cadastradas com sucesso!');
    } catch (err) {
    }
  };

  const handleCursoChange = (index, newValue) => {
    const newcursos = [...cursos];
    newcursos[index] = newValue;
    setCursos(newcursos);
  };

  const handleRemoveCurso = (index) => {
    const newcursos = [...cursos];
    newcursos.splice(index, 1);
    setCursos(newcursos);
  };

  const handleAddCurso = () => {
    setCursos([...cursos, '']);
  };


  const handleSalvar = () => {
    submit();
    };



  if(!load){
  return(<></>)
}

  return (
    <div id="formulario">
          {modalFormulario && <ModalFormularioAdm setOpenModal={setModalFormulario} onSalvar={handleSalvar} />}
      <header id="header">
        <Header />
      </header>
      <div className="Formulario">
        <div className="tituloQuestionario">
          <div className="linhaQ" />
          Questionário
          <div className="linhaQ" />
        </div>
        <div className="formularioPerg">

              <div className="labelPergQuestionarioADM">                 
                <h3 className="labelADM">1. Cadastre os cursos presentes na instituição:</h3>                     
              </div>
        {!(cursos.length>0)? (
            <div className="semPerguntas">
              {/* <img className="semPerguntasImg" src={require('../../image/gifs/ops.gif')} alt="Sem perguntas" /> */}
              <p className="semPerguntasP">Ainda não há cursos cadastrados! Cadastre um agora clicando no botão abaixo.</p>
            </div>
          ) : (
            <div>
              {cursos.map((pergunta, index) => {
                return (
                  <div className="labelPergQuestionarioADM">                     
                    <div key={index} className="labInputQuestionarioADM">                 
                      <input
                        type="text"
                        name={`respostaFormulario-${index}`}
                        value={pergunta}
                        onChange={(e) => handleCursoChange(index, e.target.value)}
                      />
                      <div className="ImageTrash" onClick={() => handleRemoveCurso(index)}>
                        <img src={require('./../../image/trash.png')} alt="remove" />
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

              <div className="labInput">
                <div className="ImageAdd" onClick={handleAddCurso}>
                  <img src={require('./../../image/add.png')} alt="add" />
                </div>
              </div>

              <div className="labelPergQuestionarioADM">                 
                        <h3 className="labelADM">2. Cadastre as perguntas que você quer que os egressos respondam:</h3>                     
                    </div>

        {!(perguntas.length>0)? (
            <div className="semPerguntas">
              <p className="semPerguntasP">Ops, não há perguntas cadastradas ainda! Cadastre uma agora clicando no botão abaixo.</p>
            </div>
          ) : (
            <div>
                    
              {perguntas.map((pergunta, index) => {
                return (
                  <div className="labelPergQuestionarioADM">                     
                    <div key={index} className="labInputQuestionarioADM">                 
                      <input
                        type="text"
                        name={`respostaFormulario-${index}`}
                        value={pergunta}
                        onChange={(e) => handlePerguntaChange(index, e.target.value)}
                      />
                      <div className="ImageTrash" onClick={() => handleRemovePergunta(index)}>
                        <img src={require('./../../image/trash.png')} alt="remove" />
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
             <div className="labInput">
                <div className="ImageAdd" onClick={handleAddPergunta}>
                  <img src={require('./../../image/add.png')} alt="add" />
                </div>
              </div>
          
          <br />
        </div>
        <div className="formBotoesQuestionaroADM">
          <button onClick={()=>navigate('/adm')} className="formBotoesSalvarQuestionaroADMSalvar">
            Voltar
          </button>
          <button onClick={() => setModalFormulario(true)} className="formBotoesSalvarQuestionaroADM">
            Salvar
          </button>
        </div>
      </div>
      <footer id="footer"><Footer/></footer>

    </div>
  );
}

export default AdmQuestionario;