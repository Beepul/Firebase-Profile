// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEWO_NFlShiDPO7dRTTz7OWumQhNDE6Nw",
  authDomain: "crud-profile-15f76.firebaseapp.com",
  projectId: "crud-profile-15f76",
  storageBucket: "crud-profile-15f76.appspot.com",
  messagingSenderId: "87012333426",
  appId: "1:87012333426:web:0684408b4d1d4b0a4f6feb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);