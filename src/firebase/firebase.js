import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABShEM7mKGuFyhvcd2eaTeekHK2-SJ6v0",
  authDomain: "new-a28d6.firebaseapp.com",
  projectId: "new-a28d6",
  storageBucket: "new-a28d6.firebasestorage.app",
  messagingSenderId: "47648106755",
  appId: "1:47648106755:web:f4eb936ba21b9f8d876136"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider, 
  signOut, 
  onAuthStateChanged,
  db, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  Timestamp 
};