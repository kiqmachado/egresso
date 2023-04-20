import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase-config'
import { collection, getDocs, doc, updateDoc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import "./../../css/stylesFormulario.css"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
 



function Formulario() {
  const navigate = useNavigate();
  const authorization = UserAuth();

  const formularioClienteRef = collection (db, "formularioCliente");
  const perguntasADMRef = collection (db, "perguntasADM");
  const usersRef = collection (db, "usersRef");


  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("")
  const [perguntas, setPerguntas] = useState([])
  const [respostas, setRespostas] = useState([])  
  const [depoimento, setDepoimento] = useState([]);

  const submit = async () => {

    if (respostas.some((resposta) => resposta.trim() === "")) {
      setError("Alguma pergunta não foi respondida");
    } else {
      console.log(depoimento)
      await createPost();
    }
  };

  let yourDate = new Date()
  
const createPost = async () => {
    const docRef = doc(formularioClienteRef, auth.currentUser.uid);
  
    try {
      const docSnap = await getDoc(docRef);
        await setDoc(docRef, {relato: { perguntas: perguntas, respostas: respostas}, autor: 
          {name: user.name, id: auth.currentUser.uid, linkedin: user.linkedin, 
            instagram: user.instagram, facebook: user.facebook, imageURL: user.imageURL, }, 
          date: yourDate.toISOString().split('T')[0]
        });
      navigate('/depoimentos');
    } catch (err) {
      console.error(err);
    }
  };

  const getPerguntas = async () => {
    try {
      const data = await getDocs(perguntasADMRef);
      setPerguntas((data.docs.map(doc =>  doc.data().perguntas).flat()))
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(getFirestore(), 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        setUser({ id: user.uid, ...userDoc.data() });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);


useEffect(() => {
    getPerguntas();
    setRespostas(Array(perguntas.length).fill(""))
  }, []);


  return (
    <div>
  <title>Egresso</title>
  <header id="header"><Header/></header>
  <main id="formulario">
    <div className="containerTextoFormulario">
      <div className="formaOval">
        <div className="tituloFormulario">Escreva seu depoimento</div>
        <div className="textoFormulario">
          <img src="../image/testemunho.png" alt="ícone depoimento" />
          <div className="paragrafo">
            <p>Queremos saber sobre você, egresso!</p>
            <br />
            <p>
              Nos conte mais sobre você respondendo nossas perguntas e se quiser
              contribuir um pouco mais, sinta-se á vontade para escrever um
              depoimento além das perguntas.
            </p>
            <br />
            <p>
              No final você pode decidir se quer publicar suas respostas, o
              depoimento e sua foto de perfil. Informamos também que suas
              respostas e Perguntas serão enviados para aprovação.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="Formulario">
      <div className="tituloQuestionario">
        <div className="linhaQ" />
        Questionário
        <div className="linhaQ" />
      </div>
      <div className="formularioPerg">
    
          <div className="pergs">
          {perguntas.map((pergunta, index) => {
            return (
                <div key={pergunta} className="labInput">
                <label className='labelA' id="perguntaFormulario"><b>{index+1}. {pergunta}</b></label>
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

        <h3 className="error"><p>{error}</p></h3>

     
            {/* <div className="labInputCheck">
              <input
                type="checkbox"
                id="checkbox"
                name="perguntaFormularioCheck"
              />
              <label id="perguntaFormularioCheck">
                Desejo publicar minhas respostas desse questionário.
              </label>
            </div>
            <div className="labInputCheck">
              <input
                type="checkbox"
                id="checkbox"
                name="perguntaFormularioCheck"
              />
              <label id="perguntaFormularioCheck">
                Publicar com minha foto do perfil e minhas redes.
              </label>
            </div> */}

            <div className="formBotoes">
              <button onClick={()=>(navigate('/depoimentos'))} className="formBotoesCancelar">Cancelar</button>
              <button onClick={submit} className="formBotoesSalvar">Salvar e enviar</button>
            </div>

          </div>
      </div>
    </div>
  </main>
  <footer id="footer"></footer>
</div>

    );
  }

export default Formulario;
