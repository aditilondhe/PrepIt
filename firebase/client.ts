import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw2tMYb_iIUMOkeb-tWiJH_xIAsBEkmdw",
  authDomain: "prepit-ab3b0.firebaseapp.com",
  projectId: "prepit-ab3b0",
  storageBucket: "prepit-ab3b0.firebasestorage.app",
  messagingSenderId: "656846527346",
  appId: "1:656846527346:web:75f078ad346db480d11beb"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig):getApp();

export const auth=getAuth(app)
export const db=getFirestore(app)