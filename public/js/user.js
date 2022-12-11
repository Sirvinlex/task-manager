const loginForm = document.querySelectorAll(".login-form");
const registerForm = document.querySelectorAll(".register-form");
const personalRegistration = document.querySelector(".personal-account-form");
const groupRegistration = document.querySelector(".group-account-form");
const formToggleBtn1 = document.querySelectorAll(".toggle-form_btn1");
const formToggleBtn2 = document.querySelectorAll(".toggle-form_btn2");
const formToggle1 = document.querySelectorAll(".form-toggle-1");
const formToggle2 = document.querySelectorAll(".form-toggle-2");
const personalAccountToggle = document.querySelector(".personal-account-toggle");
const groupAccountToggle = document.querySelector(".group-account-toggle");
const groupAccountToggleBtn = document.querySelector(".group-account-toggle_btn");
const personalAccountToggleBtn = document.querySelector(".personal-account-toggle_btn");
const formTitle = document.querySelector(".form-title");

formToggleBtn1.forEach((btn) =>{
    btn.addEventListener("click", () =>{
        loginForm.forEach((item) => item.classList.add("hide-form"));
        loginForm.forEach((item) => item.classList.remove("show-form"));
        registerForm.forEach((item) => item.classList.remove("hide-form"));
        registerForm.forEach((item) => item.classList.add("show-form"));
        formToggle1.forEach((item) => item.classList.remove("show-form"));
        formToggle1.forEach((item) => item.classList.add("hide-form"));
        formToggle2.forEach((item) => item.classList.add("show-form"));
        formToggle2.forEach((item) => item.classList.remove("hide-form"));
        formTitle.textContent = 'Register'
})
})

formToggleBtn2.forEach((btn) => {
    btn.addEventListener("click", () =>{
        loginForm.forEach((item) => item.classList.add("show-form"));
        loginForm.forEach((item) => item.classList.remove("hide-form"));
        registerForm.forEach((item) => item.classList.remove("show-form"));
        registerForm.forEach((item) => item.classList.add("hide-form"));
        formToggle1.forEach((item) => item.classList.remove("hide-form"));
        formToggle1.forEach((item) => item.classList.add("show-form"));
        formToggle2.forEach((item) => item.classList.add("hide-form"));
        formToggle2.forEach((item) => item.classList.remove("show-form"));
        formTitle.textContent = 'Login'
    })
})

groupAccountToggleBtn.addEventListener("click", () =>{
    personalRegistration.classList.remove("show-form");
    personalRegistration.classList.add("hide-form");
    groupRegistration.classList.add("show-form");
    groupRegistration.classList.remove("hide-form");
    groupAccountToggle.classList.remove("show-form");
    groupAccountToggle.classList.add("hide-form");
    personalAccountToggle.classList.add("show-form");
    personalAccountToggle.classList.remove("hide-form");
})

personalAccountToggleBtn.addEventListener("click", () =>{
    personalRegistration.classList.remove("hide-form");
    personalRegistration.classList.add("show-form");
    groupRegistration.classList.add("hide-form");
    groupRegistration.classList.remove("show-form");
    personalAccountToggle.classList.add("hide-form");
    personalAccountToggle.classList.remove("show-form");
    groupAccountToggle.classList.remove("hide-form");
    groupAccountToggle.classList.add("show-form");
})
