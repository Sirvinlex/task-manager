const pendingTask = document.querySelector(".pending-tasks-container");
const currentTask = document.querySelector(".current-tasks-container");
const completedTask = document.querySelector(".completed-tasks-container");
const pendingTaskBtn = document.querySelector(".pending-tasks-btn");
const currentTaskBtn = document.querySelector(".current-tasks-btn");
const completedTaskBtn = document.querySelector(".completed-tasks-btn");
const createTaskBtn = document.querySelector(".create-task-btn");
const createTaskFormContainer = document.querySelector(".create-task-form_container");
const closeTaskForm = document.querySelector(".close-task-form");
const submitTaskBtn = document.querySelector(".submit-task-btn");
const taskNameInputDOM = document.querySelector(".task-name");

// const page = pageNumber || '1';
// const pageNumber = 1
// const page = JSON.stringify(pageNumber)
// const url = `http://localhost:5000/api/v1/tasks/getAllTasks?page=${page}`
function fetchTasks () {
        const localStorageUser = localStorage.getItem('user');
        const user = JSON.parse(localStorageUser);
        axios.get('http://localhost:5000/api/v1/tasks/getAllTasks', {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
        const task = response.data;
        
        console.log(`GET users`, task);
        }).catch(error => console.error(error));

};
fetchTasks();

submitTaskBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const taskName = taskNameInputDOM.value;
    const status = "Pending";

    axios.post('http://localhost:5000/api/v1/tasks/createTask', { taskName, status })
    .then(response => {
    const addedUser = response.data;
    console.log(`POST: user is added`, addedUser);
    console.log(taskName, status)
// append to DOM
//  appendToDOM([addedUser]);
    })
    .catch(error => console.error(error));
})
// submitTaskBtn.addEventListener('click', async (e) => {
//     e.preventDefault();
//     try {
//         const taskName = taskNameInputDOM.value;
//         const status = "Pending";
//         console.log(taskName, status,)
//         const { data } = axios.post('/api/v1/tasks/createTask', { taskName, status })
//     } catch (error) {
//         console.log(error)
//     };
//     taskNameInputDOM.value = "";
// })
    

createTaskBtn.addEventListener("click", () =>{
    createTaskFormContainer.classList.remove("hide-task-form");
    createTaskFormContainer.classList.add("show-task-form");
})
closeTaskForm.addEventListener("click", () =>{
    createTaskFormContainer.classList.remove("show-task-form");
    createTaskFormContainer.classList.add("hide-task-form");
})

pendingTaskBtn.addEventListener("click", () =>{
    pendingTask.classList.add("show-task");
    pendingTask.classList.remove("hide-task");
    currentTask.classList.remove("show-task");
    currentTask.classList.add("hide-task");
    completedTask.classList.remove("show-task");
    completedTask.classList.add("hide-task");
    pendingTaskBtn.classList.remove("hide-border")
    pendingTaskBtn.classList.add("show-border")
    currentTaskBtn.classList.remove("show-border")
    currentTaskBtn.classList.add("hide-border")
    completedTaskBtn.classList.remove("show-border")
    completedTaskBtn.classList.add("hide-border")
})
currentTaskBtn.addEventListener("click", () =>{
    currentTask.classList.add("show-task");
    currentTask.classList.remove("hide-task");
    pendingTask.classList.remove("show-task");
    pendingTask.classList.add("hide-task");
    completedTask.classList.remove("show-task");
    completedTask.classList.add("hide-task");
    currentTaskBtn.classList.remove("hide-border")
    currentTaskBtn.classList.add("show-border")
    pendingTaskBtn.classList.remove("show-border")
    pendingTaskBtn.classList.add("hide-border")
    completedTaskBtn.classList.remove("show-border")
    completedTaskBtn.classList.add("hide-border")
    
})
completedTaskBtn.addEventListener("click", () =>{
    completedTask.classList.add("show-task");
    completedTask.classList.remove("hide-task");
    pendingTask.classList.remove("show-task");
    pendingTask.classList.add("hide-task");
    currentTask.classList.remove("show-task");
    currentTask.classList.add("hide-task");
    completedTaskBtn.classList.remove("hide-border")
    completedTaskBtn.classList.add("show-border")
    currentTaskBtn.classList.remove("show-border")
    currentTaskBtn.classList.add("hide-border")
    pendingTaskBtn.classList.remove("show-border")
    pendingTaskBtn.classList.add("hide-border")
})