// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1mCXMZw0oG2WGFdfe5q-z2P_EBHgIKpM",
  authDomain: "control-plane-84ede.firebaseapp.com",
  projectId: "control-plane-84ede",
  storageBucket: "control-plane-84ede.appspot.com",
  messagingSenderId: "116290946095",
  appId: "1:116290946095:web:ae818431108760573b72da",
  measurementId: "G-DBWBWPEEP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
