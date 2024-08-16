import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu5yHHFVN6n8qk_mWJioo1btbrDBJl1Nw",
    authDomain: "blogging-site-c7224.firebaseapp.com",
    projectId: "blogging-site-c7224",
    storageBucket: "blogging-site-c7224.appspot.com",
    messagingSenderId: "288811689646",
    appId: "1:288811689646:web:e5fa5b9fb51f2760646f3f",
    measurementId: "G-GFZJRRT55C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);