import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration — loads from process.env, with safe client fallbacks for build-time/prerendering
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAoEXzDsxahSqiu-oVRpJYy20FjGHZ848I",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "pet-12-c8a64.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "pet-12-c8a64",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "pet-12-c8a64.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "895296798830",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:895296798830:web:b1f67e9a8690ce27d6267f",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XX86NMSGRB",
};

// Firebase initialize
const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
