import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdD_GGS8AxIozfQ_v2eDMzqcz1N3LwgSI",
  authDomain: "snapchat-clone-1c564.firebaseapp.com",
  projectId: "snapchat-clone-1c564",
  storageBucket: "snapchat-clone-1c564.appspot.com",
  messagingSenderId: "459777366288",
  appId: "1:459777366288:web:c5ac0a1a9d053421e2ad95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();

const storage = getStorage(app)

export {auth, db, provider, storage}
