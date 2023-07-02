import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import { db, auth } from './../../firebase-config'
import { collection, deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import './../../css/stylesPerfilUsuario.css';
import { storage } from './../../firebase-config';
import {ref, uploadBytes, getDownloadURL,
} from "firebase/storage";


const PerfilUsuario = () => {


  const [imageUpload, setImageUpload] = useState();
  const [imageURL, setImageURL] = useState(""); 

  const [display, setDisplay] = ('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    console.log("Foto")
  }, [imageUpload]);


  const deleteDepoimento = async (id) => {
    const userDoc = doc(db, "formularioCliente", id)
    await deleteDoc(userDoc);
  };



  if(!auth.currentUser || !list){
    return<></>
  }
   

  return (
    <div>
    <title>Egresso</title>
    <header id="header" ><Header/></header>
    <main id="perfilUsuario">
      
    <form
      className="box"
      action="{{url_for('membros.atualizar_page')}}"
      method="post"
    >
      <section className="user-profile">
        <div className="headerPU">
          <div className="cover">
            <div className="perfil-usuario-avatar">
              <img
                src={imageURL}
                alt="img-avatar"
              />
              <button type="button" className="boton-avatar" onClick={() => { document.getElementById('fileInput').click(); }}>
                <i className="far fa-image" />
              </button>

                <input id="fileInput" type="file"  onChange={(event)=>{setImageUpload(event.target.files[0])}} style={{ display: 'none' }}
                            />
            </div>
          </div>
        </div>
        <div className="user-profile-body">
          <div className="user-profile-bio">
            <ul align="left" className="data-list">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nv_nome"
                  placeholder="Nome"
                  defaultValue=""
                  value={name} onChange={(e)=>{setName(e.target.value)}}></input>
              </div>
            </ul>
          </div>
          <div className="user-profile-footer">
            <ul className="data-list">
              <div className="mb-3">
                <label htmlFor="emaill" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="nv_email"
                  placeholder="Email"
                  defaultValue="usuario@gmail.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cpf" className="form-label">
                  CPF:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nv_cpf"
                  placeholder="123.456.789-10"
                  defaultValue=""
                  value={cpf} onChange={(e)=>{setCpf(e.target.value)}}></input>

              </div>
              <div className="mb-3">
                <label htmlFor="dataDeNascimento" className="form-label">
                  Data de nascimento:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="nv_dataDeNascimento"
                  placeholder="Idade"
                value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
              </div>
              <div className="mb-3">
                <label htmlFor="WhatsApp" className="form-label">
                  WhatsApp:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nv_WhatsApp"
                  placeholder="(DDD) 11111-1111"
                  defaultValue=""
                  value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input>
              </div>
              <div className="mb-3">
                <label htmlFor="LinkedIn" className="form-label">
                  LinkedIn:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nv_LinkedIn"
                  placeholder="LinkedIn"
                  value={linkedin} onChange={(e)=>{setLinkedin(e.target.value)}}></input>   
              </div>
              <div className="mb-3">
                <label htmlFor="Instagram" className="form-label">
                  Instagram:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nv_Instagram"
                  placeholder="@seunome"
                  value={instagram} onChange={(e)=>{setInstagram(e.target.value)}}></input>

              </div>
              <div className="mb-3">
                <label htmlFor="Facebook" className="form-label">
                  Facebook:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nv_Facebook"
                  placeholder="Facebook"
                  value={facebook} onChange={(e)=>{setFacebook(e.target.value)}}></input>
              </div>
              <div className="mb-3 form-check">
                <label className="form-check-label">
                  Veja aqui nossos{" "}
                  <a href="url_dos_termos_de_uso">Termos De Uso</a>
                </label>
              </div>
              
              <div className="btnPUGeral">
                <button  onClick={()=>navigate('/create')} className="btnPU">
                  Editar meu depoimento
                </button>
                <button onClick={()=>deleteDepoimento(list.id)} className="btnPU">
                  Excluir meu depoimento
                </button>
                <button  onClick={()=>navigate('/depoimentos')} className="btnPU">
                Ver meu depoimento
                </button>
              </div>
  
              <button onClick={()=>save()} className="btnPUDepoimento">
                Salvar minhas alterações
              </button>
            </ul>
          </div>
        </div>
      </section>
    </form>
    {/* <label for="file-upload" class="custom-file-upload">
      <i class="far fa-image"></i>
    </label>
    <input class="btnPU" id="" type="file" name="img" required /> */}
    </main>
    <footer id="footer" />
    </div>
  
    
    );
  };
export default PerfilUsuario;