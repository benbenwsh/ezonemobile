// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { getFirestore, query, doc, getDoc, getDocs, collection, where, addDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

const fetchItem = async (docId) => {
  try {
    console.log("hi");
    const querySnapshot = await getDoc(doc(db, 'items', docId))
    console.log(querySnapshot.data());
    return querySnapshot.data();
  } catch (err) {
    console.error("Error is here:" + err);
    alert("An error occured while fetching user data")
  }
}

const fetchItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    return fetchedItems;
  } catch (err) {
    console.error("Error is here:" + err);
    alert("An error occured while fetching user data")
  }
}

const uploadItem = async () => {
  try {
    const storage = getStorage();

    const storageRef = ref(storage, 'item1.webp');

    const imageURL = await getDownloadURL(storageRef);

    const itemDoc = {
      name: 'Genie S80 Manlift',
      location: 'Hong Kong',
      price: 2500,
      imageUrl: imageURL,
      description: "Genie S80 Manlift.. Estimated Dimension ( L x W x H): 37'x8.21'x8.21'."
    };

    // Save the image document in Firestore collection
    const collectionRef = collection(db, 'items');
    await addDoc(collectionRef, itemDoc);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export { app, auth, db, analytics, registerWithEmailAndPassword, logInWithEmailAndPassword, fetchItem, fetchItems, uploadItem };