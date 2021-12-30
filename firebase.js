// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs, query, where} from "firebase/firestore";

import { getDatabase, ref, set } from "firebase/database";
import "firebase/compat/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYQ1trjCfYvapesqJRHFfPjkeM7JZ06jc",
  authDomain: "recruiter-675bd.firebaseapp.com",
  projectId: "recruiter-675bd",
  storageBucket: "recruiter-675bd.appspot.com",
  messagingSenderId: "6116008248",
  appId: "1:6116008248:web:11bbeb1941fd23b2d4a1cd",
  measurementId: "G-VRDM7VVK3X",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// Create our global Auth object
const auth = firebase.auth();

// Expo, Firebase recipies
// https://modularfirebase.web.app/common-use-cases/firestore/

// Get user document - profile
const fsGetUser = async (uid) => {
  // Create access to our firestore database
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// Get user document - profile
const fsGetAvilableMatches = async (uid) => {
  
  const db = getFirestore();
  const q = query(collection(db, "users"), where("uid", "!=", uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

// Update user document - profile
const fsUpdateUser = async (uid, userProfileName, userProfileAge) => {
  // Create access to our firestore database
  const docRef = doc(getFirestore(), "users", uid);
  await updateDoc(docRef, {
    name: userProfileName,
    age: parseInt(userProfileAge)
  });

  console.log("Updated user!");
};

const registerUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).then( (response) => {
    console.log(response);
  }).catch( (error) => {
     console.log(error.message);
  });
}

const createDummyData = async (howMany) => {

  //registerUser

  // Get our random users
  const response  = await fetch(`https://randomuser.me/api/?results=3&nat=gb,us,es`);

  // Covert to JSON
  const users = await response.json();

  // Loop over our random Users
  users.results.forEach(function (user) {

    // Try to register user
    let registered = registerUser(user.email, 'pass1234');

    // If success
    if (registered) {

      // Create user profile
        
    }

  });

  

  
  
  // let users = [];

  // if (women) {
  //   for (let i = 1; i < 10; i++) {
  //     users.push({
  //       imageUrl: `https://randomuser.me/api/portraits/women/${i}.jpg`,
  //       name: `Women ${i}`,
  //     })
  //   }
  // }

  // if (men) {
  //   for (let m = 1; m < 10; m++) {
  //     users.push({
  //       imageUrl: `https://randomuser.me/api/portraits/men/${m}.jpg`,
  //       name: `Men ${m}`,
  //     })
  //   }
  // }

  // return users;

}



export { auth, fsGetUser, fsUpdateUser, fsGetAvilableMatches, createDummyData };
