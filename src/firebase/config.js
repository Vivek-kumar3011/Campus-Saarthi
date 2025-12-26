import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; // 1. Auth import 

const firebaseConfig = {
  apiKey: "AIzaSyDHEXLFEVzYRkz2pvcVf-e-hb1i-p6Hlbs",
  authDomain: "campus-saarthi.firebaseapp.com",
  projectId: "campus-saarthi",
  storageBucket: "campus-saarthi.firebasestorage.app",
  messagingSenderId: "960496072240",
  appId: "1:960496072240:web:a1b467a6f61a0856389ff5",
  measurementId: "G-LYPYQENLVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. export both services
export const db = getFirestore(app);
export const auth = getAuth(app); // 3.this line export important