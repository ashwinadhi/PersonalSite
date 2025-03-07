// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestone, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBohAlS4CME0YC97aHbB29fH2mNFQcn1Vs",
  authDomain: "personalsite-452e8.firebaseapp.com",
  projectId: "personalsite-452e8",
  storageBucket: "personalsite-452e8.firebasestorage.app",
  messagingSenderId: "94831950317",
  appId: "1:94831950317:web:afc8701de6f4c6d1908fe4",
  measurementId: "G-B2ND7GMR2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};