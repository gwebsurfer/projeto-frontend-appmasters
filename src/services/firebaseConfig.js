import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjmuOgVDDeTGHOt8TQwApSCb56KAX16ig",
  authDomain: "react-appmasters.firebaseapp.com",
  projectId: "react-appmasters",
  storageBucket: "react-appmasters.appspot.com",
  messagingSenderId: "1086308053562",
  appId: "1:1086308053562:web:c2d6c47acd38736a263b03",
  measurementId: "G-7XHYJ908JX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);