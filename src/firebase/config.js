// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaejZsoglofYw_akCIABfiTlDwYZ0HROs",
  authDomain: "clone-33442.firebaseapp.com",
  projectId: "clone-33442",
  storageBucket: "clone-33442.appspot.com",
  messagingSenderId: "965501461625",
  appId: "1:965501461625:web:ec071b0d22889b68f320a8",
  measurementId: "G-L25ZQ6018D",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

export { auth };
export default firebase;
