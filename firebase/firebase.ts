
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqDflmmZ-GdGLw6VG2nhWsqk5GDRh8WpE",
  authDomain: "olx-clone-3ec0a.firebaseapp.com",
  projectId: "olx-clone-3ec0a",
  storageBucket: "olx-clone-3ec0a.appspot.com",
  messagingSenderId: "989346871515",
  appId: "1:989346871515:web:e14d2a1d1e601794fd34fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app