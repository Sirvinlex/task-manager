const searchBtn1 = document.querySelector(".search-btn1");
const searchBtn2 = document.querySelector(".search-btn2");
const searchInputDOM1 = document.querySelector(".search-input1");
const searchInputDOM2 = document.querySelector(".search-input2");
const pendingTaskContainer = document.querySelector(".pending-tasks-container");
const currentTaskContainer = document.querySelector(".current-tasks-container");
const completedTaskContainer = document.querySelector(".completed-tasks-container");
// const pendingTask = document.querySelector(".pending-task");
const pendingTaskBtn = document.querySelector(".pending-tasks-btn");
const currentTaskBtn = document.querySelector(".current-tasks-btn");
const completedTaskBtn = document.querySelector(".completed-tasks-btn");
const createTaskBtn = document.querySelector(".create-task-btn");
const createTaskFormContainer = document.querySelector(".create-task-form_container");
const closeTaskForm = document.querySelector(".close-task-form");
const submitTaskBtn = document.querySelector(".submit-task-btn");
const taskNameInputDOM = document.querySelector(".task-name");
const dashboardPendingTaskCount = document.querySelector("#pending-task-count");
const dashboardCurrentTaskCount = document.querySelector("#current-task-count");
const dashboardCompletedTaskCount = document.querySelector("#completed-task-count");
const taskFormTitle = document.querySelector(".form-title");
const loading = document.querySelector(".loading");
const noTask = document.querySelector(".no-task");
const userName = document.querySelector(".user-name");
const currentDate = document.querySelector(".date");
const allTasks = document.querySelector(".all-tasks");

// const deleteTaskBtn = document.querySelector("delete-task-btn");

// const page = pageNumber || '1';
// const pageNumber = 1
// const page = JSON.stringify(pageNumber)
// const url = `http://localhost:5000/api/v1/tasks/getAllTasks?page=${page}`

let editingTask = false;
let editTaskId;
let isPendingTask = true;
let isCurrentTask = false;
let isCompletedTask = false;

function getUser() {
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);
    userName.textContent = user.name
    const date = moment().format('DD-MM-YYYY');
    currentDate.textContent = date;
};
getUser();

function deleteTask(taskId, target, status) {
                const localStorageUser = localStorage.getItem('user');
                const user = JSON.parse(localStorageUser);
                axios.delete(`http://localhost:5000/api/v1/tasks/deleteTask/${taskId}`, {
                    headers: {
                        authorization: `Bearer ${user.token}`
                    }
                 })
                .then(response => {
                    if(status === 'completed'){
                        target.parentElement.remove();
                    }else{
                        target.parentElement.parentElement.remove();
                    }
                    fetchTasks();
                }).catch((error) => console.error(error))

};

function editTask(taskId, status, taskName,) {
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);
    axios.patch(`http://localhost:5000/api/v1/tasks/updateTask/${taskId}`, {status, taskName}, {
        headers: {
            authorization: `Bearer ${user.token}`
        }
        })
    .then(response => {
        if(status === 'current'){
            showCurrentTasks();
        }
        if(status === 'completed'){
            showCompletedTasks();
        }

    }).catch((error) => console.log(error))

};

function searchTask(searchQuery){
    
    if(isPendingTask){
        while (pendingTaskContainer.hasChildNodes()) {
        pendingTaskContainer.removeChild(pendingTaskContainer.firstChild);
        }
        fetchPendingTasks('pending', searchQuery);
    } 
    if(isCurrentTask){
        while (currentTaskContainer.hasChildNodes()) {
        currentTaskContainer.removeChild(currentTaskContainer.firstChild);
        }
        fetchCurrentTasks('current', searchQuery);
    }
    if(isCompletedTask){
        while (completedTaskContainer.hasChildNodes()) {
        completedTaskContainer.removeChild(completedTaskContainer.firstChild);
        }
        fetchCompletedTasks('completed', searchQuery);
    }
    
};

