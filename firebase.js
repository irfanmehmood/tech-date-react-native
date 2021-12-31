// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { setDoc, getFirestore, doc, getDoc, updateDoc, collection, getDocs, query, where} from "firebase/firestore";

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

const createDummyData = async (howMany) => {

  // DB handle
  const db = getFirestore();

  // Get our random males
  const getMales = await fetch(`https://randomuser.me/api/?results=${howMany}&nat=gb,us,es&gender=male`);

  // Covert to JSON
  const males = await getMales.json();

  // Get our random females
  const getFemales = await fetch(`https://randomuser.me/api/?results=${howMany}&nat=gb,us,es&gender=female`);

  // Covert to JSON
  const females = await getFemales.json();

  const users = males.results.concat(females.results);

  // Loop random users and create user & profile on firebase
  for (const user of users) {

    let newUser = await auth.createUserWithEmailAndPassword(user.email, 'pass1234');

    let name = user.name.first + " " + user.name.last;

    let newUserProfile = await setDoc(doc(db, 'users', newUser.user.uid), {
      uid: newUser.user.uid,
      name: name,
      gender: user.gender,
      age: user.dob.age,
      countryCode: user.nat,
      imageUrl: user.picture.large
    });

    console.log("User profile created for: ", name);
  }

}


export { auth, fsGetUser, fsUpdateUser, fsGetAvilableMatches, createDummyData };
