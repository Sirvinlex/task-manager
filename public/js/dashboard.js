const pendingTask = document.querySelector(".pending-tasks-container");
const currentTask = document.querySelector(".current-tasks-container");
const completedTask = document.querySelector(".completed-tasks-container");
const pendingTaskBtn = document.querySelector(".pending-tasks-btn");
const currentTaskBtn = document.querySelector(".current-tasks-btn");
const completedTaskBtn = document.querySelector(".completed-tasks-btn");

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