// import 'regenerator-runtime/runtime';
// import axios from 'axios';

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
const authFormDOM = document.querySelector(".auth-form");
const loginEmailInputDOM = document.querySelector(".login-email");
const loginPasswordInputDOM = document.querySelector(".login-password");
const registrationNameInputDOM = document.querySelector(".register-name");
const registrationEmailInputDOM = document.querySelector(".register-email");
const registrationPasswordInputDOM = document.querySelector(".register-password");
const submitAuthDetailsBtn = document.querySelector(".submit-btn");
const tes = document.querySelector(".tes");

// const API = axios.create({baseURL: 'http://localhost:5000/api/v1/auth/registerUser' });
// export const registerUser = (regData) => API.post('/user/registerUser', regData)

let showLoginForm = true;
function show(){
    console.log(showLoginForm)
}
show()
authFormDOM.addEventListener('submit', (e) => {
    e.preventDefault();
        const name = registrationNameInputDOM.value;
        const registrationEmail = registrationEmailInputDOM.value;
        const registrationPassword = registrationPasswordInputDOM.value;
        const loginEmail = loginEmailInputDOM.value;
        const loginPassword = loginPasswordInputDOM.value;

         console.log(loginEmail, loginPassword)
            axios.post('http://localhost:5000/api/v1/auth/loginUser', { email: loginEmail, password: loginPassword })
            .then(response => {
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user))
            console.log(`POST: user is added`, user);
            })
            .catch(error => console.error(error));

        if (!showLoginForm){
           
        };
     
})

// authFormDOM.addEventListener('submit', async (e) => {
//     e.preventDefault()
//         const name = registrationNameInputDOM.value;
//         const registrationEmail = registrationEmailInputDOM.value;
//         const registrationPassword = registrationPasswordInputDOM.value;
//         const loginEmail = loginEmailInputDOM.value;
//         const loginPassword = loginPasswordInputDOM.value;
        
//     try {        
        
//         if (!showLoginForm) {
//             const { data } = await axios.post('/api/v1/auth/registerUser', {name, email: registrationEmail, password: registrationPassword});
//         }
//         if (showLoginForm) {
//             console.log(loginEmail, loginPassword, 'login')
//             const {data} = await axios.post('/api/v1/auth/loginUser', {email: loginEmail, password: loginPassword});
//         }
               
//     } catch (error) {
//         console.log(error)
//     }
//     registrationNameInputDOM.value = "";
//     registrationEmailInputDOM.value = "";
//     registrationPasswordInputDOM.value = "";
//     loginEmailInputDOM.value = "";
//     loginPasswordInputDOM.value = "";
// })



formToggleBtn1.forEach((btn) =>{
    btn.addEventListener("click", () =>{
        showLoginForm = false;
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
        showLoginForm = true;
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

// groupAccountToggleBtn.addEventListener("click", () =>{
//     personalRegistration.classList.remove("show-form");
//     personalRegistration.classList.add("hide-form");
//     groupRegistration.classList.add("show-form");
//     groupRegistration.classList.remove("hide-form");
//     groupAccountToggle.classList.remove("show-form");
//     groupAccountToggle.classList.add("hide-form");
//     personalAccountToggle.classList.add("show-form");
//     personalAccountToggle.classList.remove("hide-form");
// })

// personalAccountToggleBtn.addEventListener("click", () =>{
//     personalRegistration.classList.remove("hide-form");
//     personalRegistration.classList.add("show-form");
//     groupRegistration.classList.add("hide-form");
//     groupRegistration.classList.remove("show-form");
//     personalAccountToggle.classList.add("hide-form");
//     personalAccountToggle.classList.remove("show-form");
//     groupAccountToggle.classList.remove("hide-form");
//     groupAccountToggle.classList.add("show-form");
// })
