import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db, auth } from './../firebase-config';

const AdmContext = createContext();

export const AdmContextProvider = ({ children }) => {
  const [adm, setAdm] = useState({});


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if(!currentUser){
        setAdm(null);
        console.log("Não current user")
      }
      else{
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log("Chamando GET na ADMCONTEXT");
        console.log(userDocSnapshot);

        if (userDocSnapshot.exists() && userDocSnapshot.data().isAdmin === true) {
          setAdm(currentUser);
          console.log("É adm")
        }
        else{
          setAdm(null);
          console.log("Não é adm")
        }
      }
    } 
  );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AdmContext.Provider value={{ adm }}>
      {children}
    </AdmContext.Provider>
  );
};

export const AdmAuth = () => {
  return useContext(AdmContext);
};