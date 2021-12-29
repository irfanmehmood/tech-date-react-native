// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYQ1trjCfYvapesqJRHFfPjkeM7JZ06jc",
  authDomain: "recruiter-675bd.firebaseapp.com",
  projectId: "recruiter-675bd",
  storageBucket: "recruiter-675bd.appspot.com",
  messagingSenderId: "6116008248",
  appId: "1:6116008248:web:11bbeb1941fd23b2d4a1cd",
  measurementId: "G-VRDM7VVK3X"
};


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

// Create our global Auth object
const auth = firebase.auth();

// Create access to our firestore database
const db = getFirestore();

// Custom function to get user from firstore by documntID which is the uid from Auth
const fsGetUser = async (uid) => {
  const docRef = doc(db, `users/${uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export { auth, fsGetUser };