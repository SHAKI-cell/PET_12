import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration — Firebase Console se
const firebaseConfig = {
  apiKey: "AIzaSyAoEXzDsxahSqiu-oVRpJYy20FjGHZ848I",
  authDomain: "pet-12-c8a64.firebaseapp.com",
  projectId: "pet-12-c8a64",
  storageBucket: "pet-12-c8a64.firebasestorage.app",
  messagingSenderId: "895296798830",
  appId: "1:895296798830:web:b1f67e9a8690ce27d6267f",
  measurementId: "G-XX86NMSGRB",
};

// Firebase initialize
const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
