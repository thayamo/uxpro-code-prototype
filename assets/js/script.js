document.addEventListener("DOMContentLoaded", function () {
    let wrongPasswordAttempts = 0;
    let wrongEmailAttempts = 0;
    let currentCaptcha = "";
    let currentCaptcha2 = "";
    const captchaFiles = ["3JYP4.jpg", "ADUR3.jpg", "HK5B6.jpg", "R84CH.jpg", "TSMS9.jpg", "URVTP.jpg", "W93BBX.jpg", "9T4JW.jpg"];

    function getRandomCaptcha() {
        const randomIndex = Math.floor(Math.random() * captchaFiles.length);
        return captchaFiles[randomIndex].split(".")[0];
    }

    // Elemente für Login
    const loginContainer = document.getElementById("login");
    const forgotPasswordContainer = document.getElementById("forgot-password");
    const captchaContainer = document.getElementById("captchaContainer");
    const captchaInput = document.getElementById("captchaInput");
    const captchaError = document.getElementById("captchaError");
    const captchaImage = document.getElementById("captchaImage");

    // Elemente für "Passwort vergessen"
    const forgotPasswordForm = document.getElementById("loginFormPassword");
    const forgotEmailInput = document.getElementById("forgotEmail");
    const forgotEmailError = document.getElementById("forgotEmailError");
    const forgotCaptchaContainer = document.getElementById("captchaContainer-2");
    const forgotCaptchaInput = document.getElementById("forgotCaptchaInput");
    const forgotCaptchaError = document.getElementById("captchaError-2");
    const forgotCaptchaImage = document.getElementById("captchaImage-2");

    // Login-Formular
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        emailError.textContent = "";
        passwordError.textContent = "";
        captchaError.textContent = "";
        let hasError = false;

        if (!email) {
            emailError.textContent = "Bitte E-Mail/Benutzer eingeben";
            hasError = true;
        } else if (!email.includes("@")) {
            emailError.textContent = "Bitte gültige E-Mail-Adresse eingeben";
            hasError = true;
        } else if (email !== "demo@uxcourses.com") {
            emailError.textContent = "E-Mail/Benutzer konnte nicht gefunden werden.";
            hasError = true;
        }

        if (!password) {
            passwordError.textContent = "Bitte Passwort eingeben";
            hasError = true;
        } else if (password !== "Test1234") {
            passwordError.textContent = "Passwort falsch. Bitte erneut versuchen.";
            hasError = true;
            wrongPasswordAttempts++;

            // Captcha anzeigen, wenn Passwort mehrmals falsch
            if (wrongPasswordAttempts >= 3) {
                captchaContainer.style.display = "block";
                currentCaptcha = getRandomCaptcha();
                captchaImage.src = `/assets/img/${currentCaptcha}.jpg`;
                captchaInput.value = "";
            }
        }

        if (wrongPasswordAttempts >= 3) {
            if (!captchaInput.value) {
                captchaError.textContent = "Bitte Captcha eingeben";
                hasError = true;
            } else if (captchaInput.value !== currentCaptcha) {
                captchaError.textContent = "Captcha falsch. Bitte erneut versuchen.";
                hasError = true;
                captchaInput.value = "";
                currentCaptcha = getRandomCaptcha();
                captchaImage.src = `/assets/img/${currentCaptcha}.jpg`;
            }
        }

        if (!hasError) {
            // Ersetze den Inhalt von "login" durch eine Nachricht mit Padding, Bild und zentriertem Text
            loginContainer.innerHTML = `
                <div style="padding: 3em 0; text-align: center;">
                    <img src="/assets/img/loading.svg" style="width: 100px;" alt="Lade..." />
                    <br>
                    Sie werden nun sicher über eine HTTPS-Verbindung angemeldet...
                </div>`;
            
            // Setze die Variablen zurück und verstecke das Captcha
            wrongPasswordAttempts = 0;
            captchaContainer.style.display = "none";
            captchaInput.value = "";
            
            // Warte 2 Sekunden, entferne den angezeigten Text, zeige den Alert und lade danach die Seite neu
            setTimeout(function () {
                loginContainer.innerHTML = "";
                alert("Erfolgreich angemeldet!");
                window.location.reload();
            }, 2000);
        }
    });

    // "Passwort vergessen?"-Link
    document.querySelector(".text-end a").addEventListener("click", function (event) {
        event.preventDefault();
        loginContainer.style.display = "none";
        forgotPasswordContainer.style.display = "block";
    });

    // "Zurück zum Login"
    document.getElementById("backToLoginLink").addEventListener("click", function (event) {
        event.preventDefault();
        forgotPasswordContainer.style.display = "none";
        loginContainer.style.display = "block";
        wrongEmailAttempts = 0;
        forgotCaptchaContainer.style.display = "none";
        forgotEmailError.textContent = "";
        forgotCaptchaInput.value = "";
    });

    // "Passwort zurücksetzen" Formular
    forgotPasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();
        forgotEmailError.textContent = "";
        forgotCaptchaError.textContent = "";
        let hasError = false;

        if (!forgotEmailInput.value) {
            forgotEmailError.textContent = "Bitte E-Mail eingeben";
            hasError = true;
        } else if (!forgotEmailInput.value.includes("@")) {
            forgotEmailError.textContent = "Bitte gültige E-Mail-Adresse eingeben";
            hasError = true;
        } else if (forgotEmailInput.value !== "demo@uxcourses.com") {
            forgotEmailError.textContent = "E-Mail nicht gefunden.";
            hasError = true;
            wrongEmailAttempts++;

            // Captcha nach 3 falschen E-Mail-Eingaben anzeigen
            if (wrongEmailAttempts >= 3) {
                forgotCaptchaContainer.style.display = "block";
                currentCaptcha2 = getRandomCaptcha();
                forgotCaptchaImage.src = `/assets/img/${currentCaptcha2}.jpg`;
                forgotCaptchaInput.value = "";
            }
        }

        if (wrongEmailAttempts >= 3) {
            if (!forgotCaptchaInput.value) {
                forgotCaptchaError.textContent = "Bitte Captcha eingeben";
                hasError = true;
            } else if (forgotCaptchaInput.value !== currentCaptcha2) {
                forgotCaptchaError.textContent = "Captcha falsch. Bitte erneut versuchen.";
                hasError = true;
                forgotCaptchaInput.value = "";
                currentCaptcha2 = getRandomCaptcha();
                forgotCaptchaImage.src = `/assets/img/${currentCaptcha2}.jpg`;
            }
        }

        if (!hasError) {
            alert("Passwort-Reset-Link wurde gesendet!");
            wrongEmailAttempts = 0;
            forgotCaptchaContainer.style.display = "none";
            forgotCaptchaInput.value = "";
            window.location.reload();
        }
    });
});