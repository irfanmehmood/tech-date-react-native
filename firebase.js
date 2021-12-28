// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// const db = app.firestore();
const auth = firebase.auth();

export { auth };