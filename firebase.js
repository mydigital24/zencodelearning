// Firebase Setup für Zen Code
// Auth: E-Mail & Passwort | Sync: Firestore (users/{uid})

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAySiMGc3vbfkPwlTuLFnMRdZsBSLvZ1p8",
    authDomain: "cooking-plan-12404.firebaseapp.com",
    projectId: "cooking-plan-12404",
    storageBucket: "cooking-plan-12404.firebasestorage.app",
    messagingSenderId: "646774578838",
    appId: "1:646774578838:web:1d2b37c22918923702acb7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    serverTimestamp
};
