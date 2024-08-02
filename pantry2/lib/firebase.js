// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTWsaJq7elByThd2brwmbfPdahRAnGD18",
  authDomain: "pantry-1274f.firebaseapp.com",
  projectId: "pantry-1274f",
  storageBucket: "pantry-1274f.appspot.com",
  messagingSenderId: "487669517968",
  appId: "1:487669517968:web:b9ddc2f04a7ba01f959215",
  measurementId: "G-EG7BRWQWS5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const storage = getStorage(app);

// Initialize Firebase
export { db };