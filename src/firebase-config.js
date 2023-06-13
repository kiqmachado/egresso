import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider,  } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDj_CY9Ou5PHXMRM6ODnrskoP2iJ6uftpg",
  authDomain: "egresso-3bbb0.firebaseapp.com",
  projectId: "egresso-3bbb0",
  storageBucket: "egresso-3bbb0.appspot.com",
  messagingSenderId: "960828167637",
  appId: "1:960828167637:web:6ecf277c07e7f528dc595c",
  measurementId: "G-384M7JTYF5"
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();