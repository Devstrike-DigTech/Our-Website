// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc6h-stUuZmmXuaGmrTQGvyWuw9F70yls",
  authDomain: "base-web-9f0d4.firebaseapp.com",
  projectId: "base-web-9f0d4",
  storageBucket: "base-web-9f0d4.firebasestorage.app",
  messagingSenderId: "170329368758",
  appId: "1:170329368758:web:62268b1006d544f53b9e17",
  measurementId: "G-JKRLS0LNSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);