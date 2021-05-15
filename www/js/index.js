document.addEventListener('deviceready', onDeviceReady, false);

var formDiv = document.getElementById("form");

var username = document.getElementById("username");
var password = document.getElementById("password");
var err = document.getElementById("err");
var button = document.getElementById("loginButton");

function loginProcess() {
    if (username.value == "" || password.value == "") {
        err.textContent = "Something's wrong. Please check the fields and try again.";
        err.style.visibility = "visible";
    } else if (localStorage.getItem(username.value) == null) {
        err.textContent = "There's no account with this username registered.";
        err.style.visibility = "visible";
    } else {
        err.style.visibility = "hidden";
        if (checkUser()) {
            alert("Logged in successfully");
        } else {
            err.textContent = "Password's wrong.";
            err.style.visibility = "visible";
        }
    }
}

function checkUser() {
    if (JSON.parse(localStorage.getItem(username.value)).password == CryptoJS.SHA256(password.value).toString()) {
        return true;
    }

    return false;
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    button.onclick = loginProcess;
    formDiv.onkeyup = function(event) {
        if (event.key === "Enter") {
            button.click();
        }
    }
}