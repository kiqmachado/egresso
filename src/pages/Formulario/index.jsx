import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase-config'
import { collection, getDocs, doc, updateDoc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import "./../../css/stylesFormulario.css"


function Formulario() {
  const navigate = useNavigate();
  const authorization = UserAuth();

  const depoimentosPendentesRef = collection (db, "depoimentosPendentes");
  const faculdadeRef = collection (db, "faculdade");
  const usersRef = collection (db, "users");


  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [curso, setCurso] = useState("")
  
  const [usuario, setUsuario] = useState([])
  const [perguntas, setPerguntas] = useState([])
  const [cursos, setCursos] = useState([])

  const [respostas, setRespostas] = useState([])  

  const [anoFormulario, setAnoFormulario] = useState()

  const submit = async () => {

    if (respostas.some((resposta) => resposta.trim() == "") || curso.trim()=="" || anoFormulario.trim()==""||respostas.length<perguntas.length) {
      setError("Alguma pergunta não foi respondida");
      setTimeout(() => {
        setError("");
      }, 3000);
      /*AVISO DE QUE FALTARAM PERGUNTAS PARA SEREM RESPONDIDAS*/
    } else {
      await createPost();
    }
  };

const anosDisponiveis = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, index) => 1900 + index
).reverse();

  
const createPost = async () => {
    let yourDate = new Date();
    const docRef = doc(depoimentosPendentesRef, auth.currentUser.uid);
    const formattedDate = `${yourDate.toLocaleDateString()} - ${yourDate.toLocaleTimeString()}`;
   
    try {
        await setDoc(docRef, 
          {
          usuario: {name: auth.currentUser.displayName.toUpperCase(), email: usuario.email, phone: usuario.phone, linkedin: usuario.linkedin, 
                   instagram: usuario.instagram, facebook: usuario.facebook, imageURL: usuario.imageURL}, 
                 
          relato: { perguntas: perguntas, respostas: respostas}, 

          faculdade:{curso: curso, ano: anoFormulario}, date: formattedDate});

      navigate('/depoimentos');
    } catch (err) {
    }
  };

  const getPerguntas = async () => {
    try {
      const data = await getDocs(faculdadeRef);

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      setUsuario({ ...userDoc.data()})
      setPerguntas((data.docs.map(doc =>  doc.data().perguntas).flat()))
      setCursos((data.docs.map(doc =>  doc.data().cursos).flat()))
      setLoad(true);
    } catch (err) {
    }
  };


useEffect(() => {
    getPerguntas();
  }, []);


  
  if(!load){
      return(<></>)
}


return (
  <div>
<title>Egresso</title>
<header id="header"><Header/></header>
<main id="formulario">
  <div className="containerTextoFormulario">
  <div className="tituloFormulario">Escreva seu depoimento</div>

    <div className="formaOval">
      
      <div className="textoFormulario">
        <div className="imgFormularioGif">
          <img src={require('./../../image/gifs/estrela.gif')} alt="ícone depoimento" />
        </div>
        <div className="paragrafo">
          <p><strong>Queremos saber sobre você, egresso!</strong></p>
          <p>
          Gostaríamos de convidá-lo a compartilhar conosco mais sobre sua 
          trajetória profissional após a formatura. 
          Sua história pode ser de grande ajuda para 
          os alunos que estão atualmente trilhando o caminho acadêmico.
          </p>

          <p>
          Agradecemos se você puder responder a algumas perguntas sobre sua carreira.
          Informamos que o seu relato será cuidadosamente revisado antes de ser 
          publicado para garantir sua qualidade e relevância.
          </p>

          <p>
          Nos conte mais sobre você respondendo nossas perguntas e se quiser
          contribuir um pouco mais, sinta-se á vontade para escrever um
          depoimento além das perguntas.
          </p>

        </div>
      </div>
    </div>
  </div>
  <div className="Formulario">
    <div className="tituloQuestionario">
      <div className="linhaQ" ></div>
        Questionário
      <div className="linhaQ"></div>
    </div>

    <div className="formularioPerg">
        {(perguntas.length>0 && cursos.length>0)? (
          <div className="pergs">
                <br></br>
            <div className="labInput">
              <label className="labelA" htmlFor="anoFormulario">
                <b>1. Em que ano você se formou na instituição?</b>
              </label>
              <select
                id="anoFormulario"
                name="anoFormulario"
                value={anoFormulario}
                className='textOption'
                onChange={(e) => setAnoFormulario(e.target.value)}
              >
                <option value=""></option>
                {anosDisponiveis.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="labInput">
              <label className="labelA" htmlFor="anoFormulario">
                <b>2. Em qual curso você se formou na instituição?</b>
              </label>
              <select
              className='textOption'
                id="anoFormulario"
                name="anoFormulario"
                onChange={(e) => setCurso(e.target.value)}
              >
                <option value=""></option>
                {cursos.map((curso) => (
                  <option key={curso} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
            </div>

              {perguntas.map((pergunta, index) => {
                return (
                    <div key={pergunta} className="labInput">
                    <label className='labelA' id="perguntaFormulario"><b>{index+3}. {pergunta}</b></label>
                    <textarea
                        className='textareaA'
                        type="text"
                        id={`respostaFormulario-${index}`}
                        name={`respostaFormulario-${index}`}
                        value={respostas[index]}
                        onChange={(e) => {
                          const newRespostas = [...respostas];
                          newRespostas[index] = e.target.value;
                          setRespostas(newRespostas);
                        }}
                      />
                    </div>
                );
                })}

                <div className="divErrorF"><p className={`errorF ${error ? "shakeF" : ""}`}>{error}</p></div>

                <div className="formBotoes">
                  <button onClick={()=>(navigate('/depoimentos'))} className="formBotoesCancelar">Cancelar</button>
                  <button onClick={submit} className="formBotoesSalvar">Salvar e enviar</button>
                </div>

          </div>):(
          <div className="semPerguntas">
          <img className="semPerguntasImg" src={require('../../image/gifs/ops.gif')} alt="Sem perguntas" />
          <p className="semPerguntasP">Ops, o administrador ainda não cadastrou as perguntas ou cursos. Volte mais tarde!</p>

          <div className="formBotoes">
              <button onClick={()=>(navigate('/depoimentos'))} className="formBotoesCancelar">Voltar</button>
            </div>
        </div>
          
          )}

    </div>

  </div>
</main>
<footer id="footer"></footer>
</div>

  );
}

export default Formulario;
