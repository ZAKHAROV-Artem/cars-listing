// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5iMvvz32Yj60K7qJAzKxOXIIazbWDAss",
  authDomain: "mekina-1138.firebaseapp.com",
  databaseURL: "https://mekina-1138.firebaseio.com",
  projectId: "mekina-1138",
  storageBucket: "mekina-1138.appspot.com",
  messagingSenderId: "206145007451",
  appId: "1:206145007451:web:1d2f226491295b80a1b47e",
  measurementId: "G-DVP9SLVMTX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
