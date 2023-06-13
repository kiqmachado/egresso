import React, { useEffect, useState } from 'react';
import { EmailAuthProvider, deleteUser, getAuth, onAuthStateChanged, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import { db, auth } from './../../firebase-config'
import { collection, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import './../../css/stylesPerfilUsuario.css';
import { storage } from './../../firebase-config';
import {ref, uploadBytes, getDownloadURL, getStorage, deleteObject,
} from "firebase/storage";
import ModalDepoimento from '../../components/Modal/ModalExcluirDepoimento'
import ModalConta from '../../components/Modal/ModalExcluirConta'


const Usuario = () => {

  const [modalOpenDepoimento, setModalOpenDepoimento] = useState(false);
  const [modalOpenConta, setModalOpenConta] = useState(false);

  const [imageUpload, setImageUpload] = useState();
  const [imageURL, setImageURL] = useState(""); 

  const [password, setPassword] = useState("")

  const [display, setDisplay] = ('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const [error, setError] = useState("");
  const [list, setList] = useState();
  const usersRef = collection (db, "users");
  const depoimentosRef = collection (db, "depoimentos");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(getFirestore(), 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        setList({ id: user.uid, ...userDoc.data() });
      } else {
        setList(null);
      }
    });
    return () => unsubscribe();
  }, []);

  

  useEffect(() => {
    if(list){
    setEmail(list.email)
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
      if(name.trim()===""|| cpf.trim()===""||date.trim()===""){
        setError("Preencha os campos obrigatórios(*)");}
          else{
            try {
              const docRef = doc(usersRef, list.id);
              const userDoc = doc(db, "depoimentos", list.id)

              await updateProfile(auth.currentUser, { displayName: name.trim().toUpperCase(), photoURL: imageURL});

              await updateDoc(userDoc, {usuario: {name: name.trim().toUpperCase(), email: email, phone: phone, linkedin: linkedin, instagram: instagram, 
                                        facebook: facebook, imageURL: imageURL}}).catch(error => {});

              await updateDoc(docRef, {name: name.trim().toUpperCase(), phone: phone, date: date, cpf: cpf, 
                                      linkedin: linkedin, instagram: instagram, facebook: facebook, imageURL: imageURL});

                navigate('/depoimentos')
            } catch (error) {
              setError("Erro ao cadastrar");
        }}
  };



const apagarConta = async () => {
  try {
    
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      
    const userDocRef = doc(db, 'users', user.uid);
    const depoimentosDocRef = doc(db, 'depoimentos', user.uid);
    const photoRef = ref(storage, `images/${user.uid}`);

    try {await deleteDoc(depoimentosDocRef);} catch (error) {}
    try {await deleteObject(photoRef);} catch (error) {}

    await deleteDoc(userDocRef);
    await deleteUser(user);
  } catch (error) {

  }
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
    const userDoc = doc(db, "depoimentos", id)
    await deleteDoc(userDoc);
  };


  const handleDeleteDepoimento = () => {
    deleteDepoimento(list.id);
    };

  const handleDeleteConta = () => {
    apagarConta()
    };
    


  if(!auth.currentUser || !list){
    return<></>
  }
   

  return (
    <div>
    {modalOpenDepoimento && <ModalDepoimento setOpenModal={setModalOpenDepoimento} onDeleteDepoimento={handleDeleteDepoimento} />}
    {modalOpenConta && <ModalConta setOpenModal={setModalOpenConta} setPassword={setPassword} onDeleteConta={handleDeleteConta} />}
    <title>Egresso</title>
    <header id="header" ><Header/></header>
    <main id="perfilUsuario">
  
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
                  disabled
                  defaultValue={email}></input>
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
                  maxLength={14}
                  value={cpf} onChange={(e) => {
                    const inputValue = e.target.value;
                  
                    const formattedValue = inputValue
                      .replace(/\D/g, "") // Remove caracteres não numéricos
                      .replace(/(\d{3})(\d)/, "$1.$2") // Insere ponto após os primeiros 3 dígitos
                      .replace(/(\d{3})(\d)/, "$1.$2") // Insere ponto após os próximos 3 dígitos
                      .replace(/(\d{3})(\d{2})$/, "$1-$2"); // Insere hífen após os últimos 3 e 2 dígitos
                  
                    setCpf(formattedValue);
                  }}></input>

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
                    value={phone}
                    maxLength={14}
                    onChange={(e)=>{
                        const inputValue = e.target.value;
                    
                        const formattedValue = inputValue
                          .replace(/\D/g, "") // Remove caracteres não numéricos
                          .replace(/^(\d{2})(\d)/g, "($1) $2") // Insere parênteses após os primeiros 2 dígitos
                          .replace(/(\d)(\d{4})(\d{4})$/, "$1-$2-$3"); // Insere hífen após os próximos 4 e 4 dígitos
                    
                        setPhone(formattedValue);
                    }}
                  />
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
                <div className="input-with-icon">
                <input
                  type="text"
                  className="form-control"
                  name="nv_Instagram"
                  placeholder="egresso
                  "
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <i className="fa fa-at" aria-hidden="true"></i>
              </div>

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
                  <a href="javascript:void(0)" onClick={() => window.open('/termos', '_blank', 'width=600,height=400')}>Termos De Uso</a>
                </label>
              </div>
              
              <div className="btnPUGeral">
                <button  onClick={()=>console.log(auth.currentUser)} className="btnPU">
                  Criar depoimento
                </button>
                <button onClick={()=> setModalOpenDepoimento(true)} className="btnPU">
                  Excluir depoimento
                </button>

                {!list.isAdmin && 
                <button  onClick={()=>setModalOpenConta(true)} className="btnPU">
                Excluir conta
                </button>}
              </div>
  
              <button onClick={()=>save()} className="btnPUDepoimento">
                Salvar minhas alterações
              </button>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <footer id="footer" />
    </div>
  
    
    );
  };
export default Usuario;