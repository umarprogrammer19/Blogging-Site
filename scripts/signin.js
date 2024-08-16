import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js'
import { auth } from './firebase.js'

// For Getting User Details From HTML
const signIn = document.querySelector("#sign-in");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// Functionality For Login 
signIn.addEventListener("submit", (event) => {
    event.preventDefault();
    // Checking If User Enters a Details Or Not 
    if (email.value && password.value) {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // For Opening Index Page If Successfull Login
                window.open("home.html", "_self");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });

        // For Empty Input
        email.value = "";
        password.value = "";
    } else {
        // For User Not Enters Any Details
        my_modal_1.showModal();
    }
})

