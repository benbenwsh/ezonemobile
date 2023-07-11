// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBex14fQEAc44SEEG_JGHBfyO9RvYz06tA",
  authDomain: "fotama-surplus.firebaseapp.com",
  projectId: "fotama-surplus",
  storageBucket: "fotama-surplus.appspot.com",
  messagingSenderId: "45618781820",
  appId: "1:45618781820:web:361edb899af526b54d33f9",
  measurementId: "G-LFSDGCJE33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const registerWithEmailAndPassword = async (email, password, fName, lName, country, city, state, address, chkTerm) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: email,
      fName: fName,
      lName: lName,
      country: country,
      city: city,
      state: state,
      address: address,
      chkTerm: chkTerm
    });
  } catch (err) {
    return {success: false, message: err.message}
  }

  return {success: true}
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return {success: false, message: err.message}
  }
  return {success: true}
};

export { app, auth, db, analytics, registerWithEmailAndPassword, logInWithEmailAndPassword};