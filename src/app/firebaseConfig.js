import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCTDgTGF5TIummlnuoVf2n6ATHUfowLHOo",
  authDomain: "hackathon-d9cf6.firebaseapp.com",
  projectId: "hackathon-d9cf6",
  storageBucket: "hackathon-d9cf6.appspot.com",
  messagingSenderId: "576189458903",
  appId: "1:576189458903:web:82c5bcd15b8a722ec8c392",
  measurementId: "G-YXTC4T3H38"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
