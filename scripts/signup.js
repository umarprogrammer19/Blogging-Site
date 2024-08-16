import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js'
import { auth } from './firebase.js'

// For Getting User Details From HTML
const signUpForm = document.querySelector("#signup-form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// Functionality For Registration
signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Checking If User Enters a Details Or Not 
    if (email.value && password.value) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });

        // For Empty Input
        username.value = "";
        email.value = "";
        password.value = "";

        // For Showing Popup Of Successfull Registration
        my_modal_2.showModal();
    } else {
        // For User Not Enters Any Details
        my_modal_1.showModal();
    }
})
