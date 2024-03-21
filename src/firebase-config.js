// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJi28aRIygJpuXhyRo9PeE-3lTAqZGALA",
  authDomain: "testtest-c98a8.firebaseapp.com",
  projectId: "testtest-c98a8",
  storageBucket: "testtest-c98a8.appspot.com",
  messagingSenderId: "784438495948",
  appId: "1:784438495948:web:390821803350250a4c1069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {auth};