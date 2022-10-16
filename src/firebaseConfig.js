// users
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// getFirestore
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCQ_Y-ADvWarMtNH_fFsAwhGR6zB7XZ1l8",
  authDomain: "iconmedios-app.firebaseapp.com",
  databaseURL: "https://iconmedios-app-default-rtdb.firebaseio.com",
  projectId: "iconmedios-app",
  storageBucket: "iconmedios-app.appspot.com",
  messagingSenderId: "837795371581",
  appId: "1:837795371581:web:1eb813031042fd974e2854",
  measurementId: "G-QH29DZE18H"
};

initializeApp(firebaseConfig);
const auth = getAuth();
// firestore
const dbCliente = getFirestore();

export { auth, dbCliente };
