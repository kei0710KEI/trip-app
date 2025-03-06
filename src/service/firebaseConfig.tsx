// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpsgbT-SUglqMIptgEafJ5YBPprN_yXTI",
  authDomain: "react-project-8fc38.firebaseapp.com",
  projectId: "react-project-8fc38",
  storageBucket: "react-project-8fc38.firebasestorage.app",
  messagingSenderId: "119420991950",
  appId: "1:119420991950:web:0537e6b694d884101d539f",
  measurementId: "G-52SNWPQP0Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);