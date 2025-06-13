// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC--jToSeRjXvhVJIxozv2lS5RSE0z71IE",
  authDomain: "firecm-94d7b.firebaseapp.com",
  projectId: "firecm-94d7b",
  storageBucket: "firecm-94d7b.firebasestorage.app",
  messagingSenderId: "149417140765",
  appId: "1:149417140765:web:02886f40af672deb1d5cf4",
  measurementId: "G-5WSJLE1F13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);