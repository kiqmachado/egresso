import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider,  } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {}; // apague esta linha inteira e cole a sua firebaseConfig.

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