searchBtn1.addEventListener('click', () =>{
    searchQuery = searchInputDOM1.value;
    searchTask(searchQuery);
    searchInputDOM1.value = '';
});
searchBtn2.addEventListener('click', () => {
    searchQuery = searchInputDOM2.value;
    searchTask(searchQuery);
    searchInputDOM2.value = '';
} );

function fetchPendingTasks(status, searchQuery) {
    loading.classList.add('show-loading');
    loading.classList.remove('hide-loading');
    noTask.classList.add('hide-no-task');
    noTask.classList.remove('show-no-task');
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);
    const search = searchQuery || '';
    axios.get(`http://localhost:5000/api/v1/tasks/getAllTasks?status=${status}&search=${search}`, {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
            const { tasks, numberOfPages, totalTasks} = response.data;
            console.log(tasks)
            let pendingTasks;
            
            pendingTasks = tasks;
            pendingTasks.map((task) =>{
            const taskId = task._id;
            const pendingTaskName = task.taskName;
            const name = document.createElement("h3"); 
            name.textContent = `${task.taskName}`;

            const status = document.createElement("h6") ;
            status.textContent = `Status: ${task.status}`;

            const createdAt = document.createElement("h5"); 
            // createdAt.textContent = `Created: ${task.createdAt}`;
            createdAt.textContent = `Created: ${moment(task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`;
                
            const pendingTask = document.createElement("div");
            pendingTask.classList.add("pending-task");

            const noTask = document.createElement('hi');
            noTask.textContent= 'No Task Found';

            const taskBtnContainer = document.createElement("div");
            taskBtnContainer.classList.add("main-task-btn_container");

            startTaskBtn = document.createElement("button");
            startTaskBtn.textContent = "Start Task";;
            startTaskBtn.classList.add("task-btn");

            deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.textContent = "Delete";
            deleteTaskBtn.classList.add("delete-task-btn");

            editTaskBtn = document.createElement("button");
            editTaskBtn.textContent = "Edit";
            editTaskBtn.classList.add("edit-task-btn");

            deleteTaskBtn.setAttribute('id', `${taskId}`);
            startTaskBtn.setAttribute('id', `${taskId}`);
            startTaskBtn.setAttribute('name', `${pendingTaskName}`);
            editTaskBtn.setAttribute('name', `${pendingTaskName}`);
            editTaskBtn.setAttribute('id', `${taskId}`);

            taskBtnContainer.append(startTaskBtn, editTaskBtn, deleteTaskBtn);
            deleteTaskBtn.addEventListener('click', (e) =>{
                const target = e.target;
                const taskId = e.target.id;
                
                deleteTask(taskId, target);
            });
            startTaskBtn.addEventListener('click', (e) =>{
                const taskId = e.target.id;
                const status = 'current';
                const taskName = e.target.name;
                editTask(taskId, status, taskName, );
            });

            editTaskBtn.addEventListener('click', (e) =>{
                const taskName = e.target.name;
                const taskId = e.target.id;
                editTaskId = taskId;
                createTaskFormContainer.classList.remove("hide-task-form");
                createTaskFormContainer.classList.add("show-task-form");
                taskFormTitle.textContent = 'Edit Task';
                taskNameInputDOM.value = taskName;
                editingTask = true;                
            });
        
            pendingTask.append(createdAt, name, status, taskBtnContainer);
            
            // if(pendingTasks.length === 0 || !pendingTasks){
            //     noTask.classList.remove('hide-no-task');
            //     noTask.classList.add('show-no-task');
            // }
            
            return pendingTaskContainer.append(pendingTask)
        
            // else if (!tasks){
            //     loading.classList.add('show-loading');
            //     loading.classList.remove('hide-loading');
            // }
            
        })
        if(pendingTasks.length === 0 || !pendingTasks){
                noTask.classList.remove('hide-no-task');
                noTask.classList.add('show-no-task');
            }else{
                noTask.classList.add('hide-no-task');
                noTask.classList.remove('show-no-task');
            }

        loading.classList.remove('show-loading');
        loading.classList.add('hide-loading');

        })
        .catch(error => console.error(error))
}
fetchPendingTasks('pending');

