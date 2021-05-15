document.addEventListener('deviceready', onDeviceReady, false);

var validRegister = false;

var formDiv = document.getElementById("form");

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var username = document.getElementById("username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmpassword");
var err = document.getElementById("err");

var button = document.getElementById("registerButton");

function registerProcess() {
    if (validRegister) {
        err.style.visibility = "hidden";

        localStorage.setItem(username.value, JSON.stringify({firstName: firstName.value, lastName: lastName.value, email: email.value, password: CryptoJS.SHA256(password.value).toString()}));
        alert("Registered");
    } else {
        err.textContent = "Something's wrong. Please check the fields and try again.";
        err.style.visibility = "visible";
    }
}

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    button.onclick = registerProcess;
    username.oninput = checkUsername;
    confirmPassword.oninput = checkPassword;
    password.oninput = checkPassword;
    email.oninput = checkEmail;

    formDiv.onkeyup = function(event) {
        if (event.key === "Enter") {
            button.click();
        }
    }
}

function checkUsername() {
    if (localStorage.getItem(username.value) == null) {
        username.style.color = "#444444";
        err.style.visibility = "hidden";
        validRegister = true;
    } else {
        username.style.color = "#e1461d";
        err.textContent = "Username's already on use.";
        err.style.visibility = "visible";
        validRegister = false;
    }
}

function checkPassword() {
    if (CryptoJS.SHA256(password.value).toString() == CryptoJS.SHA256(confirmPassword.value).toString()) {
        confirmPassword.style.color = "#444444";
        err.style.visibility = "hidden";
        validRegister = true;
    } else {
        confirmPassword.style.color = "#e1461d";
        err.textContent = "Passwords doesnt' match.";
        err.style.visibility = "visible";
        validRegister = false;
    }
}

function checkEmail() {
    if (email.value.includes("@") && email.value.includes(".")) {
        email.style.color = "#444444";
        err.style.visibility = "hidden";
        validRegister = true;
    } else {
        email.style.color = "#e1461d";
        err.textContent = "The email is not valid.";
        err.style.visibility = "visible";
        validRegister = false;
        
    }
}
