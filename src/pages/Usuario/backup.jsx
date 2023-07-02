import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import { db, auth } from './../../firebase-config'
import { collection, deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import './../../css/stylesUsuario.css';
import homem3 from './../../image/homem3.jpg'
import { storage } from './../../firebase-config';
import {ref, uploadBytes, getDownloadURL,
} from "firebase/storage";

const Usuario = () => {
  const [imageUpload, setImageUpload] = useState();
  const [imageURL, setImageURL] = useState(""); 

  const [display, setDisplay] = ('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const [error, setError] = useState("ERRO");
  const [list, setList] = useState();
  const usersRef = collection (db, "users");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(getFirestore(), 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log("Chamando GET na Usuario");
        setList({ id: user.uid, ...userDoc.data() });
      } else {
        setList(null);
      }
    });
    return () => unsubscribe();
  }, []);

  

  useEffect(() => {
    if(list){
    setName(list.name);
    setCpf(list.cpf);
    setDate(list.date);
    setPhone(list.phone)
    setLinkedin(list.linkedin?list.linkedin:"")
    setInstagram(list.instagram?list.instagram:"")
    setFacebook(list.facebook?list.facebook:"")
    setImageURL(list.imageURL?list.imageURL:"")
    }
  }, [list]);


  const save = async () => {
      if(name.trim()===""|| cpf.trim()===""||date.trim()===""||phone.trim===""){
        setError("Preencha os campos obrigatórios(*)");}
          else{
            try {
              const docRef = doc(usersRef, list.id);
              await setDoc(docRef, {
                name: name,
                phone: phone,
                date: date,
                cpf: cpf,
                linkedin: linkedin,
                instagram: instagram,
                facebook: facebook,
                imageURL: imageURL,
                })
                navigate('/depoimentos')
            } catch (error) {
              setError("Erro ao cadastrar");
          
              console.error(error);
        }}
  };




const uploadFile = () => {
    if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${list.id}`);
      const metadata = {
      contentType: 'image/jpeg'
  };
    uploadBytes(imageRef, imageUpload, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url);
      });
    });
  };

  
  useEffect(() => {
    if (imageUpload) {
      uploadFile(); // Chama a função uploadFile quando houver uma nova imagem selecionada
    }
  }, [imageUpload]);


  const deleteDepoimento = async (id) => {
    const userDoc = doc(db, "formularioCliente", id)
    await deleteDoc(userDoc);
  };



  if(!auth.currentUser || !list){
    return<></>
  }
   
    return (
      <div className="Usuario">
            <header id='header'>
                <Header/>
            </header>
  
        <div className="conteinerGeral">    
          <div className="tituloUsuario">
            <h1>Minha conta</h1>
          </div>
  
            {/* <form className="formUsuario" onSubmit={{}}> */}
              <div className="containerUsuario">
                  <div className="informacaoUsuario">
                      <div className="infoEsq">
                          <div className="fotoUsuario">
                            
                          <img className="imgUsuario" src={imageURL} alt='userPhoto'/>
                      
                          </div>
                          <label htmlFor="fileInput" className="btnEditarDepoimento"> Selecionar Foto</label>
                            <input id="fileInput" type="file"  onChange={(event)=>{setImageUpload(event.target.files[0])}} style={{ display: 'none' }}
                            />
                          <button onClick={()=>navigate('/create')} className="btnEditarDepoimento">Editar depoimento</button>
                          <button onClick={()=>deleteDepoimento(list.id)}className="btnRemoverDepoimento">Remover depoimento</button>
                      </div>
                      <div className="infoDir">
                          <div className="tituloNomeUsuario">
                            <h3>Olá, {auth.currentUser.displayName}!</h3>
                          </div>
                          
                          <div className="dadosUsuario">
                              <input className='inputUsuario' id="nome" type="text" placeholder="Nome" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                              <input className='inputUsuario' id="cpf" type="text" placeholder="CPF" value={cpf} onChange={(e)=>{setCpf(e.target.value)}}></input>
                              <input className='inputUsuario' id="dataNascimento" type="date" placeholder="Data de nascimento" value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
                              <input className='inputUsuario' id="wpp" type="number" placeholder="WhatsApp" value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input>
                              <input className='inputUsuario' id="instagram" type="text" placeholder="Instagram" value={instagram} onChange={(e)=>{setInstagram(e.target.value)}}></input>
                              <input className='inputUsuario' id="facebook" type="text" placeholder="Facebook" value={facebook} onChange={(e)=>{setFacebook(e.target.value)}}></input>
                              <input className='inputUsuario' id="linkedin" type="text" placeholder="Linkedin" value={linkedin} onChange={(e)=>{setLinkedin(e.target.value)}}></input>                        
                          </div>
                      </div>
                  </div>
                  
                  <div className="btnUsuario">
                  <button onClick={()=>save()}className="btnUsuarioSalvar">Salvar</button>
  
                </div>
              </div>
  
            {/* </form> */}
  
          </div>
            <footer id='footer'>
                
            </footer>    
      </div>
  
      );
    }
  
  export default Usuario;
  