function fetchCurrentTasks(status, searchQuery) {
    
    const search = searchQuery || '';
    loading.classList.add('show-loading');
    loading.classList.remove('hide-loading');
    noTask.classList.add('hide-no-task');
    noTask.classList.remove('show-no-task');
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);
    axios.get(`http://localhost:5000/api/v1/tasks/getAllTasks?status=${status}&search=${search}`, {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
            const {tasks, numberOfPages, totalTasks} = response.data;

            let currentTasks;
            currentTasks = tasks;
            currentTasks.map((task) =>{
            const taskId = task._id;
            const currentTaskName = task.taskName;
            const name = document.createElement("h3"); 
            name.textContent = `${task.taskName}`;

            const status = document.createElement("h6"); 
            status.textContent = `Status: ${task.status}`;

            const updatedAt = document.createElement("h5"); 
            updatedAt.textContent = `Started: ${moment(task.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`;

            const createdAt = document.createElement("h5"); 
            createdAt.textContent = `Created: ${moment(task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`;

            const currentTask = document.createElement("div");
            currentTask.classList.add("current-task");

            const taskBtnContainer = document.createElement("div");
            taskBtnContainer.classList.add("main-task-btn_container");

            completeTaskBtn = document.createElement("button");
            completeTaskBtn.textContent = "Mark as Complete";
            completeTaskBtn.classList.add("task-btn");

            deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.textContent = "Delete"
            deleteTaskBtn.classList.add("delete-task-btn");
            deleteTaskBtn.setAttribute('id', `${taskId}`);
            completeTaskBtn.setAttribute('id', `${taskId}`);
            completeTaskBtn.setAttribute('name', `${currentTaskName}`);

            taskBtnContainer.append(completeTaskBtn, deleteTaskBtn);

            deleteTaskBtn.addEventListener('click', (e) =>{
                const target = e.target;
                const taskId = e.target.id;
                deleteTask(taskId, target);
            });

            completeTaskBtn.addEventListener('click', (e) =>{
                const taskId = e.target.id;
                const status = 'completed';
                const taskName = e.target.name;
                editTask(taskId, status, taskName, );
                
            });

            currentTask.append(createdAt, name, status, updatedAt, taskBtnContainer);

            return (
                
                currentTaskContainer.append(currentTask)
            )
        })

        loading.classList.remove('show-loading');
        loading.classList.add('hide-loading');
        if(currentTasks.length === 0 || !currentTasks){
                noTask.classList.remove('hide-no-task');
                noTask.classList.add('show-no-task');
            }else{
                noTask.classList.add('hide-no-task');
                noTask.classList.remove('show-no-task');
            }

        })
        .catch(error => console.error(error))
}

