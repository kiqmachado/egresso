import React, { useEffect, useState } from 'react';
import './../../css/stylesHome.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc} from 'firebase/firestore';



function Header({  }){

const navigate = useNavigate();
const usersRef = collection (db, "users");
const [name, setName] = useState(null)

const logout = async () => {
    const exit = await signOut(auth).then(()=>{
        navigate('/login')     
    })
  }

  const getUser = async () => {
    const user = auth.currentUser;
    try {
      if (user) {
        const userDoc = doc(usersRef, user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setName(userSnapshot.data().name);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [()=>{getUser()}]);
  

    return (
      <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Egresso</title>
      <header id="header">
          <div className="headerEsq">
          <div className="fotoLogo">
              <a href="/">
                  <img src={require("./../../image/egresso.png")} alt="Logo Egresso"/>
              </a>
          </div>
          <div className="nomeSite">
              <h1>Egresso</h1>
          </div>
          </div>
          <div className="headerDir">
          <div className="opc">
              <a href="./">Home</a>
              <a href="./depoimentos">Egressos</a>

              { name !== null &&
             <div className='userNameLogin'>
              <a href="./usuario"><b>Bem vindo, {name}!</b></a>
             <button className='btnNameLogin'onClick={logout}>Sair</button></div>
              }

              { name === null && 
              <div className='userNameLogin'>
              <a href="./login">Login</a>
              </div>
              }
          </div>
          </div>
      </header>
      </div>
    );
}
export default Header;