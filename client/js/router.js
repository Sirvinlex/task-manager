const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html",
    "/completed-tasks": "/pages/completed-task.html",
    "/current-tasks": "/pages/current-tasks.html",
    "/dashboard": "/pages/dashboard.html",
    "/login-register": "/pages/login-register.html",
    "/pending-tasks": "/pages/pending-tasks.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

const renderPage = async () => {
    const route = routes[ "/"] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
}

renderPage();