function fetchCompletedTasks(status, searchQuery) {
    
    const search = searchQuery || '';
    loading.classList.add('show-loading');
    loading.classList.remove('hide-loading');
    noTask.classList.add('hide-no-task');
    noTask.classList.remove('show-no-task');
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);
    axios.get(`http://localhost:5000/api/v1/tasks/getAllTasks?status=${status}&search=${search}`, {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
            const {tasks, numberOfPages, totalTasks} = response.data;

            let completedTasks;
            completedTasks = tasks
            completedTasks.map((task) =>{
            const taskId = task._id;
            const name = document.createElement("h3"); 
            name.textContent = `${task.taskName}`;

            const status = document.createElement("h6"); 
            status.textContent = `Status: ${task.status}`;

            const updatedAt = document.createElement("h5"); 
            updatedAt.textContent = `Completed Task On: ${moment(task.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`;

            const createdAt = document.createElement("h5"); 
            createdAt.textContent = `Created: ${moment(task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`;

            const completedTask = document.createElement("div");
            completedTask.classList.add("completed-task");

            deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.textContent = "Delete"
            deleteTaskBtn.classList.add("delete-task-btn");
            deleteTaskBtn.setAttribute('id', `${taskId}`);

            completedTask.append(createdAt, name, status, updatedAt, deleteTaskBtn);

            deleteTaskBtn.addEventListener('click', (e) =>{
                const status = 'completed'
                const target = e.target;
                const taskId = e.target.id;
                deleteTask(taskId, target, status);
            })

            return (
                completedTaskContainer.append(completedTask)
            )
        })

        loading.classList.remove('show-loading');
        loading.classList.add('hide-loading');
        if(completedTasks.length === 0 || !completedTasks){
                noTask.classList.remove('hide-no-task');
                noTask.classList.add('show-no-task');
            }else{
                noTask.classList.add('hide-no-task');
                noTask.classList.remove('show-no-task');
            }

        })
        .catch(error => console.error(error))
}
function fetchTasks () {
        noTask.classList.add('hide-no-task');
        noTask.classList.remove('show-no-task');
        const localStorageUser = localStorage.getItem('user');
        const user = JSON.parse(localStorageUser);
        axios.get('http://localhost:5000/api/v1/tasks/getAllTasks', {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
        const { pendingTaskCount, currentTaskCount, completedTaskCount, totalTasks} = response.data;
        
        dashboardPendingTaskCount.textContent = pendingTaskCount;
        dashboardCurrentTaskCount.textContent = currentTaskCount;
        dashboardCompletedTaskCount.textContent = completedTaskCount;
        allTasks.textContent = `All Tasks: ${totalTasks}`
        
        }).catch(error => console.error(error));

};
fetchTasks();

submitTaskBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const taskName = taskNameInputDOM.value;
    const status = "pending";
    const taskId = editTaskId;
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);

    if (editingTask){
        editTask(taskId, status, taskName);
        taskNameInputDOM.value = '';
        editingTask = false;
        console.log(editingTask)
    }else{
        axios.post('http://localhost:5000/api/v1/tasks/createTask', { taskName, status }, {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
        const result = response.data;
        taskNameInputDOM.value = '';
    })
    .catch(error => console.error(error));
    }
    fetchTasks();
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
    taskFormTitle.textContent = 'Create Task';
})
closeTaskForm.addEventListener("click", () =>{
    createTaskFormContainer.classList.remove("show-task-form");
    createTaskFormContainer.classList.add("hide-task-form");
    while (pendingTaskContainer.hasChildNodes()) {
     pendingTaskContainer.removeChild(pendingTaskContainer.firstChild);
    };
    fetchPendingTasks('pending');
    })

