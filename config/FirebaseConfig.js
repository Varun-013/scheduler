// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "scheduler-aa6ba.firebaseapp.com",
  projectId: "scheduler-aa6ba",
  storageBucket: "scheduler-aa6ba.appspot.com",
  messagingSenderId: "906340330813",
  appId: "1:906340330813:web:37c1e4a41b84cc0ad82954",
  measurementId: "G-7562P0LC0C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
