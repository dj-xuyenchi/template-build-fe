import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAGw1SMgBUuAHPeMILi0pDjaA45MC7En3w",
  authDomain: "erp-tem.firebaseapp.com",
  projectId: "erp-tem",
  storageBucket: "erp-tem.firebasestorage.app",
  messagingSenderId: "492874779013",
  appId: "1:492874779013:web:0905bdd430ae3cbdccdcec",
  measurementId: "G-QCMYMH1NE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);