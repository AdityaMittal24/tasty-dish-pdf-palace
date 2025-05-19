
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5cXOSF3K4QqGM_ia85lV9AIoRxTXTqXA",
  authDomain: "swijjy-bd19a.firebaseapp.com",
  projectId: "swijjy-bd19a",
  storageBucket: "swijjy-bd19a.firebasestorage.app",
  messagingSenderId: "277038980890",
  appId: "1:277038980890:web:a65eb77ee73e55bb6456a3",
  measurementId: "G-RHZ0ZDCBL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;
