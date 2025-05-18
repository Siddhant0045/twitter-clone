// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config object from Firebase Console > Project Settings
const firebaseConfig = {
    apiKey: "AIzaSyDJS4VP3Ll6L52jlD_hcqByeyTdwD7_euM",
    authDomain: "twitter-clone-d58b5.firebaseapp.com",
    projectId: "twitter-clone-d58b5",
    storageBucket: "twitter-clone-d58b5.firebasestorage.app",
    messagingSenderId: "857372559632",
    appId: "1:857372559632:web:5747d4a36bb3278bbebd95",
    measurementId: "G-8EDR40DHPZ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);