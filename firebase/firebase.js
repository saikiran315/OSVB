import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAkufXeg2rbk11gjtQT5GwkBqjfiSAZGRI",
  authDomain: "nextjs-701fb.firebaseapp.com",
  projectId: "nextjs-701fb",
  storageBucket: "nextjs-701fb.appspot.com",
  messagingSenderId: "634650806361",
  appId: "1:634650806361:web:de496b003743839cfc8948",
  measurementId: "G-R2277YPQZY",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