pendingTaskBtn.addEventListener("click", () =>{
    isPendingTask = true;
    isCurrentTask = false;
    isCompletedTask = false;
    pendingTaskContainer.classList.add("show-task");
    pendingTaskContainer.classList.remove("hide-task");
    currentTaskContainer.classList.remove("show-task");
    currentTaskContainer.classList.add("hide-task");
    completedTaskContainer.classList.remove("show-task");
    completedTaskContainer.classList.add("hide-task");
    pendingTaskBtn.classList.remove("hide-border");
    pendingTaskBtn.classList.add("show-border");
    currentTaskBtn.classList.remove("show-border");
    currentTaskBtn.classList.add("hide-border");
    completedTaskBtn.classList.remove("show-border");
    completedTaskBtn.classList.add("hide-border");
    while (pendingTaskContainer.hasChildNodes()) {
     pendingTaskContainer.removeChild(pendingTaskContainer.firstChild);
    }
    fetchPendingTasks('pending');
    fetchTasks();
})
currentTaskBtn.addEventListener("click", () =>{
    isPendingTask = false;
    isCurrentTask = true;
    isCompletedTask = false;
    currentTaskContainer.classList.add("show-task");
    currentTaskContainer.classList.remove("hide-task");
    pendingTaskContainer.classList.remove("show-task");
    pendingTaskContainer.classList.add("hide-task");
    completedTaskContainer.classList.remove("show-task");
    completedTaskContainer.classList.add("hide-task");
    currentTaskBtn.classList.remove("hide-border");
    currentTaskBtn.classList.add("show-border");
    pendingTaskBtn.classList.remove("show-border");
    pendingTaskBtn.classList.add("hide-border");
    completedTaskBtn.classList.remove("show-border");
    completedTaskBtn.classList.add("hide-border");
    while (currentTaskContainer.hasChildNodes()) {
     currentTaskContainer.removeChild(currentTaskContainer.firstChild);
    }
    fetchCurrentTasks('current');
    fetchTasks();
})
completedTaskBtn.addEventListener("click", () =>{
    isPendingTask = false;
    isCurrentTask = false;
    isCompletedTask = true;
    completedTaskContainer.classList.add("show-task");
    completedTaskContainer.classList.remove("hide-task");
    pendingTaskContainer.classList.remove("show-task");
    pendingTaskContainer.classList.add("hide-task");
    currentTaskContainer.classList.remove("show-task");
    currentTaskContainer.classList.add("hide-task");
    completedTaskBtn.classList.remove("hide-border");
    completedTaskBtn.classList.add("show-border");
    currentTaskBtn.classList.remove("show-border");
    currentTaskBtn.classList.add("hide-border");
    pendingTaskBtn.classList.remove("show-border");
    pendingTaskBtn.classList.add("hide-border");
    while (completedTaskContainer.hasChildNodes()) {
     completedTaskContainer.removeChild(completedTaskContainer.firstChild);
    }
    fetchCompletedTasks('completed');
    fetchTasks();
})

function showCurrentTasks() {
    isPendingTask = false;
    isCurrentTask = true;
    isCompletedTask = false;
    currentTaskContainer.classList.add("show-task");
    currentTaskContainer.classList.remove("hide-task");
    pendingTaskContainer.classList.remove("show-task");
    pendingTaskContainer.classList.add("hide-task");
    completedTaskContainer.classList.remove("show-task");
    completedTaskContainer.classList.add("hide-task");
    currentTaskBtn.classList.remove("hide-border");
    currentTaskBtn.classList.add("show-border");
    pendingTaskBtn.classList.remove("show-border");
    pendingTaskBtn.classList.add("hide-border");
    completedTaskBtn.classList.remove("show-border");
    completedTaskBtn.classList.add("hide-border");
    while (currentTaskContainer.hasChildNodes()) {
     currentTaskContainer.removeChild(currentTaskContainer.firstChild);
    }
    fetchCurrentTasks('current');
    fetchTasks();

};

function showCompletedTasks() {
    isPendingTask = false;
    isCurrentTask = false;
    isCompletedTask = true;
    completedTaskContainer.classList.add("show-task");
    completedTaskContainer.classList.remove("hide-task");
    pendingTaskContainer.classList.remove("show-task");
    pendingTaskContainer.classList.add("hide-task");
    currentTaskContainer.classList.remove("show-task");
    currentTaskContainer.classList.add("hide-task");
    completedTaskBtn.classList.remove("hide-border");
    completedTaskBtn.classList.add("show-border");
    currentTaskBtn.classList.remove("show-border");
    currentTaskBtn.classList.add("hide-border");
    pendingTaskBtn.classList.remove("show-border");
    pendingTaskBtn.classList.add("hide-border");
    while (completedTaskContainer.hasChildNodes()) {
     completedTaskContainer.removeChild(completedTaskContainer.firstChild);
    }
    fetchCompletedTasks('completed');
    fetchTasks();
}