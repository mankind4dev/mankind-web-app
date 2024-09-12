// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:   import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mankind-web-app.firebaseapp.com",
  projectId: "mankind-web-app",
  storageBucket: "mankind-web-app.appspot.com",
  messagingSenderId: "1006259289470",
  appId: "1:1006259289470:web:a12e180692a570552d072f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
  